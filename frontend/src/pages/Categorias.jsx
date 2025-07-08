import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const categorias = [
  { nombre: 'Deportivos', slug: 'deportivos', descripcion: 'Electrolitos para alto rendimiento y deporte.' },
  { nombre: 'Hidratación', slug: 'hidratacion', descripcion: 'Hidratación diaria y natural para todos.' },
  { nombre: 'Energía', slug: 'energia', descripcion: 'Energía sostenible y vitaminas para tu día.' },
];

const Categorias = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Categorías | OSMOS</title>
      <meta name="description" content="Explora las categorías de productos OSMOS." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Categorías</h1>
      <div className="space-y-6">
        {categorias.map(cat => (
          <div key={cat.slug} className="bg-blue-50 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-blue-800 mb-2">{cat.nombre}</h2>
              <p className="text-gray-700">{cat.descripcion}</p>
            </div>
            <Link to={`/productos?categoria=${cat.slug}`} className="mt-4 md:mt-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-6 py-2 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition">Ver productos</Link>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default Categorias; 