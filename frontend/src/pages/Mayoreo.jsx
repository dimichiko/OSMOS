import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Mayoreo = () => (
  <main className="bg-[#f8f9fb] min-h-screen">
    <Helmet>
      <title>Ventas por Mayor | OSMOS</title>
      <meta name="description" content="Precios especiales para compras al por mayor de electrolitos OSMOS." />
    </Helmet>

    {/* Header */}
    <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
      <h1 className="font-extrabold text-4xl mb-4">Ventas por Mayor</h1>
      <p className="text-lg opacity-90 max-w-xl mx-auto">Precios especiales para distribuidores y comercios</p>
    </header>

    {/* Contenido */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <h2 className="font-bold text-xl text-blue-800 mb-4">🏪 Comercio</h2>
            <p className="text-2xl font-bold text-blue-600 mb-2">50+ unidades</p>
            <p className="text-gray-700 mb-4">Descuento del 15%</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Envío gratis</li>
              <li>• Facturación</li>
              <li>• Soporte comercial</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 text-center">
            <h2 className="font-bold text-xl text-green-800 mb-4">🏢 Distribuidor</h2>
            <p className="text-2xl font-bold text-green-600 mb-2">100+ unidades</p>
            <p className="text-gray-700 mb-4">Descuento del 25%</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Envío gratis</li>
              <li>• Facturación</li>
              <li>• Material promocional</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <h2 className="font-bold text-xl text-purple-800 mb-4">🏭 Mayorista</h2>
            <p className="text-2xl font-bold text-purple-600 mb-2">500+ unidades</p>
            <p className="text-gray-700 mb-4">Descuento del 35%</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Envío gratis</li>
              <li>• Facturación</li>
              <li>• Exclusividad regional</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">📋 Requisitos</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Registro de comercio vigente</li>
              <li>RUT válido para facturación</li>
              <li>Pedido mínimo según categoría</li>
              <li>Compromiso de compra mensual</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">🎁 Beneficios Adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">📦 Logística</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Envíos programados</li>
                  <li>• Almacenamiento temporal</li>
                  <li>• Entrega en horario comercial</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">📈 Marketing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Material promocional</li>
                  <li>• Banners y displays</li>
                  <li>• Campañas personalizadas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3">📞 Contacto Comercial</h3>
            <p className="text-gray-700 mb-4">¿Interesado en ser distribuidor? Nuestro equipo comercial te contactará en 24h.</p>
            <Link to="/contacto" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition">
              Solicitar Información
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Mayoreo; 