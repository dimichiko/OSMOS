import { useCart } from '../contexts/CartContext.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const Carrito = () => {
  const { items, getTotalPrice, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
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
    if (qty < 1) return;
    updateQuantity(item, qty);
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
      const response = await axios.post('http://localhost:5050/api/payments/create-preference', {
        items: items,
        total: getTotalPrice()
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
    <main className="min-h-screen bg-[#f8f9fb] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Carrito y Pago</h1>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Lista de productos */}
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">Productos</h2>
            <ul className="divide-y divide-gray-200 mb-6">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-contain bg-gray-100" />}
                    <div>
                      <span className="font-bold text-blue-800">{item.name}</span>
                      <span className="ml-2 text-gray-500">{item.flavor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantity(item, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold">-</button>
                    <input type="number" min="1" value={item.quantity || 1} onChange={e => handleQuantity(item, parseInt(e.target.value))} className="w-12 text-center border rounded" />
                    <button onClick={() => handleQuantity(item, (item.quantity || 1) + 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold">+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-indigo-700">${(item.price * (item.quantity || 1)).toLocaleString('es-CL')}</span>
                    <button onClick={() => removeFromCart(item)} className="text-red-500 hover:text-red-700 font-bold text-lg" aria-label="Eliminar">✕</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-700">Total:</span>
              <span className="text-2xl font-black text-indigo-700">${getTotalPrice().toLocaleString('es-CL')}</span>
            </div>
            <button onClick={clearCart} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold hover:bg-gray-300 transition w-full mb-4">Vaciar carrito</button>
          </div>
          {/* Formulario de envío y pago */}
          <form className="space-y-6" onSubmit={handlePagar} autoComplete="off">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Datos de envío</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">Nombre completo</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required disabled={!manual} className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!manual ? 'bg-gray-100 text-gray-500' : ''}`} />
              </div>
              <div className="flex-0">
                <button type="button" onClick={() => setManual(m => !m)} className="text-blue-700 underline text-sm ml-2">{manual ? 'Autorrellenar' : 'Editar manualmente'}</button>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required disabled={!manual} className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!manual ? 'bg-gray-100 text-gray-500' : ''}`} />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Dirección</label>
              <input name="direccion" value={form.direccion} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full font-bold px-8 py-3 rounded-full shadow transition text-lg ${
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
              className="w-full bg-green-600 text-white font-bold px-8 py-3 rounded-full shadow hover:bg-green-700 transition text-lg mt-2"
            >
              💳 Pago Simulado (Para Testing)
            </button>
            {pago && <div className="text-green-600 font-bold text-center mt-4">¡Pago simulado exitoso! (Integración real pendiente)</div>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Carrito;