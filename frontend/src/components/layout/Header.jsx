import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { items, totalItems, getTotalPrice } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", { 
      style: "currency", 
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <header className="header" role="banner">
      <div className="container">
        <Link to="/" className="logo" aria-label="Ir a inicio">
          <span className="logoText">OSMOS</span>
          <span className="logoSubtext">electrolitos</span>
        </Link>

        <nav className="nav" role="navigation" aria-label="Navegación principal">
          <Link to="/" className="link">Inicio</Link>
          <Link to="/productos" className="link">Productos</Link>
          <Link to="/sobre-nosotros" className="link">Nosotros</Link>
          <Link to="/contacto" className="link">Contacto</Link>
        </nav>

        <div className="actions">
          <Link to="/login" className="loginBtn" aria-label="Iniciar sesión">
            <span className="loginIcon">👤</span>
            Login
          </Link>
          <div 
            className="cartBtn"
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
            tabIndex={0}
            aria-label="Ver carrito"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowCartPreview(!showCartPreview); }}
          >
            <span className="cartIcon">🛒</span>
            {totalItems > 0 && (
              <span className="cartBadge" style={{ background: '#1d4ed8', color: '#fff' }}>{totalItems}</span>
            )}
            
            {/* Cart Preview */}
            {showCartPreview && items.length > 0 && (
              <div className="cart-preview">
                <div className="cart-preview-header">
                  <h4>🛒 Tu Carrito</h4>
                  <button onClick={() => setShowCartPreview(false)} aria-label="Cerrar carrito">✕</button>
                </div>
                <div className="cart-preview-items">
                  {items.map((item, index) => (
                    <div key={index} className="cart-preview-item">
                      <span>{item.name} - {item.flavor}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="cart-preview-footer">
                  <div className="cart-total">
                    <strong>Total: {formatPrice(getTotalPrice())}</strong>
                  </div>
                  <Link to="/carrito" className="cart-checkout-btn">
                    Ir al Pago
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="mobileMenuBtn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú móvil" aria-expanded={isMenuOpen} aria-controls="mobileMenuNav">
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobileMenu" id="mobileMenuNav" role="menu">
          <Link to="/" className="mobileLink" onClick={() => setIsMenuOpen(false)} role="menuitem" tabIndex={0}>Inicio</Link>
          <Link to="/productos" className="mobileLink" onClick={() => setIsMenuOpen(false)} role="menuitem" tabIndex={0}>Productos</Link>
          <Link to="/sobre-nosotros" className="mobileLink" onClick={() => setIsMenuOpen(false)} role="menuitem" tabIndex={0}>Nosotros</Link>
          <Link to="/contacto" className="mobileLink" onClick={() => setIsMenuOpen(false)} role="menuitem" tabIndex={0}>Contacto</Link>
          <Link to="/carrito" className="mobileLink" onClick={() => setIsMenuOpen(false)} role="menuitem" tabIndex={0}>Carrito</Link>
          <Link to="/login" className="mobileLink" onClick={() => setIsMenuOpen(false)} role="menuitem" tabIndex={0}>Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;