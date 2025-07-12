import { Helmet } from 'react-helmet-async';

const Terminos = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Términos y Condiciones | OSMOS</title>
      <meta name="description" content="Términos y condiciones de uso de OSMOS. Políticas legales y comerciales." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
      <h1 className="font-extrabold text-4xl mb-4">Términos y Condiciones</h1>
      <p className="text-lg opacity-90 max-w-xl mx-auto">Políticas legales y comerciales de OSMOS</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">📋 Aceptación de Términos</h2>
            <p className="text-gray-700 mb-4">Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.</p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🛒 Compra y Pago</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Todos los precios están en pesos chilenos e incluyen IVA</li>
              <li>Los pagos se procesan a través de MercadoPago</li>
              <li>Reservamos el derecho de rechazar pedidos</li>
              <li>Los productos se envían una vez confirmado el pago</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🚚 Envíos y Entrega</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Realizamos envíos a todo Chile</li>
              <li>Los tiempos de entrega son estimados</li>
              <li>No nos hacemos responsables por retrasos de transportistas</li>
              <li>El cliente debe estar disponible para recibir el pedido</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🔄 Devoluciones</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Aceptamos devoluciones hasta 10 días después de la recepción</li>
              <li>El producto debe estar sin usar y en empaque original</li>
              <li>Los gastos de envío de devolución corren por cuenta del cliente</li>
              <li>No aceptamos devoluciones de productos personalizados</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">🔒 Privacidad</h2>
            <p className="text-gray-700 mb-4">Tu privacidad es importante para nosotros. Recopilamos solo la información necesaria para procesar tu pedido y mejorar nuestro servicio. No compartimos tu información con terceros sin tu consentimiento.</p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">⚖️ Limitación de Responsabilidad</h2>
            <p className="text-gray-700 mb-4">OSMOS no se hace responsable por daños indirectos, incidentales o consecuentes que puedan resultar del uso de nuestros productos. Nuestra responsabilidad se limita al valor del producto comprado.</p>
          </div>

          <div>
            <h2 className="font-bold text-xl text-blue-800 mb-4">📞 Contacto</h2>
            <p className="text-gray-700">Para consultas sobre estos términos, contáctanos a través de nuestra página de contacto o al email legal@osmos.com</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-sm text-gray-600 text-center">
              <strong>Última actualización:</strong> Julio 2025<br />
              Estos términos pueden ser modificados sin previo aviso.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Terminos; 