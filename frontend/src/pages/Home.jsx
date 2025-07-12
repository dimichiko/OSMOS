import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen font-[Inter]">
      <Helmet>
        <title>OSMOS Electrolitos | Hidratación Inteligente</title>
        <meta name="description" content="Descubre OSMOS, electrolitos premium para hidratación avanzada y energía sostenible." />
      </Helmet>

      {/* Hero Simple */}
      <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12 md:py-20 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 md:mb-6">
          Hidratación Inteligente con <span className="text-cyan-300">OSMOS</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 opacity-90">
          Electrolitos premium para deportistas y bienestar. Ciencia y naturaleza en cada gota.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/productos" className="bg-white text-blue-700 font-bold px-6 md:px-8 py-3 rounded-full hover:bg-blue-100 shadow text-sm md:text-base">
            Ver Productos
          </Link>
          <Link to="/contacto" className="bg-blue-700 text-white font-bold px-6 md:px-8 py-3 rounded-full hover:bg-blue-800 shadow border-2 border-white text-sm md:text-base">
            Contáctanos
          </Link>
        </div>
      </header>

      {/* Sección Simple */}
      <section className="py-8 md:py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-900 mb-8 md:mb-12">¿Por qué elegir OSMOS?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center">
            <div className="text-3xl md:text-4xl mb-4">💧</div>
            <h3 className="text-blue-800 font-bold text-base md:text-lg mb-2">Hidratación Científica</h3>
            <p className="text-gray-600 text-sm md:text-base">Electrolitos balanceados para máxima absorción.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center">
            <div className="text-3xl md:text-4xl mb-4">🌿</div>
            <h3 className="text-blue-800 font-bold text-base md:text-lg mb-2">100% Natural</h3>
            <p className="text-gray-600 text-sm md:text-base">Sin conservantes ni sabores artificiales.</p>
          </div>
        </div>
      </section>

      {/* CTA Simple */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-12 md:py-16 px-4 rounded-3xl shadow-lg mx-4 my-12 md:my-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">¿Listo para mejorar tu hidratación?</h2>
          <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8">Miles de personas ya confían en OSMOS.</p>
          <Link to="/productos" className="bg-white text-blue-700 font-bold px-8 md:px-10 py-3 md:py-4 rounded-full shadow hover:bg-blue-100 text-base md:text-lg">
            Comprar Ahora
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;