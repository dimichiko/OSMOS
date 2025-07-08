import { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        {/* Top Section */}
        <div className="footer__top-section">
          {/* Brand Info */}
          <div className="footer__brand-section">
            <div className="footer__logo">
              <span className="footer__logo-text">OSMOS</span>
              <span className="footer__logo-subtext">electrolitos</span>
            </div>
            <p className="footer__brand-description">
              Potencia tu rendimiento con nuestros electrolitos premium. 
              Hidratación científicamente formulada para atletas y personas activas.
            </p>
            <div className="footer__social-links">
              <a href="#" className="footer__social-link" aria-label="Email">📘</a>
              <a href="#" className="footer__social-link" aria-label="Instagram">📷</a>
              <a href="#" className="footer__social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__link-section">
            <h4 className="footer__section-title">NAVEGACIÓN</h4>
            <div className="footer__link-list">
              <a href="/" className="footer__link">Inicio</a>
              <a href="/productos" className="footer__link">Todos los Productos</a>
              <a href="/categorias" className="footer__link">Categorías</a>
              <a href="/sobre-nosotros" className="footer__link">Sobre Osmos</a>
              <a href="/contacto" className="footer__link">Contacto</a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="footer__link-section">
            <h4 className="footer__section-title">SERVICIO AL CLIENTE</h4>
            <div className="footer__link-list">
              <a href="/ayuda" className="footer__link">Centro de Ayuda</a>
              <a href="/envios" className="footer__link">Envíos</a>
              <a href="/devoluciones" className="footer__link">Devoluciones</a>
              <a href="/mayoreo" className="footer__link">Ventas por Mayor</a>
              <a href="/terminos" className="footer__link">Términos y Condiciones</a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter-section">
            <h4 className="footer__section-title">¡ÚNETE A NUESTRA COMUNIDAD!</h4>
            <p className="footer__newsletter-text">
              <strong>Suscríbete</strong> para recibir ofertas exclusivas, nuevos sabores 
              y <strong>DESCUENTOS ESPECIALES</strong> directamente en tu email.
            </p>
            
            {isSubscribed ? (
              <div className="footer__success-message" role="status" aria-live="polite" style={{ color: '#16a34a', fontWeight: 700 }}>
                ✅ ¡Gracias por suscribirte! Revisa tu email.
              </div>
            ) : (
              <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                <div className="footer__input-group">
                  <label htmlFor="footer-email" className="sr-only">Email</label>
                  <input 
                    type="email" 
                    id="footer-email"
                    placeholder="Tu email aquí..." 
                    className="footer__email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email para newsletter"
                  />
                  <button type="submit" className="footer__subscribe-btn" aria-label="Suscribirse al newsletter">
                    <span className="footer__button-text">Suscribirse</span>
                    <span className="footer__button-icon">💧</span>
                  </button>
                </div>
              </form>
            )}

            <div className="footer__benefits">
              <div className="footer__benefit">✨ Ofertas exclusivas</div>
              <div className="footer__benefit">🚀 Nuevos productos</div>
              <div className="footer__benefit">💰 Descuentos especiales</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom-section">
          <div className="footer__copyright">
            <p className="footer__copyright-text">
              © {new Date().getFullYear()} Osmos Electrolitos. Todos los derechos reservados.
            </p>
            <div className="footer__legal-links">
              <a href="/privacidad" className="footer__legal-link">Privacidad</a>
              <span className="footer__separator">•</span>
              <a href="/cookies" className="footer__legal-link">Cookies</a>
              <span className="footer__separator">•</span>
              <a href="/terminos" className="footer__legal-link">Términos</a>
            </div>
          </div>

          <div className="footer__payment-methods">
            <span className="footer__payment-title">Métodos de pago:</span>
            <div className="footer__payment-icons">
              <div className="footer__payment-icon">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" 
                  alt="Visa" 
                  className="footer__payment-img"
                />
              </div>
              <div className="footer__payment-icon">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/MasterCard_Logo.svg" 
                  alt="MasterCard" 
                  className="footer__payment-img"
                />
              </div>
              <div className="footer__payment-icon">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/1/16/Apple_Pay_logo.svg" 
                  alt="Apple Pay" 
                  className="footer__payment-img"
                />
              </div>
              <div className="footer__payment-icon">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Pay_Logo.svg" 
                  alt="Google Pay" 
                  className="footer__payment-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;