import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";

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
  // ...otros productos
];

const ProductoDetalle = () => {
  const { slug } = useParams();
  const producto = mockProducts.find(p => p.slug === slug);

  if (!producto) {
    return <div className="text-center py-20 text-2xl">Producto no encontrado</div>;
  }

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
    <main className="bg-[#f8f9fb] min-h-screen">
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
      <nav className="text-sm text-blue-700 py-4 px-4 max-w-6xl mx-auto" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li><Link to="/" className="hover:underline">Inicio</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/productos" className="hover:underline">Productos</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="font-bold">{producto.name} - {producto.flavor}</li>
        </ol>
      </nav>
      {/* Detalle visual */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
          <img src={producto.image} alt={producto.name + ' ' + producto.flavor} className="w-32 h-32 object-contain mb-6 md:mb-0" />
          <div className="flex-1">
            <h1 className="font-extrabold text-3xl text-blue-900 mb-2">{producto.name} - {producto.flavor}</h1>
            <p className="text-gray-700 mb-4">{producto.description}</p>
            <div className="font-black text-2xl text-indigo-600 mb-4">${producto.price.toLocaleString('es-CL')}</div>
            <button className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition">Agregar al carrito</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductoDetalle;