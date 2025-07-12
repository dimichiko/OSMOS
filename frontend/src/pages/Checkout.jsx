import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const Checkout = () => {
  const { items: cart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = getTotalPrice();

  const handlePayment = () => {
    // Aquí iría la lógica de pago con MercadoPago
    console.log('Procesando pago...');
    navigate('/confirmacion');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!cart || cart.length === 0) {
      navigate('/carrito');
      return;
    }
  }, [user, cart, navigate]);

  if (!user) return null;
  if (!cart || cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Finalizar Compra</h1>
          
          {/* Resumen del pedido */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Resumen del Pedido</h2>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-10 h-10 md:w-12 md:h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">{item.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm md:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-lg md:text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Información de Envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Dirección</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
                  rows="3"
                  placeholder="Tu dirección completa"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Botón de pago */}
          <div className="text-center">
            <button 
              onClick={handlePayment}
              className="bg-blue-600 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;