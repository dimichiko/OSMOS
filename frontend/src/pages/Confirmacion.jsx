import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { Helmet } from 'react-helmet-async';

const Confirmacion = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart, items } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const status = searchParams.get('status') || 'success';
  const paymentId = searchParams.get('payment_id');
  const preferenceId = searchParams.get('preference_id');

  // Arreglar bucle infinito - usar useCallback
  const processOrder = useCallback(() => {
    if (status === 'success') {
      // Limpiar el carrito solo si hay items
      if (items.length > 0) {
        clearCart();
      }
      
      // Generar detalles del pedido
      setOrderDetails({
        orderNumber: `OSM${Date.now().toString().slice(-6)}`,
        paymentId: paymentId || 'N/A',
        preferenceId: preferenceId || 'N/A',
        date: new Date().toLocaleDateString('es-CL'),
        time: new Date().toLocaleTimeString('es-CL'),
        total: items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0)
      });
    }
    setLoading(false);
  }, [status, clearCart, paymentId, preferenceId, items]);

  useEffect(() => {
    // Verificar que venimos de un pago válido
    if (!status) {
      navigate('/');
      return;
    }
    
    processOrder();
  }, [processOrder, navigate, status]);

  const getStatusInfo = () => {
    switch (status) {
      case 'success':
        return {
          icon: '✅',
          title: '¡Pago Exitoso!',
          message: 'Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación pronto.',
          bgColor: 'bg-green-100',
          textColor: 'text-green-600',
          borderColor: 'border-green-200'
        };
      case 'pending':
        return {
          icon: '⏳',
          title: 'Pago Pendiente',
          message: 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-600',
          borderColor: 'border-yellow-200'
        };
      case 'failure':
        return {
          icon: '❌',
          title: 'Pago Fallido',
          message: 'Hubo un problema con tu pago. Por favor, intenta de nuevo.',
          bgColor: 'bg-red-100',
          textColor: 'text-red-600',
          borderColor: 'border-red-200'
        };
      default:
        return {
          icon: '✅',
          title: '¡Pago Exitoso!',
          message: 'Tu pedido ha sido procesado correctamente.',
          bgColor: 'bg-green-100',
          textColor: 'text-green-600',
          borderColor: 'border-green-200'
        };
    }
  };

  const statusInfo = getStatusInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Procesando confirmación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 md:py-12 px-4">
      <Helmet>
        <title>Confirmación de Pago - OSMOS</title>
      </Helmet>
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center">
        <div className="mb-6 md:mb-8">
          <div className={`w-16 h-16 md:w-20 md:h-20 ${statusInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <span className="text-2xl md:text-3xl">{statusInfo.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{statusInfo.title}</h1>
          <p className="text-gray-600 text-sm md:text-base">
            {statusInfo.message}
          </p>
        </div>

        {status === 'success' && orderDetails && (
          <div className="space-y-4 md:space-y-6">
            <div className={`bg-gray-50 rounded-lg p-4 md:p-6 border ${statusInfo.borderColor}`}>
              <h2 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Detalles del Pedido</h2>
              <div className="text-sm md:text-base text-gray-600 space-y-2">
                <p><span className="font-medium">Número de pedido:</span> #{orderDetails.orderNumber}</p>
                {orderDetails.paymentId && orderDetails.paymentId !== 'N/A' && (
                  <p><span className="font-medium">ID de pago:</span> {orderDetails.paymentId}</p>
                )}
                {orderDetails.preferenceId && orderDetails.preferenceId !== 'N/A' && (
                  <p><span className="font-medium">ID de preferencia:</span> {orderDetails.preferenceId}</p>
                )}
                <p><span className="font-medium">Estado:</span> <span className={statusInfo.textColor}>Confirmado</span></p>
                <p><span className="font-medium">Fecha:</span> {orderDetails.date}</p>
                <p><span className="font-medium">Hora:</span> {orderDetails.time}</p>
                {orderDetails.total > 0 && (
                  <p><span className="font-medium">Total:</span> ${orderDetails.total.toLocaleString('es-CL')}</p>
                )}
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-sm">📧 Próximos pasos</h3>
              <ul className="text-xs text-blue-700 space-y-1 text-left">
                <li>• Recibirás un email de confirmación</li>
                <li>• Tu pedido será procesado en 24-48 horas</li>
                <li>• Te contactaremos para coordinar el envío</li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6">
          <Link 
            to="/productos" 
            className="flex-1 bg-blue-600 text-white font-semibold py-3 md:py-4 px-6 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
          >
            Seguir Comprando
          </Link>
          <Link 
            to="/perfil" 
            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 md:py-4 px-6 rounded-lg hover:bg-gray-300 transition text-sm md:text-base"
          >
            Ver Mi Perfil
          </Link>
        </div>

        {status === 'failure' && (
          <div className="mt-4">
            <Link 
              to="/carrito" 
              className="block w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition text-sm md:text-base"
            >
              Intentar de Nuevo
            </Link>
          </div>
        )}

        {status === 'pending' && (
          <div className="mt-4">
            <Link 
              to="/perfil" 
              className="block w-full bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-700 transition text-sm md:text-base"
            >
              Ver Estado del Pedido
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirmacion; 