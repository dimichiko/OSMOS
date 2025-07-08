import { BrowserRouter, Route, Routes } from "react-router-dom";
import ElectrolitosState from "./contexts/Electrolitos/ElectrolitosState";
import Layout from "./components/layout/Index";

// Pages
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Perfil from "./pages/Perfil";
import Confirmacion from "./pages/Confirmacion";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Ayuda from "./pages/Ayuda";
import Envios from "./pages/Envios";
import Devoluciones from "./pages/Devoluciones";
import Mayoreo from "./pages/Mayoreo";
import Terminos from "./pages/Terminos";
import Categorias from "./pages/Categorias";
import Cookies from "./pages/Cookies";
import Privacidad from "./pages/Privacidad";

// Components
import RutaPrivada from "./components/RutaPrivada";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-6xl font-black text-blue-700 mb-4">404</h1>
    <p className="text-xl text-gray-700 mb-8">Página no encontrada</p>
    <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition">Volver al inicio</a>
  </div>
);

const Router = () => {
  return (
    <ElectrolitosState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Productos />} />
            <Route path="producto/:slug" element={<ProductoDetalle />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="confirmacion" element={<Confirmacion />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
            <Route path="sobre-nosotros" element={<Nosotros />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="ayuda" element={<Ayuda />} />
            <Route path="envios" element={<Envios />} />
            <Route path="devoluciones" element={<Devoluciones />} />
            <Route path="mayoreo" element={<Mayoreo />} />
            <Route path="terminos" element={<Terminos />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="privacidad" element={<Privacidad />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ElectrolitosState>
  );
};

export default Router;