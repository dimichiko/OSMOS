import { Helmet } from 'react-helmet-async';

const Cookies = () => (
  <main className="bg-[#f8f9fb] min-h-screen py-16 px-4">
    <Helmet>
      <title>Política de Cookies | OSMOS</title>
      <meta name="description" content="Política de uso de cookies de OSMOS." />
    </Helmet>
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Política de Cookies</h1>
      <p className="text-gray-700 mb-4">Este sitio utiliza cookies para mejorar tu experiencia de navegación y analizar el tráfico. Al continuar navegando, aceptas el uso de cookies.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Las cookies son pequeños archivos que se almacenan en tu dispositivo.</li>
        <li>Usamos cookies para recordar tus preferencias y analizar el uso del sitio.</li>
        <li>Puedes desactivar las cookies en la configuración de tu navegador.</li>
      </ul>
      <p className="text-gray-600">Para más información, revisa nuestra <a href="/privacidad" className="text-blue-700 underline">Política de Privacidad</a>.</p>
    </div>
  </main>
);

export default Cookies; 