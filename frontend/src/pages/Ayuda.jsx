import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Ayuda = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Centro de Ayuda | OSMOS</title>
      <meta name="description" content="Resuelve tus dudas sobre OSMOS: envíos, devoluciones, soporte y más." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
      <h1 className="font-extrabold text-4xl mb-4">Centro de Ayuda</h1>
      <p className="text-lg opacity-90 max-w-xl mx-auto">Encuentra respuestas rápidas a tus preguntas</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <p className="text-gray-600 mb-8 text-center">¿No encuentras lo que buscas? <Link to="/contacto" className="text-blue-700 underline font-semibold">Contáctanos</Link> para soporte personalizado.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="font-bold text-lg text-blue-800 mb-3">🚚 Envíos</h2>
              <p className="text-gray-700 mb-3">Los envíos nacionales demoran entre 2 y 5 días hábiles.</p>
              <Link to="/envios" className="text-blue-700 underline font-semibold">Ver detalles →</Link>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="font-bold text-lg text-blue-800 mb-3">🔄 Devoluciones</h2>
              <p className="text-gray-700 mb-3">Tienes hasta 10 días para solicitar devoluciones.</p>
              <Link to="/devoluciones" className="text-blue-700 underline font-semibold">Ver proceso →</Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="font-bold text-lg text-blue-800 mb-3">🏢 Ventas por Mayor</h2>
              <p className="text-gray-700 mb-3">Precios especiales para compras al por mayor.</p>
              <Link to="/mayoreo" className="text-blue-700 underline font-semibold">Ver ofertas →</Link>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="font-bold text-lg text-blue-800 mb-3">📋 Términos y Condiciones</h2>
              <p className="text-gray-700 mb-3">Consulta nuestros términos legales.</p>
              <Link to="/terminos" className="text-blue-700 underline font-semibold">Ver términos →</Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">¿Cómo funciona la hidratación con electrolitos?</h3>
              <p className="text-gray-700">Los electrolitos son minerales que ayudan a mantener el balance hídrico del cuerpo. Nuestros productos están formulados científicamente para máxima absorción.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">¿Son seguros para niños?</h3>
              <p className="text-gray-700">Nuestros productos están formulados para adultos. Consulta con un médico antes de dar a niños menores de 12 años.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">¿Puedo usar OSMOS todos los días?</h3>
              <p className="text-gray-700">Sí, nuestros electrolitos son seguros para uso diario. Son 100% naturales y sin efectos secundarios.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Ayuda; 