import { useCart } from '../contexts/CartContext.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';

const Carrito = () => {
  const { items, getTotalPrice, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', direccion: '' });
  const [pago, setPago] = useState(false);
  const [manual, setManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && !manual) {
      setForm(f => ({ ...f, nombre: user.nombre || user.name || '', email: user.email || user.correo || user.mail || '' }));
    }
  }, [user, manual]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuantity = (item, qty) => {
    if (qty < 1) qty = 1;
    if (qty > 99) qty = 99;
    updateQuantity(item.id, qty);
  };

  const handlePagar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPago(false);

    try {
      // Validar que hay productos en el carrito
      if (items.length === 0) {
        setError('El carrito está vacío');
        return;
      }

      // Validar datos de envío
      if (!form.nombre || !form.email || !form.direccion) {
        setError('Por favor completa todos los datos de envío');
        return;
      }

      // Crear preferencia de pago
      const response = await axios.post('/payments/create-preference', {
        items: items,
        total: getTotalPrice(),
        customer: form
      });

      if (response.data.success && response.data.init_point) {
        // Redirigir a Mercado Pago
        window.location.href = response.data.init_point;
      } else {
        setError('Error al procesar el pago');
      }

    } catch (err) {
      console.error('Error en pago:', err);
      const errorMsg = err.response?.data?.error || 'Error al procesar el pago.';
      setError(`${errorMsg} Si persiste el problema, usa el botón "Pago Simulado" para testing.`);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Tu carrito está vacío</h1>
        <a href="/productos" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition">Ver productos</a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-6 md:mb-8 text-center">Carrito y Pago</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Lista de productos */}
          <div>
            <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-4">Productos</h2>
            <ul className="divide-y divide-gray-200 mb-6">
              {items.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 space-y-3 sm:space-y-0">
                  <div className="flex items-center gap-3 flex-1">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-contain bg-gray-100 flex-shrink-0" />}
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-blue-800 block truncate">{item.name}</span>
                      <span className="text-gray-500 text-sm">{item.flavor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button onClick={() => handleQuantity(item, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold text-sm">-</button>
                    <input type="number" min="1" max="99" value={item.quantity || 1} onChange={e => handleQuantity(item, parseInt(e.target.value) || 1)} className="w-12 h-8 text-center border rounded text-sm" />
                    <button onClick={() => handleQuantity(item, (item.quantity || 1) + 1)} className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold text-sm">+</button>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    <span className="font-bold text-indigo-700 text-sm md:text-base">${(item.price * (item.quantity || 1)).toLocaleString('es-CL')}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold text-lg p-1" aria-label="Eliminar">✕</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg md:text-xl font-bold text-gray-700">Total:</span>
              <span className="text-xl md:text-2xl font-black text-indigo-700">${getTotalPrice().toLocaleString('es-CL')}</span>
            </div>
            <button onClick={clearCart} className="bg-gray-200 text-gray-700 px-4 md:px-6 py-2 rounded-full font-bold hover:bg-gray-300 transition w-full mb-4 text-sm md:text-base">Vaciar carrito</button>
            <button onClick={() => navigate('/checkout')} className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition w-full text-sm md:text-base">Ir al Checkout</button>
          </div>
          {/* Formulario de envío y pago */}
          <form className="space-y-4 md:space-y-6" onSubmit={handlePagar} autoComplete="off">
            <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-4">Datos de envío</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2 items-start">
              <div className="w-full">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">Nombre completo</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required disabled={!manual} className={`w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${!manual ? 'bg-gray-100 text-gray-500' : ''}`} />
              </div>
              <div className="w-full">
                <button type="button" onClick={() => setManual(m => !m)} className="text-blue-700 underline text-xs md:text-sm">{manual ? 'Autorrellenar' : 'Editar manualmente'}</button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="w-full">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required disabled={!manual} className={`w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${!manual ? 'bg-gray-100 text-gray-500' : ''}`} />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1 text-sm">Dirección</label>
              <input name="direccion" value={form.direccion} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full font-bold px-4 md:px-8 py-3 rounded-full shadow transition text-sm md:text-lg ${
                loading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
              }`}
            >
              {loading ? 'Procesando pago...' : 'Pagar con Mercado Pago'}
            </button>
            <button 
              type="button"
              onClick={() => {
                setPago(true);
                setTimeout(() => {
                  setPago(false);
                  clearCart();
                  window.location.href = '/confirmacion?status=success';
                }, 2000);
              }}
              className="w-full bg-green-600 text-white font-bold px-4 md:px-8 py-3 rounded-full shadow hover:bg-green-700 transition text-sm md:text-lg mt-2"
            >
              💳 Pago Simulado (Para Testing)
            </button>
            {pago && <div className="text-green-600 font-bold text-center mt-4 text-sm">¡Pago simulado exitoso! (Integración real pendiente)</div>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Carrito;