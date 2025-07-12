import { Helmet } from 'react-helmet-async';

const Devoluciones = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Devoluciones | OSMOS</title>
      <meta name="description" content="Política de devoluciones y cambios de OSMOS. Proceso simple y transparente." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
      <h1 className="font-extrabold text-4xl mb-4">Devoluciones</h1>
      <p className="text-lg opacity-90 max-w-xl mx-auto">Proceso simple y transparente para cambios y devoluciones</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 rounded-xl p-6">
            <h2 className="font-bold text-xl text-green-800 mb-4">✅ Devolución Completa</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 10 días desde la recepción</li>
              <li>• Producto sin usar</li>
              <li>• Empaque original</li>
              <li>• Reembolso completo</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="font-bold text-xl text-blue-800 mb-4">🔄 Cambio de Producto</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 15 días desde la recepción</li>
              <li>• Por defecto de fábrica</li>
              <li>• Sin costo adicional</li>
              <li>• Envío incluido</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">📋 Proceso de Devolución</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Contacta nuestro servicio al cliente</li>
              <li>Proporciona número de pedido y motivo</li>
              <li>Recibe etiqueta de envío prepagada</li>
              <li>Envía el producto en 5 días</li>
              <li>Recibe reembolso en 3-5 días hábiles</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">❌ No Aceptamos Devoluciones</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Productos abiertos o usados</li>
              <li>Empaques dañados o faltantes</li>
              <li>Productos personalizados</li>
              <li>Después de 10 días de recepción</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">❓ Preguntas Frecuentes</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">¿Cuánto tarda el reembolso?</h4>
                <p className="text-gray-600">3-5 días hábiles una vez recibido el producto en nuestras instalaciones.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">¿Quién paga el envío de devolución?</h4>
                <p className="text-gray-600">OSMOS cubre el costo del envío de devolución. Te enviamos etiqueta prepagada.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">¿Puedo cambiar por otro sabor?</h4>
                <p className="text-gray-600">Sí, siempre que el producto esté sin abrir y en empaque original.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Devoluciones; 