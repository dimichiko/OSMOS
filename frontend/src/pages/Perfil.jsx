import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const Perfil = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get('http://localhost:5050/api/orders', {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error al cargar el historial de compras. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazado';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cargando perfil...</h2>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <Helmet>
        <title>Mi Perfil | OSMOS</title>
        <meta name="description" content="Gestiona tu perfil y revisa tu historial de compras en OSMOS" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Información del perfil */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8">
          <div className="flex flex-col items-center mb-8">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mb-6 shadow-lg">
              <span className="text-5xl text-white font-bold select-none">
                {user.nombre ? user.nombre[0].toUpperCase() : user.name[0].toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">Gestiona tu información personal y revisa tus datos de cuenta.</p>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-32 font-semibold text-gray-700">Nombre:</span>
              <span className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900">{user.nombre || user.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-32 font-semibold text-gray-700">Email:</span>
              <span className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900">{user.email || user.correo || user.mail || 'No disponible'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-32 font-semibold text-gray-700">Rol:</span>
              <span className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 capitalize">{user.role || 'usuario'}</span>
            </div>
          </div>
          
          <div className="mt-10 w-full flex flex-col items-center">
            <button className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition text-lg">Editar Perfil</button>
          </div>
        </div>

        {/* Historial de compras */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Historial de Compras</h2>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando historial de compras...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes compras aún</h3>
              <p className="text-gray-500">Cuando realices tu primera compra, aparecerá aquí.</p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="font-semibold text-gray-900">
                          Orden #{order._id.slice(-8)}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Total:</span>
                          <span className="ml-2 font-bold text-green-600">${order.total}</span>
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span>
                          <span className="ml-2">{formatDate(order.createdAt)}</span>
                        </div>
                        <div>
                          <span className="font-medium">Productos:</span>
                          <span className="ml-2">{order.items.length} item(s)</span>
                        </div>
                      </div>

                      {order.paymentId && (
                        <div className="mt-3 text-sm text-gray-500">
                          <span className="font-medium">ID de Pago:</span>
                          <span className="ml-2 font-mono">{order.paymentId}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Perfil; 