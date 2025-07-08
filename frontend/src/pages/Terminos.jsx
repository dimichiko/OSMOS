import { Helmet } from 'react-helmet-async';

const Terminos = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Términos y Condiciones | OSMOS</title>
      <meta name="description" content="Términos y condiciones de uso de OSMOS." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Términos y Condiciones</h1>
      <p className="text-gray-700 mb-4">Al usar este sitio aceptas los siguientes términos y condiciones. OSMOS se reserva el derecho de modificar estos términos en cualquier momento.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Los productos y precios pueden cambiar sin previo aviso</li>
        <li>La información proporcionada es solo referencial</li>
        <li>El uso indebido del sitio puede ser sancionado</li>
      </ul>
      <p className="text-gray-600">Para más información, contáctanos en <a href="/contacto" className="text-blue-700 underline">Contacto</a></p>
    </div>
  </main>
);

export default Terminos; 