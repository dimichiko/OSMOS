import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen font-[Inter]">
      <Helmet>
        <title>OSMOS Electrolitos | Hidratación Inteligente y Natural</title>
        <meta name="description" content="Descubre OSMOS, la nueva generación de electrolitos premium para hidratación avanzada, energía sostenible y salud. ¡Mejora tu rendimiento con OSMOS!" />
      </Helmet>

      <header className="relative overflow-hidden h-screen bg-black">
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover opacity-60"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center text-white h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
            Hidratación Inteligente con <span className="text-cyan-300">OSMOS</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl opacity-90 mb-10">
            Electrolitos premium para deportistas y bienestar. Ciencia y naturaleza en cada gota.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/productos" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-100 shadow">
              Ver Productos
            </Link>
            <Link to="/contacto" className="bg-blue-700 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-800 shadow">
              Contáctanos
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12">¿Por qué elegir OSMOS?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              title: 'Hidratación Científica',
              desc: 'Electrolitos balanceados para máxima absorción.',
              img: '/images/icon1.png',
            },
            {
              title: '100% Natural',
              desc: 'Sin conservantes ni sabores artificiales.',
              img: '/images/icon2.png',
            },
            {
              title: 'Energía Sostenible',
              desc: 'Energía sin picos de azúcar ni efectos secundarios.',
              img: '/images/icon3.png',
            },
            {
              title: 'Para Deportistas',
              desc: 'Ideal antes, durante y después del ejercicio.',
              img: '/images/icon4.png',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition-transform"
            >
              <img src={item.img} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-blue-800 font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16 px-4 rounded-3xl shadow-lg mx-4 my-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¿Listo para mejorar tu hidratación?</h2>
          <p className="text-lg opacity-90 mb-8">Miles de personas ya confían en OSMOS para su salud y rendimiento.</p>
          <Link to="/productos" className="bg-white text-blue-700 font-bold px-10 py-4 rounded-full shadow hover:bg-blue-100 text-lg">
            Comprar Ahora
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;