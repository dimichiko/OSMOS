import { Helmet } from 'react-helmet-async';

const Devoluciones = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Devoluciones | OSMOS</title>
      <meta name="description" content="Política y proceso de devoluciones de OSMOS." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Devoluciones</h1>
      <p className="text-gray-700 mb-4">Puedes solicitar la devolución de tu compra hasta 10 días después de recibir el producto. El producto debe estar sin uso y en su empaque original.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Solicita la devolución escribiendo a <a href="mailto:soporte@osmos.com" className="text-blue-700 underline">soporte@osmos.com</a></li>
        <li>Incluye tu número de pedido y motivo</li>
        <li>Te responderemos con los pasos a seguir</li>
      </ul>
      <p className="text-gray-600">¿Dudas? <a href="/contacto" className="text-blue-700 underline">Contáctanos</a></p>
    </div>
  </main>
);

export default Devoluciones; 