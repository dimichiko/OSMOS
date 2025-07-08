import { Helmet } from 'react-helmet-async';

const Envios = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Envíos | OSMOS</title>
      <meta name="description" content="Información sobre tiempos y costos de envío de OSMOS." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Envíos</h1>
      <p className="text-gray-700 mb-4">Realizamos envíos a todo el país. Los pedidos se procesan en 24h y el tiempo de entrega es de 2 a 5 días hábiles según tu ubicación.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Envío estándar: $3.990 (gratis sobre $30.000)</li>
        <li>Envío express: $6.990 (1-2 días hábiles)</li>
        <li>Seguimiento online disponible</li>
      </ul>
      <p className="text-gray-600">¿Dudas? <a href="/contacto" className="text-blue-700 underline">Contáctanos</a></p>
    </div>
  </main>
);

export default Envios; 