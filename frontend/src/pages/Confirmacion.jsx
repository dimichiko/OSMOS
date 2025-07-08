import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const Confirmacion = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart, items, getTotalPrice } = useCart();
  const { user, token } = useAuth();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const paymentStatus = searchParams.get('status');
    const paymentId = searchParams.get('payment_id');
    
    setStatus(paymentStatus);
    setLoading(false);

    // Si el pago fue exitoso y hay productos en el carrito, crear orden
    if (paymentStatus === 'success' && items.length > 0 && user && token) {
      createOrder(paymentId);
    } else if (paymentStatus === 'success') {
      // Si no hay productos o usuario, solo limpiar carrito
      clearCart();
    }
  }, [searchParams, items, user, token]);

  const createOrder = async (paymentId) => {
    try {
      setLoading(true);
      
      // Preparar datos de la orden
      const orderData = {
        items: items.map(item => ({
          product: item.id || item._id, // Asegurar que tenemos el ID del producto
          quantity: item.quantity || 1,
          price: item.price
        })),
        total: getTotalPrice(),
        status: 'approved',
        paymentId: paymentId || `simulated_${Date.now()}`,
        shippingAddress: {
          name: user.nombre || user.name,
          email: user.email,
          address: 'Dirección de envío' // Esto se podría obtener del localStorage o contexto
        }
      };

      // Crear la orden en el backend
      const response = await axios.post('http://localhost:5050/api/orders', orderData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setOrderCreated(true);
        setOrderId(response.data.order._id);
        clearCart(); // Limpiar carrito después de crear la orden
      }

    } catch (err) {
      console.error('Error creando orden:', err);
      setError('Error al crear la orden. Contacta soporte si tienes dudas.');
      clearCart(); // Limpiar carrito de todas formas
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'success':
        return {
          title: orderCreated ? '¡Orden Creada Exitosamente!' : '¡Pago Exitoso!',
          message: orderCreated 
            ? `Tu orden #${orderId?.slice(-8)} ha sido creada y procesada. Recibirás un email de confirmación pronto.`
            : 'Tu compra ha sido procesada correctamente. Recibirás un email de confirmación pronto.',
          icon: '✅',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'failure':
        return {
          title: 'Pago Fallido',
          message: 'Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.',
          icon: '❌',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'pending':
        return {
          title: 'Pago Pendiente',
          message: 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.',
          icon: '⏳',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          title: 'Estado Desconocido',
          message: 'No se pudo determinar el estado de tu pago. Contacta soporte si tienes dudas.',
          icon: '❓',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {status === 'success' ? 'Procesando tu orden...' : 'Procesando confirmación...'}
          </p>
        </div>
      </main>
    );
  }

  const statusInfo = getStatusInfo();

  return (
    <main className="min-h-screen bg-[#f8f9fb] py-16 px-4">
      <Helmet>
        <title>Confirmación de Pago | OSMOS</title>
        <meta name="description" content="Confirmación de tu pago en OSMOS" />
      </Helmet>
      
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className={`w-20 h-20 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border-4 flex items-center justify-center mx-auto mb-6`}>
          <span className="text-3xl">{statusInfo.icon}</span>
        </div>
        
        <h1 className={`text-3xl font-extrabold mb-4 ${statusInfo.color}`}>
          {statusInfo.title}
        </h1>
        
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          {statusInfo.message}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {orderCreated && orderId && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-bold">Número de Orden: #{orderId.slice(-8)}</p>
            <p className="text-sm">Guarda este número para seguimiento</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => navigate('/productos')}
            className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition"
          >
            Seguir Comprando
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full hover:bg-gray-300 transition"
          >
            Volver al Inicio
          </button>
        </div>

        {status === 'success' && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>¿Qué sigue?</strong> Revisa tu email para los detalles de envío. 
              Nuestro equipo procesará tu pedido en las próximas 24 horas.
            </p>
          </div>
        )}

        {status === 'failure' && (
          <div className="mt-8 p-4 bg-red-50 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>¿Necesitas ayuda?</strong> Si tienes problemas con el pago, 
              contacta nuestro soporte en <a href="mailto:soporte@osmos.com" className="underline">soporte@osmos.com</a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Confirmacion; 