import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        // Extraer el array de orders del objeto de respuesta
        const ordersData = response.data.orders || response.data || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        console.log('No se pudieron cargar las órdenes:', error.message);
        setOrders([]);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 md:py-16 px-4">
      <Helmet>
        <title>Mi Perfil | OSMOS</title>
        <meta name="description" content="Gestiona tu perfil y revisa tu historial de compras en OSMOS" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Información del perfil */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-6 md:mb-8">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            {/* Avatar */}
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <span className="text-3xl md:text-5xl text-white font-bold select-none">
                {user.nombre ? user.nombre[0].toUpperCase() : user.name[0].toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-500 mb-6 md:mb-8 text-center max-w-md text-sm md:text-base">Gestiona tu información personal y revisa tus datos de cuenta.</p>
          </div>

          {/* Información del usuario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="font-bold text-blue-800 mb-3 text-sm md:text-base">Información Personal</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1">Nombre</label>
                  <p className="font-semibold text-gray-800 text-sm md:text-base">{user.nombre || user.name || 'No especificado'}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1">Email</label>
                  <p className="font-semibold text-gray-800 text-sm md:text-base">{user.email || user.correo || user.mail || 'No especificado'}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-xs md:text-sm mb-1">ID de Usuario</label>
                  <p className="font-mono text-gray-600 text-xs md:text-sm">{user.id || user._id || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-blue-800 mb-3 text-sm md:text-base">Estadísticas</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 text-xs md:text-sm">Miembro desde</span>
                    <span className="text-blue-900 font-semibold text-xs md:text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-CL') : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 text-xs md:text-sm">Estado de cuenta</span>
                    <span className="text-green-900 font-semibold text-xs md:text-sm">Activa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historial de compras */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-blue-900 mb-6">Historial de Compras</h2>
          
          {Array.isArray(orders) && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">Pedido #{order.id || index + 1}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-CL') : 'Fecha no disponible'}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'completed' ? 'Completado' :
                         order.status === 'pending' ? 'Pendiente' : 'Procesando'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {order.items && order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.name || `Producto ${itemIndex + 1}`}</span>
                        <span className="text-gray-600">${item.price || 0}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">Total</span>
                      <span className="font-bold text-blue-600 text-sm md:text-base">
                        ${order.total || order.amount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-4">🛒</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No hay compras aún</h3>
              <p className="text-gray-500 text-sm md:text-base mb-6">Cuando hagas tu primera compra, aparecerá aquí.</p>
              <Link 
                to="/productos" 
                className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition text-sm md:text-base"
              >
                Ver Productos
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Perfil; 