import { Helmet } from 'react-helmet-async';

const Cookies = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Política de Cookies | OSMOS</title>
      <meta name="description" content="Política de cookies de OSMOS. Cómo utilizamos las cookies para mejorar tu experiencia." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12 md:py-16 text-center">
      <h1 className="font-extrabold text-2xl md:text-4xl mb-4">Política de Cookies</h1>
      <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto">Cómo utilizamos las cookies para mejorar tu experiencia</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="font-bold text-lg md:text-xl text-blue-800 mb-3 md:mb-4">🍪 ¿Qué son las Cookies?</h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base">Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a recordar tus preferencias y mejorar tu experiencia de navegación.</p>
          </div>

          <div>
            <h2 className="font-bold text-lg md:text-xl text-blue-800 mb-4">📊 Tipos de Cookies que Utilizamos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-blue-50 rounded-xl p-4 md:p-6">
                <h3 className="font-bold text-blue-800 mb-3 text-sm md:text-base">🔧 Cookies Técnicas</h3>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                  <li>• Funcionamiento del sitio</li>
                  <li>• Seguridad y autenticación</li>
                  <li>• Preferencias de idioma</li>
                  <li>• Carrito de compras</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-4 md:p-6">
                <h3 className="font-bold text-green-800 mb-3 text-sm md:text-base">📈 Cookies Analíticas</h3>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                  <li>• Estadísticas de uso</li>
                  <li>• Rendimiento del sitio</li>
                  <li>• Mejoras de experiencia</li>
                  <li>• Análisis de comportamiento</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg md:text-xl text-blue-800 mb-4">🎯 Cómo Utilizamos las Cookies</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
              <li>Recordar tus preferencias de navegación</li>
              <li>Mantener tu sesión activa</li>
              <li>Analizar el uso del sitio web</li>
              <li>Mejorar la funcionalidad</li>
              <li>Personalizar el contenido</li>
              <li>Proporcionar soporte técnico</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg md:text-xl text-blue-800 mb-4">🔧 Cookies de Terceros</h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base">También utilizamos servicios de terceros que pueden instalar cookies:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
              <li><strong>MercadoPago:</strong> Para procesar pagos de forma segura</li>
              <li><strong>Google Analytics:</strong> Para analizar el tráfico del sitio</li>
              <li><strong>Google Fonts:</strong> Para cargar fuentes tipográficas</li>
              <li><strong>Vite:</strong> Para el desarrollo y optimización</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg md:text-xl text-blue-800 mb-4">⚙️ Control de Cookies</h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base">Puedes controlar y gestionar las cookies de varias maneras:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">🌐 Configuración del Navegador</h3>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                  <li>• Chrome: Configuración → Privacidad</li>
                  <li>• Firefox: Opciones → Privacidad</li>
                  <li>• Safari: Preferencias → Privacidad</li>
                  <li>• Edge: Configuración → Cookies</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">🔧 Herramientas de Control</h3>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                  <li>• Panel de preferencias</li>
                  <li>• Configuración de privacidad</li>
                  <li>• Herramientas de desarrollador</li>
                  <li>• Extensiones de navegador</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg md:text-xl text-blue-800 mb-4">⚠️ Consecuencias de Deshabilitar Cookies</h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base">Si deshabilitas las cookies, es posible que:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
              <li>No puedas acceder a ciertas funciones del sitio</li>
              <li>Tu carrito de compras no se mantenga</li>
              <li>No recordemos tus preferencias</li>
              <li>La experiencia de navegación sea menos personalizada</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 md:p-6">
            <p className="text-xs md:text-sm text-gray-600 text-center">
              <strong>Última actualización:</strong> Julio 2025<br />
              Esta política se actualiza regularmente. Te notificaremos de cambios importantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Cookies; 