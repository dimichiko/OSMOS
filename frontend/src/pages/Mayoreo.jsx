import { Helmet } from 'react-helmet-async';

const Mayoreo = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Ventas por Mayor | OSMOS</title>
      <meta name="description" content="Compra OSMOS al por mayor y obtén precios especiales." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Ventas por Mayor</h1>
      <p className="text-gray-700 mb-4">¿Tienes un gimnasio, tienda o quieres distribuir OSMOS? Ofrecemos precios especiales y atención personalizada para compras al por mayor.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Descuentos por volumen</li>
        <li>Envíos rápidos y seguros</li>
        <li>Soporte dedicado</li>
      </ul>
      <p className="text-gray-600">Solicita cotización escribiendo a <a href="mailto:ventas@osmos.com" className="text-blue-700 underline">ventas@osmos.com</a></p>
    </div>
  </main>
);

export default Mayoreo; 