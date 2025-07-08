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

      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* INFORMACIÓN DE CONTACTO */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-6 justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-4 text-center md:text-left">Información de Contacto</h2>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="font-semibold text-blue-700">Dirección</h3>
                <p className="text-gray-600 text-sm">Av. Principal 123<br />Ciudad Deportiva, CD 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <h3 className="font-semibold text-blue-700">Teléfono</h3>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-600 text-sm">+1 (555) 987-6543</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">✉️</span>
              <div>
                <h3 className="font-semibold text-blue-700">Email</h3>
                <p className="text-gray-600 text-sm">info@osmos.com</p>
                <p className="text-gray-600 text-sm">soporte@osmos.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🕒</span>
              <div>
                <h3 className="font-semibold text-blue-700">Horarios</h3>
                <p className="text-gray-600 text-sm">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 text-sm">Sábados: 10:00 AM - 4:00 PM</p>
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
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-6 text-center">Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Formulario de contacto" role="form">
              <div>
                <label htmlFor="nombre" className="block font-semibold text-blue-700 mb-1">Nombre Completo *</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700`} aria-invalid={!!errors.nombre} aria-describedby="error-nombre" />
                {errors.nombre && <p id="error-nombre" className="text-red-500 text-sm mt-1" role="alert">{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold text-blue-700 mb-1">Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700`} aria-invalid={!!errors.email} aria-describedby="error-email" />
                {errors.email && <p id="error-email" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="telefono" className="block font-semibold text-blue-700 mb-1">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700" />
              </div>
              <div>
                <label htmlFor="asunto" className="block font-semibold text-blue-700 mb-1">Asunto *</label>
                <select id="asunto" name="asunto" value={formData.asunto} onChange={handleChange} required className={`w-full border ${errors.asunto ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700`} aria-invalid={!!errors.asunto} aria-describedby="error-asunto">
                  <option value="">Selecciona un asunto</option>
                  <option value="productos">Consulta sobre Productos</option>
                  <option value="pedidos">Estado de Pedidos</option>
                  <option value="devoluciones">Devoluciones</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="otros">Otros</option>
                </select>
                {errors.asunto && <p id="error-asunto" className="text-red-500 text-sm mt-1" role="alert">{errors.asunto}</p>}
              </div>
              <div>
                <label htmlFor="mensaje" className="block font-semibold text-blue-700 mb-1">Mensaje *</label>
                <textarea id="mensaje" name="mensaje" rows="5" value={formData.mensaje} onChange={handleChange} required placeholder="Cuéntanos cómo podemos ayudarte..." className={`w-full border ${errors.mensaje ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700`} aria-invalid={!!errors.mensaje} aria-describedby="error-mensaje"></textarea>
                {errors.mensaje && <p id="error-mensaje" className="text-red-500 text-sm mt-1" role="alert">{errors.mensaje}</p>}
              </div>
              <button type="submit" className="w-full bg-gradient-to-br from-blue-700 to-blue-900 text-white font-bold py-3 rounded-lg shadow-md hover:from-blue-800 hover:to-blue-900 transition">Enviar Mensaje</button>
              {success && <div className="text-green-600 text-center mt-4" role="status" aria-live="polite">{success}</div>}
              {errors.general && <div className="text-red-600 text-center mb-2" role="alert">{errors.general}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold text-blue-700 mb-2">¿Cómo puedo hacer un pedido?</h3>
            <p className="text-gray-600 text-sm">Puedes hacer tu pedido a través de nuestra tienda online o contactándonos directamente por teléfono o email.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold text-blue-700 mb-2">¿Cuánto tiempo tarda la entrega?</h3>
            <p className="text-gray-600 text-sm">Los envíos estándar tardan 3-5 días hábiles. Ofrecemos envío express para entregas más rápidas.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold text-blue-700 mb-2">¿Tienen garantía de devolución?</h3>
            <p className="text-gray-600 text-sm">Sí, ofrecemos 30 días de garantía de devolución si no estás satisfecho con tu compra.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold text-blue-700 mb-2">¿Los productos son seguros para consumo?</h3>
            <p className="text-gray-600 text-sm">Todos nuestros productos están certificados y cumplen con los más altos estándares de calidad y seguridad.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;