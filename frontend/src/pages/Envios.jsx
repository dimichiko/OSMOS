import { Helmet } from 'react-helmet-async';

const Envios = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Envíos | OSMOS</title>
      <meta name="description" content="Información sobre envíos, tiempos de entrega y costos de OSMOS." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
      <h1 className="font-extrabold text-4xl mb-4">Envíos</h1>
      <p className="text-lg opacity-90 max-w-xl mx-auto">Entregamos en todo Chile con rapidez y seguridad</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="font-bold text-xl text-blue-800 mb-4">🚚 Envío Estándar</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 2-5 días hábiles</li>
              <li>• Todo Chile</li>
              <li>• $3.990</li>
              <li>• Sin seguimiento</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h2 className="font-bold text-xl text-green-800 mb-4">⚡ Envío Express</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 1-2 días hábiles</li>
              <li>• Santiago y regiones</li>
              <li>• $5.990</li>
              <li>• Con seguimiento</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">📦 ¿Cómo funciona?</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Realiza tu pedido en nuestra tienda</li>
              <li>Recibe confirmación por email</li>
              <li>Procesamos tu pedido en 24h</li>
              <li>Enviamos con tu transportista elegido</li>
              <li>Recibes en tu puerta</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">📍 Zonas de Cobertura</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-blue-700">Envío Estándar</h4>
                <p>Todas las regiones de Chile</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700">Envío Express</h4>
                <p>Santiago, Valparaíso, Concepción, Antofagasta</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">❓ Preguntas Frecuentes</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">¿Cuándo llega mi pedido?</h4>
                <p className="text-gray-600">Los tiempos varían según el tipo de envío elegido. Estándar: 2-5 días, Express: 1-2 días.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">¿Puedo rastrear mi pedido?</h4>
                <p className="text-gray-600">Solo envíos Express incluyen seguimiento. Recibirás el código por email.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">¿Qué pasa si no estoy en casa?</h4>
                <p className="text-gray-600">El repartidor intentará 2 veces. Si no hay nadie, dejará aviso para retirar en sucursal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Envios; 