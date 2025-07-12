import { Helmet } from 'react-helmet-async';

const Privacidad = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Política de Privacidad | OSMOS</title>
      <meta name="description" content="Política de privacidad de OSMOS. Cómo protegemos y utilizamos tu información personal." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
      <h1 className="font-extrabold text-4xl mb-4">Política de Privacidad</h1>
      <p className="text-lg opacity-90 max-w-xl mx-auto">Cómo protegemos y utilizamos tu información personal</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🔒 Información que Recopilamos</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Información de contacto (nombre, email, teléfono)</li>
              <li>Dirección de envío y facturación</li>
              <li>Información de pago (procesada por MercadoPago)</li>
              <li>Historial de compras y preferencias</li>
              <li>Datos de navegación y cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🎯 Cómo Utilizamos tu Información</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Procesar y enviar tus pedidos</li>
              <li>Comunicarnos contigo sobre tu cuenta</li>
              <li>Enviar información sobre productos y promociones</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🤝 Compartir Información</h2>
            <p className="text-gray-700 mb-4">No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Con tu consentimiento explícito</li>
              <li>Para procesar pagos (MercadoPago)</li>
              <li>Para cumplir con la ley</li>
              <li>Para proteger nuestros derechos y seguridad</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🍪 Cookies y Tecnologías</h2>
            <p className="text-gray-700 mb-4">Utilizamos cookies y tecnologías similares para:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Recordar tus preferencias</li>
              <li>Analizar el uso del sitio</li>
              <li>Mejorar la experiencia de usuario</li>
              <li>Proporcionar contenido personalizado</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🛡️ Seguridad</h2>
            <p className="text-gray-700 mb-4">Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">👤 Tus Derechos</h2>
            <p className="text-gray-700 mb-4">Tienes derecho a:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Acceder a tu información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">📞 Contacto</h2>
            <p className="text-gray-700">Para ejercer tus derechos o consultas sobre privacidad, contáctanos en:</p>
            <ul className="list-none space-y-1 text-gray-700 mt-2">
              <li>📧 Email: privacidad@osmos.com</li>
              <li>📱 Teléfono: +56 2 2345 6789</li>
              <li>📍 Dirección: Av. Providencia 1234, Santiago</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-sm text-gray-600 text-center">
              <strong>Última actualización:</strong> Julio 2025<br />
              Esta política puede ser actualizada. Te notificaremos de cambios importantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Privacidad; 