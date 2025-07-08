import { BrowserRouter, Route, Routes } from "react-router-dom";
import ElectrolitosState from "./contexts/Electrolitos/ElectrolitosState";
import Layout from "./components/layout/Index";

// Pages
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";

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
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="sobre-nosotros" element={<Nosotros />} />
            <Route path="contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ElectrolitosState>
  );
};

export default Router;