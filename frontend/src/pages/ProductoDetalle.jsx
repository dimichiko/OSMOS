import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import ElectrolitosContext from "../contexts/Electrolitos/ElectrolitosContext";
import { useCart } from '../contexts/CartContext';

const fallbackProducts = [
  {
    id: 1,
    slug: "osmos-sport-pro",
    name: "OSMOS Sport Pro",
    description: "Electrolitos avanzados para deportistas profesionales con alto contenido de sodio y potasio para máxima hidratación y recuperación muscular.",
    price: 14990,
    image: "/images/2FFAA248-B97B-48F8-93FF-95CBC7D4411D.png",
    flavor: "Lima Limón",
    flavorIcon: "🍋"
  },
  {
    id: 2,
    slug: "osmos-natural",
    name: "OSMOS Natural",
    description: "Hidratación natural con ingredientes orgánicos certificados, sin conservantes artificiales y con electrolitos de origen natural.",
    price: 9990,
    image: "/images/538B15D0-6894-4BC0-971D-829E2ABC69C4.png",
    flavor: "Fresa Silvestre",
    flavorIcon: "🍓"
  },
  {
    id: 3,
    slug: "osmos-energy",
    name: "OSMOS Energy",
    description: "Energía sostenible con vitaminas B y electrolitos para mantener tu rendimiento durante todo el día.",
    price: 17490,
    image: "/images/5E392DC5-2FD3-4519-9F1E-F505564C144A.png",
    flavor: "Naranja Mango",
    flavorIcon: "🍊"
  }
];

const ProductoDetalle = () => {
  const { slug } = useParams();
  const { Electrolitos } = useContext(ElectrolitosContext);
  const { addToCart, updateQuantity, items } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  let producto = Electrolitos.find(p => p.slug === slug);
  if (!producto) {
    producto = fallbackProducts.find(p => p.slug === slug);
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-6">El producto que buscas no existe o ha sido removido.</p>
          <Link to="/productos" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Ver todos los productos
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Buscar si el producto ya está en el carrito
    const existingItem = items.find(item => item.id === producto.id);
    
    if (existingItem) {
      // Si ya existe, actualizar la cantidad
      updateQuantity(producto.id, existingItem.quantity + cantidad);
    } else {
      // Si no existe, agregar con la cantidad seleccionada
      addToCart({ ...producto, quantity: cantidad });
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const incrementQuantity = () => setCantidad(prev => Math.min(99, prev + 1));
  const decrementQuantity = () => setCantidad(prev => Math.max(1, prev - 1));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": producto.name + ' ' + producto.flavor,
    "image": producto.image,
    "description": producto.description,
    "offers": {
      "@type": "Offer",
      "price": producto.price,
      "priceCurrency": "CLP"
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://tusitio.com/"},
      {"@type": "ListItem", "position": 2, "name": "Productos", "item": "https://tusitio.com/productos"},
      {"@type": "ListItem", "position": 3, "name": producto.name + ' ' + producto.flavor, "item": `https://tusitio.com/producto/${producto.slug}`}
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{producto.name} - {producto.flavor} | OSMOS</title>
        <meta name="description" content={producto.description} />
        <meta property="og:title" content={`${producto.name} - ${producto.flavor} | OSMOS`} />
        <meta property="og:description" content={producto.description} />
        <meta property="og:image" content={producto.image} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://tusitio.com/producto/${producto.slug}`} />
        <link rel="canonical" href={`https://tusitio.com/producto/${producto.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link to="/productos" className="text-blue-600 hover:text-blue-800 transition">Productos</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{producto.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
          
          {/* Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 flex items-center justify-center">
              <img 
                src={producto.image} 
                alt={producto.name + ' ' + producto.flavor} 
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              
              {/* Flavor Badge */}
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="mr-2">{producto.flavorIcon}</span>
                {producto.flavor}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                {producto.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  ${producto.price.toLocaleString('es-CL')}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Envío gratis en compras sobre $30.000
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {producto.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm md:text-base font-semibold text-gray-900 mb-3">Cantidad</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center font-bold text-lg"
                    aria-label="Reducir cantidad"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max="99" 
                    value={cantidad} 
                    onChange={(e) => setCantidad(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                    className="w-16 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                  />
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center font-bold text-lg"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-3 md:py-4 px-6 rounded-xl font-bold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
                  added 
                    ? 'bg-green-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                } text-sm md:text-base`}
              >
                {added ? '✅ Agregado al carrito' : '🛒 Agregar al carrito'}
              </button>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 text-lg">🚚</span>
                  <div>
                    <h4 className="font-semibold text-blue-800 text-sm md:text-base">Envío gratis</h4>
                    <p className="text-blue-600 text-xs md:text-sm">En compras sobre $30.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductoDetalle;