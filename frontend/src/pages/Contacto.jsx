import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from '../config/axios';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.email) newErrors.email = "El email es obligatorio";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.asunto) newErrors.asunto = "Selecciona un asunto";
    if (!formData.mensaje) newErrors.mensaje = "El mensaje es obligatorio";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const res = await axios.post('/api/contacto', formData);
        setSuccess(res.data.message);
        setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
        setErrors({});
        setTimeout(() => setSuccess(""), 5000);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ general: 'Error de servidor. Intenta más tarde.' });
        }
        setSuccess("");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSuccess("");
    }
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OSMOS",
    "url": "https://tusitio.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer support",
        "areaServed": "CL",
        "availableLanguage": ["Spanish", "English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-987-6543",
        "contactType": "sales",
        "areaServed": "CL",
        "availableLanguage": ["Spanish", "English"]
      }
    ]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo puedo hacer un pedido?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes hacer tu pedido a través de nuestra tienda online o contactándonos directamente por teléfono o email."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda la entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los envíos estándar tardan 3-5 días hábiles. Ofrecemos envío express para entregas más rápidas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tienen garantía de devolución?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, ofrecemos 30 días de garantía de devolución si no estás satisfecho con tu compra."
        }
      },
      {
        "@type": "Question",
        "name": "¿Los productos son seguros para consumo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Todos nuestros productos están certificados y cumplen con los más altos estándares de calidad y seguridad."
        }
      }
    ]
  };

  return (
    <main className="bg-[#f8f9fb] min-h-screen">
      <Helmet>
        <title>Contacto OSMOS | Soporte, Pedidos y Consultas</title>
        <meta name="description" content="Contáctanos para soporte, pedidos, devoluciones o consultas sobre OSMOS. Respuesta rápida y atención personalizada." />
        <meta property="og:title" content="Contacto OSMOS | Soporte, Pedidos y Consultas" />
        <meta property="og:description" content="Contáctanos para soporte, pedidos, devoluciones o consultas sobre OSMOS. Respuesta rápida y atención personalizada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tusitio.com/contacto" />
        <link rel="canonical" href="https://tusitio.com/contacto" />
        <script type="application/ld+json">{JSON.stringify(contactJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 rounded-b-3xl shadow-lg text-center mb-12">
        <h1 className="font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">Contáctanos</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">Estamos aquí para ayudarte. ¡Hablemos!</p>
      </header>

      <section className="max-w-6xl mx-auto px-4 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* INFORMACIÓN DE CONTACTO */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 flex flex-col gap-4 md:gap-6 justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-800 mb-4 text-center lg:text-left">Información de Contacto</h2>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-xl md:text-2xl">📍</span>
              <div>
                <h3 className="font-semibold text-blue-700 text-sm md:text-base">Dirección</h3>
                <p className="text-gray-600 text-xs md:text-sm">Av. Principal 123<br />Ciudad Deportiva, CD 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-xl md:text-2xl">📞</span>
              <div>
                <h3 className="font-semibold text-blue-700 text-sm md:text-base">Teléfono</h3>
                <p className="text-gray-600 text-xs md:text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-600 text-xs md:text-sm">+1 (555) 987-6543</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-xl md:text-2xl">✉️</span>
              <div>
                <h3 className="font-semibold text-blue-700 text-sm md:text-base">Email</h3>
                <p className="text-gray-600 text-xs md:text-sm">info@osmos.com</p>
                <p className="text-gray-600 text-xs md:text-sm">soporte@osmos.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-xl md:text-2xl">🕒</span>
              <div>
                <h3 className="font-semibold text-blue-700 text-sm md:text-base">Horarios</h3>
                <p className="text-gray-600 text-xs md:text-sm">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 text-xs md:text-sm">Sábados: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Síguenos</h3>
              <div className="flex gap-3 flex-wrap">
                <a href="#" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm hover:bg-blue-200 transition"><span>📘</span>Facebook</a>
                <a href="#" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-pink-100 text-pink-700 font-semibold text-sm hover:bg-pink-200 transition"><span>📷</span>Instagram</a>
                <a href="#" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-200 text-blue-800 font-semibold text-sm hover:bg-blue-300 transition"><span>🐦</span>Twitter</a>
                <a href="#" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold text-sm hover:bg-gray-300 transition"><span>💼</span>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-800 mb-6 text-center">Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" noValidate aria-label="Formulario de contacto" role="form">
              <div>
                <label htmlFor="nombre" className="block font-semibold text-blue-700 mb-1 text-sm md:text-base">Nombre Completo *</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm md:text-base`} aria-invalid={!!errors.nombre} aria-describedby="error-nombre" />
                {errors.nombre && <p id="error-nombre" className="text-red-500 text-xs md:text-sm mt-1" role="alert">{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold text-blue-700 mb-1 text-sm md:text-base">Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm md:text-base`} aria-invalid={!!errors.email} aria-describedby="error-email" />
                {errors.email && <p id="error-email" className="text-red-500 text-xs md:text-sm mt-1" role="alert">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="telefono" className="block font-semibold text-blue-700 mb-1 text-sm md:text-base">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm md:text-base" />
              </div>
              <div>
                <label htmlFor="asunto" className="block font-semibold text-blue-700 mb-1 text-sm md:text-base">Asunto *</label>
                <select id="asunto" name="asunto" value={formData.asunto} onChange={handleChange} required className={`w-full border ${errors.asunto ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm md:text-base`} aria-invalid={!!errors.asunto} aria-describedby="error-asunto">
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta general</option>
                  <option value="pedido">Información de pedidos</option>
                  <option value="devolucion">Devoluciones y cambios</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="mayoreo">Ventas por mayor</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.asunto && <p id="error-asunto" className="text-red-500 text-xs md:text-sm mt-1" role="alert">{errors.asunto}</p>}
              </div>
              <div>
                <label htmlFor="mensaje" className="block font-semibold text-blue-700 mb-1 text-sm md:text-base">Mensaje *</label>
                <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} required rows="4" className={`w-full border ${errors.mensaje ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm md:text-base resize-none`} aria-invalid={!!errors.mensaje} aria-describedby="error-mensaje" placeholder="Escribe tu mensaje aquí..."></textarea>
                {errors.mensaje && <p id="error-mensaje" className="text-red-500 text-xs md:text-sm mt-1" role="alert">{errors.mensaje}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm md:text-base ${
                isSubmitting 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
              }`}>
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              {success && <div className="text-green-600 text-center mt-4 text-sm md:text-base" role="status" aria-live="polite">{success}</div>}
              {errors.general && <div className="text-red-600 text-center mb-2 text-sm md:text-base" role="alert">{errors.general}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 mb-16 md:mb-20">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-800 mb-6 md:mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
            <h3 className="font-semibold text-blue-700 mb-2 text-sm md:text-base">¿Cómo puedo hacer un pedido?</h3>
            <p className="text-gray-600 text-xs md:text-sm">Puedes hacer tu pedido a través de nuestra tienda online o contactándonos directamente por teléfono o email.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
            <h3 className="font-semibold text-blue-700 mb-2 text-sm md:text-base">¿Cuánto tiempo tarda la entrega?</h3>
            <p className="text-gray-600 text-xs md:text-sm">Los envíos estándar tardan 3-5 días hábiles. Ofrecemos envío express para entregas más rápidas.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
            <h3 className="font-semibold text-blue-700 mb-2 text-sm md:text-base">¿Tienen garantía de devolución?</h3>
            <p className="text-gray-600 text-xs md:text-sm">Sí, ofrecemos 30 días de garantía de devolución si no estás satisfecho con tu compra.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
            <h3 className="font-semibold text-blue-700 mb-2 text-sm md:text-base">¿Los productos son seguros para consumo?</h3>
            <p className="text-gray-600 text-xs md:text-sm">Todos nuestros productos están certificados y cumplen con los más altos estándares de calidad y seguridad.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;