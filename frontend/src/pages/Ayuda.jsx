import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Ayuda = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Centro de Ayuda | OSMOS</title>
      <meta name="description" content="Resuelve tus dudas sobre OSMOS: envíos, devoluciones, soporte y más." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Centro de Ayuda</h1>
      <p className="text-gray-600 mb-8 text-center">Encuentra respuestas a las preguntas más frecuentes o <Link to="/contacto" className="text-blue-700 underline">contáctanos</Link> para soporte personalizado.</p>
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-lg text-blue-800 mb-2">¿Cuánto tardan los envíos?</h2>
          <p className="text-gray-700">Los envíos nacionales demoran entre 2 y 5 días hábiles. Puedes ver más detalles en la sección <Link to="/envios" className="text-blue-700 underline">Envíos</Link>.</p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-blue-800 mb-2">¿Cómo solicito una devolución?</h2>
          <p className="text-gray-700">Tienes hasta 10 días para solicitar devoluciones. Consulta el proceso en <Link to="/devoluciones" className="text-blue-700 underline">Devoluciones</Link>.</p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-blue-800 mb-2">¿Ofrecen ventas por mayor?</h2>
          <p className="text-gray-700">Sí, tenemos precios especiales para compras al por mayor. Más info en <Link to="/mayoreo" className="text-blue-700 underline">Ventas por Mayor</Link>.</p>
        </div>
        <div>
          <h2 className="font-bold text-lg text-blue-800 mb-2">¿Dónde puedo ver los términos y condiciones?</h2>
          <p className="text-gray-700">Puedes revisar todos los términos en <Link to="/terminos" className="text-blue-700 underline">Términos y Condiciones</Link>.</p>
        </div>
      </div>
    </div>
  </main>
);

export default Ayuda; 