import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const { items, totalItems, getTotalPrice } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top cuando cambie la ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", { 
      style: "currency", 
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Nuevo: mantener abierto el preview si el mouse está sobre el menú
  const [cartPreviewHover, setCartPreviewHover] = useState(false);
  const handleCartMouseEnter = () => setShowCartPreview(true);
  const handleCartMouseLeave = () => setTimeout(() => {
    if (!cartPreviewHover) setShowCartPreview(false);
  }, 100);

  // Función para manejar clic en carrito en móvil
  const handleMobileCartClick = () => {
    if (items.length > 0) {
      setShowMobileCart(true);
      setIsMenuOpen(false); // Cerrar menú hamburguesa
    } else {
      navigate('/carrito');
    }
  };

  // Función para manejar clic en menú hamburguesa
  const handleMobileMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowMobileCart(false); // Cerrar carrito móvil
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
        </nav>

        <div className="actions">
          {isAuthenticated ? (
            <div className="userMenu">
              <Link to="/perfil" className="userBtn" aria-label="Mi perfil">
                <span className="userIcon">👤</span>
                <span className="userText">{user?.nombre || 'Mi Perfil'}</span>
              </Link>
              <div className="userMenuDivider"></div>
              <button 
                onClick={handleLogout} 
                className="logoutBtn" 
                aria-label="Cerrar sesión"
              >
                <span className="logoutIcon">🚪</span>
                <span className="logoutText">Salir</span>
              </button>
            </div>
          ) : (
            <div className="authButtons">
              <Link to="/login" className="loginBtn" aria-label="Iniciar sesión">
                <span className="loginIcon">👤</span>
                <span className="loginText">Login</span>
              </Link>
              <Link to="/signup" className="signupBtn" aria-label="Registrarse">
                <span className="signupIcon">📝</span>
                <span className="signupText">Registro</span>
              </Link>
            </div>
          )}
          
          {/* Carrito para desktop */}
          <div 
            className="cartBtn desktop-only"
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
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
              <div 
                className="cart-preview"
                onMouseEnter={() => setCartPreviewHover(true)}
                onMouseLeave={() => { setCartPreviewHover(false); setShowCartPreview(false); }}
              >
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
                  <Link to="/carrito" className="cart-checkout-btn" onClick={() => setShowCartPreview(false)}>
                    Ir al Pago
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Carrito para móvil */}
          <button 
            className="mobileCartBtn"
            onClick={handleMobileCartClick}
            aria-label="Ver carrito móvil"
          >
            <span className="cartIcon">🛒</span>
            {totalItems > 0 && (
              <span className="mobileCartBadge" style={{ background: '#1d4ed8', color: '#fff' }}>{totalItems}</span>
            )}
          </button>
        </div>

        <button className="mobileMenuBtn" onClick={handleMobileMenuClick} aria-label="Abrir menú móvil" aria-expanded={isMenuOpen} aria-controls="mobileMenuNav">
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>

      {/* Menú móvil del carrito */}
      {showMobileCart && (
        <div className="mobileCartMenu">
          <div className="mobileCartHeader">
            <h3>🛒 Tu Carrito</h3>
            <button 
              onClick={() => setShowMobileCart(false)} 
              className="mobileCartClose"
              aria-label="Cerrar carrito"
            >
              ✕
            </button>
          </div>
          
          <div className="mobileCartItems">
            {items.map((item, index) => (
              <div key={index} className="mobileCartItem">
                <div className="mobileCartItemInfo">
                  <span className="mobileCartItemName">{item.name} - {item.flavor}</span>
                  <span className="mobileCartItemPrice">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mobileCartFooter">
            <div className="mobileCartTotal">
              <strong>Total: {formatPrice(getTotalPrice())}</strong>
            </div>
            <Link 
              to="/carrito" 
              className="mobileCartCheckoutBtn" 
              onClick={() => setShowMobileCart(false)}
            >
              Ir al Pago
            </Link>
          </div>
        </div>
      )}

      {/* Menú móvil existente */}
      {isMenuOpen && (
        <div className="mobileMenu" id="mobileMenuNav" role="menu">
          <div className="mobileMenuHeader">
            <h3>Menú</h3>
            <button 
              onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} 
              className="mobileMenuClose"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>
          
          <div className="mobileMenuSection">
            <h4 className="mobileMenuSectionTitle">Navegación</h4>
            <Link to="/" className="mobileLink" onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} role="menuitem" tabIndex={0}>
              <span className="mobileLinkIcon">🏠</span>
              <span>Inicio</span>
            </Link>
            <Link to="/productos" className="mobileLink" onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} role="menuitem" tabIndex={0}>
              <span className="mobileLinkIcon">🛍️</span>
              <span>Productos</span>
            </Link>
            <Link to="/sobre-nosotros" className="mobileLink" onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} role="menuitem" tabIndex={0}>
              <span className="mobileLinkIcon">👥</span>
              <span>Nosotros</span>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="mobileMenuSection">
              <h4 className="mobileMenuSectionTitle">Mi Cuenta</h4>
              <Link to="/perfil" className="mobileLink" onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} role="menuitem" tabIndex={0}>
                <span className="mobileLinkIcon">👤</span>
                <span>Mi Perfil</span>
              </Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); setShowMobileCart(false); }} className="mobileLink mobileLogoutBtn" role="menuitem" tabIndex={0}>
                <span className="mobileLinkIcon">🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <div className="mobileMenuSection">
              <h4 className="mobileMenuSectionTitle">Acceso</h4>
              <Link to="/login" className="mobileLink" onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} role="menuitem" tabIndex={0}>
                <span className="mobileLinkIcon">🔑</span>
                <span>Login</span>
              </Link>
              <Link to="/signup" className="mobileLink" onClick={() => { setIsMenuOpen(false); setShowMobileCart(false); }} role="menuitem" tabIndex={0}>
                <span className="mobileLinkIcon">📝</span>
                <span>Registro</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;