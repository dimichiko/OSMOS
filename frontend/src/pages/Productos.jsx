import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { Helmet } from 'react-helmet-async';

const Productos = () => {
  const { addToCart } = useCart();

  // Solo 3 productos simples
  const products = [
    {
      id: 1,
      slug: "osmos-sport-pro",
      name: "OSMOS Sport Pro",
      description: "Electrolitos avanzados para deportistas profesionales",
      price: 14990,
      image: "/images/2FFAA248-B97B-48F8-93FF-95CBC7D4411D.png",
      flavor: "Lima Limón",
      flavorIcon: "🍋"
    },
    {
      id: 2,
      slug: "osmos-natural",
      name: "OSMOS Natural",
      description: "Hidratación natural con ingredientes orgánicos",
      price: 9990,
      image: "/images/538B15D0-6894-4BC0-971D-829E2ABC69C4.png",
      flavor: "Fresa Silvestre",
      flavorIcon: "🍓"
    },
    {
      id: 3,
      slug: "osmos-energy",
      name: "OSMOS Energy",
      description: "Energía sostenible con vitaminas B y electrolitos",
      price: 17490,
      image: "/images/5E392DC5-2FD3-4519-9F1E-F505564C144A.png",
      flavor: "Naranja Mango",
      flavorIcon: "🍊"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", { 
      style: "currency", 
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <main className="bg-[#f8f9fb] min-h-screen">
      <Helmet>
        <title>Productos OSMOS | Electrolitos Premium</title>
        <meta name="description" content="Catálogo de electrolitos OSMOS: hidratación, energía y recuperación." />
      </Helmet>

      {/* Header Simple */}
      <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 text-center">
        <h1 className="font-extrabold text-4xl mb-4">Productos OSMOS</h1>
        <p className="text-lg opacity-90 max-w-xl mx-auto">Electrolitos premium para tu salud y rendimiento.</p>
      </header>

      {/* Productos */}
      <section className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <article key={product.id} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <img src={product.image} alt={product.name} className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 object-contain" />
              <div className="bg-blue-500 text-white rounded-full px-3 py-1 text-xs md:text-sm font-bold inline-block mb-3">
                {product.flavorIcon} {product.flavor}
              </div>
              <h3 className="font-bold text-base md:text-lg text-blue-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>
              <div className="font-black text-xl md:text-2xl text-indigo-600 mb-4">{formatPrice(product.price)}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className="bg-blue-600 text-white font-bold px-3 md:px-4 py-2 rounded-full hover:bg-blue-700 transition flex-1 text-sm md:text-base"
                >
                  🛒 Agregar
                </button>
                <Link 
                  to={`/producto/${product.slug}`} 
                  className="bg-white text-blue-700 font-bold px-3 md:px-4 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-50 transition flex-1 text-sm md:text-base"
                >
                  👁️ Ver
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Simple */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16 px-4 rounded-2xl mx-4 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda para elegir?</h2>
          <p className="mb-6">Nuestros expertos te ayudarán a encontrar el producto perfecto.</p>
          <Link to="/contacto" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow hover:bg-blue-100">
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Productos;