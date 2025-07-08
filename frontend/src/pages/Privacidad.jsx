import { Helmet } from 'react-helmet-async';

const Privacidad = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Política de Privacidad | OSMOS</title>
      <meta name="description" content="Política de privacidad y protección de datos de OSMOS." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Política de Privacidad</h1>
      <p className="text-gray-700 mb-4">En OSMOS nos tomamos muy en serio la privacidad de tus datos. Toda la información personal que nos proporcionas es tratada de forma confidencial y segura.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>No compartimos tus datos con terceros sin tu consentimiento.</li>
        <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
        <li>Solo usamos tu información para procesar pedidos y enviarte novedades si lo autorizas.</li>
      </ul>
      <p className="text-gray-600">Si tienes dudas, contáctanos en <a href="/contacto" className="text-blue-700 underline">Contacto</a>.</p>
    </div>
  </main>
);

export default Privacidad; 