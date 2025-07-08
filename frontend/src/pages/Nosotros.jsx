import React, { useState, useEffect } from 'react';
import { ChevronRight, Award, Users, Globe, Heart, Zap, Leaf, Target, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Nosotros = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      text: "OSMOS cambió completamente mi rendimiento. La diferencia es notable desde el primer día.",
      author: "María González",
      role: "Atleta Olímpica",
      rating: 5
    },
    {
      text: "La hidratación más efectiva que he probado. Perfecta para entrenamientos intensos.",
      author: "Carlos Ruiz",
      role: "Triatleta Profesional",
      rating: 5
    },
    {
      text: "Ingredientes naturales, resultados extraordinarios. Recomiendo OSMOS al 100%.",
      author: "Ana Martín",
      role: "Nutritionista Deportiva",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OSMOS",
    "url": "https://tusitio.com",
    "logo": "/images/image.png",
    "description": "Líderes en hidratación deportiva natural y científica.",
    "founder": "Dr. Carlos Méndez",
    "foundingDate": "2020",
    "sameAs": [
      "https://facebook.com/osmos",
      "https://instagram.com/osmos",
      "https://twitter.com/osmos",
      "https://linkedin.com/company/osmos"
    ]
  };

  const teamJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Dr. Carlos Méndez",
        "jobTitle": "Fundador & CEO",
        "worksFor": { "@type": "Organization", "name": "OSMOS" }
      },
      {
        "@type": "Person",
        "name": "Dra. Ana Rodríguez",
        "jobTitle": "Directora de Investigación",
        "worksFor": { "@type": "Organization", "name": "OSMOS" }
      },
      {
        "@type": "Person",
        "name": "Miguel Torres",
        "jobTitle": "Director de Operaciones",
        "worksFor": { "@type": "Organization", "name": "OSMOS" }
      }
    ]
  };

  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen overflow-hidden">
      <Helmet>
        <title>Sobre OSMOS | Ciencia, Historia y Equipo</title>
        <meta name="description" content="Conoce la historia, misión y equipo de OSMOS. Ciencia, innovación y pasión por la hidratación deportiva." />
        <meta property="og:title" content="Sobre OSMOS | Ciencia, Historia y Equipo" />
        <meta property="og:description" content="Conoce la historia, misión y equipo de OSMOS. Ciencia, innovación y pasión por la hidratación deportiva." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tusitio.com/sobre-nosotros" />
        <link rel="canonical" href="https://tusitio.com/sobre-nosotros" />
      </Helmet>

      {/* JSON-LD Scripts */}
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(teamJsonLd)}</script>

      {/* HERO SECTION */}
      <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-400 rounded-full blur-2xl animate-bounce"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center bg-blue-800/50 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-blue-300/20">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm font-medium">Revolucionando la hidratación desde 2020</span>
          </div>
          
          <h1 className="font-black text-5xl md:text-7xl mb-6 tracking-tight">
            Sobre <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OSMOS</span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Donde la ciencia más avanzada se encuentra con la naturaleza para crear la hidratación perfecta
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center">
              Descubre nuestra historia
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              Ver productos
            </button>
          </div>
        </div>
      </header>

      {/* STATS SECTION */}
      <section className="relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "50K+", label: "Atletas Satisfechos", icon: Users },
              { number: "15", label: "Estudios Científicos", icon: Award },
              { number: "25+", label: "Países Alcanzados", icon: Globe },
              { number: "98%", label: "Satisfacción del Cliente", icon: Heart }
            ].map((stat, index) => (
              <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-black text-gray-800 mb-1">{stat.number}</div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORIA SECTION */}
      <section id="animate-historia" className={`max-w-6xl mx-auto px-4 py-20 transition-all duration-1000 ${isVisible['animate-historia'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-4 text-sm font-semibold">
                <Star className="w-4 h-4 mr-2" />
                Nuestra Historia
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-800">
                Una Revolución en <span className="text-blue-600">Hidratación</span>
              </h2>
              <p className="mb-4 text-gray-600 text-lg leading-relaxed">
                OSMOS nació de la frustración de un atleta profesional que no encontraba productos de hidratación que realmente funcionaran. Después de años de investigación científica rigurosa, creamos algo completamente nuevo.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Nuestra formulación única combina la ciencia más avanzada con ingredientes naturales premium, estableciendo un nuevo estándar en la industria de la hidratación deportiva.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <Target className="w-5 h-5 mr-2" />
                Desde 2020 liderando la innovación
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex items-center justify-center">
              <div className="text-8xl animate-bounce">🏆</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section id="animate-mision" className={`max-w-6xl mx-auto px-4 mb-20 transition-all duration-1000 delay-200 ${isVisible['animate-mision'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
            <p className="text-blue-100 leading-relaxed">
              Revolucionar la hidratación deportiva mediante soluciones científicamente probadas que maximicen el rendimiento, aceleren la recuperación y mejoren la salud general de cada atleta.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
            <p className="text-indigo-100 leading-relaxed">
              Ser la marca líder mundial en hidratación inteligente, reconocida por la innovación disruptiva, la calidad excepcional y el impacto positivo en la vida de millones de atletas.
            </p>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section id="animate-valores" className={`max-w-6xl mx-auto px-4 mb-20 transition-all duration-1000 delay-300 ${isVisible['animate-valores'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">Nuestros Valores</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Los principios que guían cada decisión y cada producto que creamos</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🔬", title: "Ciencia", desc: "Investigación rigurosa respalda cada fórmula", color: "from-blue-500 to-cyan-500" },
            { icon: "🌱", title: "Naturalidad", desc: "Ingredientes premium y procesos sostenibles", color: "from-green-500 to-emerald-500" },
            { icon: "💪", title: "Rendimiento", desc: "Maximizamos el potencial de cada atleta", color: "from-orange-500 to-red-500" },
            { icon: "🤝", title: "Comunidad", desc: "Construimos una familia de deportistas", color: "from-purple-500 to-pink-500" }
          ].map((valor, index) => (
            <div key={index} className={`bg-gradient-to-br ${valor.color} text-white rounded-3xl p-6 shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 text-center`}>
              <div className="text-4xl mb-3">{valor.icon}</div>
              <h3 className="font-bold text-lg mb-2">{valor.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{valor.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPO */}
      <section id="animate-equipo" className={`max-w-6xl mx-auto px-4 mb-20 transition-all duration-1000 delay-400 ${isVisible['animate-equipo'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">Nuestro Equipo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Los visionarios que hacen posible la revolución OSMOS</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Dr. Carlos Méndez", role: "Fundador & CEO", desc: "Ex-atleta profesional con doctorado en Nutrición Deportiva", icon: "👨‍🔬", color: "from-blue-500 to-indigo-600" },
            { name: "Dra. Ana Rodríguez", role: "Directora de Investigación", desc: "Especialista en fisiología del ejercicio y nutrición avanzada", icon: "👩‍⚕️", color: "from-purple-500 to-pink-600" },
            { name: "Miguel Torres", role: "Director de Operaciones", desc: "Experto en logística mundial y gestión de calidad premium", icon: "👨‍💼", color: "from-green-500 to-teal-600" }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-3xl">
              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-4xl shadow-lg`}>
                {member.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12">Lo que dicen nuestros atletas</h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xl mb-6 italic leading-relaxed">"{testimonials[currentTestimonial].text}"</p>
            <div className="font-semibold text-lg">{testimonials[currentTestimonial].author}</div>
            <div className="text-blue-300">{testimonials[currentTestimonial].role}</div>
          </div>
          
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">¿Listo para la revolución?</h2>
          <p className="text-xl mb-8 opacity-90">Únete a los miles de atletas que ya experimentan la diferencia OSMOS</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Descubre nuestros productos
          </button>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;