import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { Helmet } from 'react-helmet-async';

const Confirmacion = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const status = searchParams.get('status') || 'success';

  useEffect(() => {
    // Limpiar el carrito cuando se confirma el pago
    if (status === 'success') {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 md:py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center">
        <div className="mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl md:text-3xl">✅</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación pronto.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 md:p-6">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Detalles del Pedido</h2>
            <div className="text-sm md:text-base text-gray-600 space-y-2">
              <p><span className="font-medium">Número de pedido:</span> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p><span className="font-medium">Estado:</span> <span className="text-green-600">Confirmado</span></p>
              <p><span className="font-medium">Fecha:</span> {new Date().toLocaleDateString('es-CL')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default Confirmacion; 