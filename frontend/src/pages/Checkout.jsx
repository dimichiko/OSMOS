import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from '../config/axios.js';

const Checkout = () => {
  const { items: cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const total = getTotalPrice();

  // Arreglar bucle infinito - usar useCallback
  const fillUserData = useCallback(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.nombre || user.name || '',
        email: user.email || user.correo || user.mail || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    fillUserData();
  }, [fillUserData]);

  // Validar acceso
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

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.address) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear preferencia de pago en el backend
      const response = await axios.post('/payments/create-preference', {
        items: cart,
        total: total,
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address
        }
      });

      if (response.data.success && response.data.init_point) {
        // Redirigir a MercadoPago
        window.location.href = response.data.init_point;
      } else {
        setError('Error al procesar el pago');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.error || 'Error al procesar el pago. Intenta de nuevo.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedPayment = () => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      clearCart();
      navigate('/confirmacion?status=success&payment_id=SIM_CHECKOUT&preference_id=SIM_CHECKOUT_456');
    }, 2000);
  };

  if (!user) return null;
  if (!cart || cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Finalizar Compra</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* Resumen del pedido */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Resumen del Pedido</h2>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-10 h-10 md:w-12 md:h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">{item.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">Cantidad: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm md:text-base">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Dirección</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder="Tu dirección completa"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Información de pago de prueba */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">💳 Información de Pago de Prueba</h3>
            <p className="text-sm text-blue-700 mb-2">
              Para probar el pago, usa estos datos de MercadoPago:
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Tarjeta: 4509 9535 6623 3704</li>
              <li>• Fecha: 11/25</li>
              <li>• CVV: 123</li>
              <li>• DNI: 12345678</li>
            </ul>
          </div>

          {/* Botones de pago */}
          <div className="text-center space-y-3">
            <button 
              onClick={handlePayment}
              disabled={loading}
              className={`bg-blue-600 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg transition text-sm md:text-base w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Procesando...' : 'Pagar con MercadoPago'}
            </button>
            
            <button 
              onClick={handleSimulatedPayment}
              disabled={loading}
              className="bg-green-600 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg transition text-sm md:text-base w-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💳 Pago Simulado (Testing)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;