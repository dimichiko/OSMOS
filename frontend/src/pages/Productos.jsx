import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { Helmet } from 'react-helmet-async';

const Productos = () => {
  const { addToCart, items, getTotalPrice } = useCart();
  const [filter, setFilter] = useState('todos');
  const [showInfo, setShowInfo] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);

  // Mock data para productos (reemplazar con datos reales del backend)
  const mockProducts = [
    {
      id: 1,
      slug: "osmos-sport-pro-lima-limon",
      name: "OSMOS Sport Pro",
      description: "Electrolitos avanzados para deportistas profesionales con alto contenido de sodio y potasio",
      price: 14990,
      image: "/images/2FFAA248-B97B-48F8-93FF-95CBC7D4411D.png",
      category: "deportivos",
      flavor: "Lima Limón",
      flavorIcon: "🍋",
      flavorColor: "#fbbf24"
    },
    {
      id: 2,
      slug: "osmos-natural-fresa-silvestre",
      name: "OSMOS Natural",
      description: "Hidratación natural con ingredientes orgánicos, perfecta para uso diario",
      price: 9990,
      image: "/images/538B15D0-6894-4BC0-971D-829E2ABC69C4.png",
      category: "hidratacion",
      flavor: "Fresa Silvestre",
      flavorIcon: "🍓",
      flavorColor: "#f87171"
    },
    {
      id: 3,
      slug: "osmos-energy-boost-naranja-mango",
      name: "OSMOS Energy Boost",
      description: "Energía sostenible con vitaminas B y electrolitos para máximo rendimiento",
      price: 17490,
      image: "/images/5E392DC5-2FD3-4519-9F1E-F505564C144A.png",
      category: "energia",
      flavor: "Naranja Mango",
      flavorIcon: "🍊",
      flavorColor: "#fb923c"
    },
    {
      id: 4,
      slug: "osmos-recovery-coco-natural",
      name: "OSMOS Recovery",
      description: "Recuperación muscular con magnesio y calcio para relajar músculos",
      price: 12490,
      image: "/images/35826C2C-60C6-480C-AC9F-282FE148B422.png",
      category: "deportivos",
      flavor: "Coco Natural",
      flavorIcon: "🥥",
      flavorColor: "#a3a3a3"
    },
    {
      id: 5,
      slug: "osmos-daily-manzana-verde",
      name: "OSMOS Daily",
      description: "Hidratación diaria con electrolitos balanceados y sabor suave",
      price: 8490,
      image: "/images/5E392DC5-2FD3-4519-9F1E-F505564C144A.png",
      category: "hidratacion",
      flavor: "Manzana Verde",
      flavorIcon: "🍏",
      flavorColor: "#4ade80"
    },
    {
      id: 6,
      slug: "osmos-power-frutas-tropicales",
      name: "OSMOS Power",
      description: "Potencia máxima con electrolitos y aminoácidos para atletas elite",
      price: 19990,
      image: "/images/538B15D0-6894-4BC0-971D-829E2ABC69C4.png",
      category: "energia",
      flavor: "Frutas Tropicales",
      flavorIcon: "🍍",
      flavorColor: "#f59e0b"
    }
  ];

  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    if (filter === 'todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === filter));
    }
  }, [filter, products]);

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

  const filters = [
    { id: 'todos', name: 'Todos', icon: '🛒' },
    { id: 'deportivos', name: 'Deportivos', icon: '🏃‍♂️' },
    { id: 'hidratacion', name: 'Hidratación', icon: '💧' },
    { id: 'energia', name: 'Energía', icon: '⚡' }
  ];

  return (
    <main className="bg-[#f8f9fb] min-h-screen">
      <Helmet>
        <title>Catálogo de Electrolitos OSMOS | Productos Premium</title>
        <meta name="description" content="Catálogo de electrolitos OSMOS: hidratación, energía y recuperación. Elige el producto ideal para tu salud y rendimiento." />
        <meta property="og:title" content="Catálogo de Electrolitos OSMOS | Productos Premium" />
        <meta property="og:description" content="Catálogo de electrolitos OSMOS: hidratación, energía y recuperación. Elige el producto ideal para tu salud y rendimiento." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tusitio.com/productos" />
        <link rel="canonical" href="https://tusitio.com/productos" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": filteredProducts.map((p, i) => ({
            "@type": "Product",
            "position": i+1,
            "name": p.name + ' ' + p.flavor,
            "image": p.image,
            "description": p.description,
            "offers": {
              "@type": "Offer",
              "price": p.price,
              "priceCurrency": "CLP"
            }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://tusitio.com/"},
            {"@type": "ListItem", "position": 2, "name": "Productos", "item": "https://tusitio.com/productos"}
          ]
        })}</script>
      </Helmet>
      {/* Breadcrumbs */}
      <nav className="text-sm text-blue-700 py-4 px-4 max-w-6xl mx-auto" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li><Link to="/" className="hover:underline">Inicio</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="font-bold">Productos</li>
        </ol>
      </nav>
      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 rounded-b-3xl shadow-lg text-center mb-12">
        <h1 className="font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">Catálogo de Electrolitos OSMOS</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">Explora nuestra selección de <strong>electrolitos premium</strong> para hidratación, energía y recuperación. Elige el producto ideal para tu salud y rendimiento.</p>
        <nav className="mt-6" aria-label="Enlaces internos">
          <Link to="/" className="text-white underline mr-4">Inicio</Link>
          <Link to="/contacto" className="text-white underline">Contacto</Link>
        </nav>
      </header>
      {/* FILTROS */}
      <section className="max-w-6xl mx-auto px-4 mb-8" aria-labelledby="filtros">
        <h2 id="filtros" className="font-extrabold text-2xl text-blue-800 mb-6 text-center">Filtra por tipo de producto</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              aria-pressed={filter === filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition-all duration-200 flex items-center gap-2 ${filter === filterItem.id ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-700 shadow-lg' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'}`}
            >
              <span>{filterItem.icon}</span> {filterItem.name}
            </button>
          ))}
        </div>
      </section>
      {/* GRID DE PRODUCTOS */}
      <section className="max-w-6xl mx-auto px-4 mb-16" aria-labelledby="productos">
        <h2 id="productos" className="font-extrabold text-3xl text-blue-900 mb-10 text-center">Productos Disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <article key={product.id} className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center relative min-h-[340px]">
              <img src={product.image} alt={product.name + ' ' + product.flavor} className="w-14 h-14 mb-4" loading="lazy" />
              <div className="absolute top-6 right-6 bg-blue-500 text-white rounded-full px-4 py-1 font-bold text-xs flex items-center gap-2 shadow-md">
                <span className="text-lg">{product.flavorIcon}</span> {product.flavor}
              </div>
              <h3 className="font-extrabold text-lg text-blue-900 mb-2 text-center">{product.name} - {product.flavor}</h3>
              <p className="text-gray-600 text-center mb-4">{product.description}</p>
              <div className="font-black text-2xl text-indigo-600 mb-4">{formatPrice(product.price)}</div>
              <div className="flex gap-3 mt-auto">
                <button onClick={() => handleAddToCart(product)} className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-6 py-2 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition flex items-center gap-2"><span>🛒</span>Agregar</button>
                <Link to={`/producto/${product.slug}`} className="bg-white text-blue-700 font-bold px-6 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-50 transition flex items-center gap-2"><span>👁️</span>Ver Detalles</Link>
              </div>
            </article>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold text-xl mb-2">No se encontraron productos</h3>
            <p className="mb-4">Intenta con otro filtro o <Link to="/contacto" className="text-blue-700 underline">contáctanos</Link></p>
            <button onClick={() => setFilter('todos')} className="bg-white text-blue-700 font-bold px-6 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-50 transition">Ver Todos los Productos</button>
          </div>
        )}
      </section>
      {/* INFO EDUCATIVA */}
      <section className="max-w-5xl mx-auto px-4 mb-16" aria-labelledby="info-educativa">
        <button
          aria-expanded={showInfo}
          aria-controls="info-content"
          onClick={() => setShowInfo(!showInfo)}
          className="bg-white text-blue-700 font-bold px-8 py-3 rounded-xl border-2 border-blue-700 mx-auto block shadow hover:bg-blue-50 transition mb-8"
        >
          💡 ¿Cómo elegir tu electrolito ideal?
        </button>
        {showInfo && (
          <div id="info-content" className="flex flex-col md:flex-row gap-8 bg-blue-50 rounded-2xl p-8 mt-4">
            <div className="flex-1 min-w-[220px]">
              <h3 className="font-bold text-blue-800 mb-2">Guía de Selección</h3>
              <ul className="text-gray-700 list-disc pl-5">
                <li><strong>🏃‍♂️ Deportistas:</strong> Alto contenido de sodio y potasio</li>
                <li><strong>💧 Hidratación diaria:</strong> Electrolitos balanceados y sabor suave</li>
                <li><strong>🔄 Recuperación:</strong> Magnesio y calcio para relajar músculos</li>
                <li><strong>⚡ Energía:</strong> Vitaminas B y electrolitos para rendimiento</li>
              </ul>
            </div>
            <div className="flex-1 min-w-[220px]">
              <h3 className="font-bold text-blue-800 mb-2">Beneficios de los Electrolitos</h3>
              <ul className="text-gray-700 list-disc pl-5">
                <li>💧 Mantienen el balance hídrico del cuerpo</li>
                <li>💪 Previenen calambres musculares</li>
                <li>🧠 Mejoran la función nerviosa</li>
                <li>⚡ Aceleran la recuperación post-ejercicio</li>
                <li>❤️ Regulan la presión arterial</li>
              </ul>
            </div>
          </div>
        )}
      </section>
      {/* CTA FINAL */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16 rounded-3xl shadow-lg mx-4 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-extrabold text-3xl mb-4">¿Necesitas ayuda para elegir?</h2>
          <p className="text-lg opacity-90 mb-8">Habla con un asesor o revisa nuestra <Link to="/contacto" className="underline">página de contacto</Link> para recibir recomendaciones personalizadas.</p>
          <Link to="/contacto" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition inline-block">Contactar Asesor</Link>
        </div>
      </section>
      {/* MINI CARRITO PREVIEW */}
      {showCartPreview && items.length > 0 && (
        <aside aria-label="Resumen de carrito" className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-8 z-50 min-w-[320px]">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-blue-700 text-lg">🛒 Tu Carrito</h4>
            <button onClick={() => setShowCartPreview(false)} className="text-gray-400 text-2xl hover:text-blue-700">✕</button>
          </div>
          <div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name} - {item.flavor}</span>
                <span>{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 font-bold">Total: {formatPrice(getTotalPrice())}</div>
          <Link to="/carrito" className="mt-4 inline-block bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-6 py-2 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition">Ir al Pago</Link>
        </aside>
      )}
    </main>
  );
};

export default Productos;