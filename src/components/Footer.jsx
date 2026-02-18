import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Products: [
    { label: 'DMK', to: '/products' },
    { label: 'LCI', to: '/products' },
    { label: 'AMC', to: '/products' },
  ],
  Expertise: [
    { label: 'Our Expertise', to: '/expertise' },
    { label: 'Industries', to: '/industries' },
  ],
};

export default function Footer() {
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);

  const logoVisible = useScrollAnimation(logoRef);
  const linksVisible = useScrollAnimation(linksRef, { delay: 100 });
  const bottomVisible = useScrollAnimation(bottomRef, { delay: 150 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className={`footer-content ${logoVisible ? 'visible' : ''}`} ref={logoRef} data-animate="fade-up">
          <Link to="/">
            <img src="/logo.png" alt="Appcon Technologies" className="logo-img" />
          </Link>
          <p className="footer-brand-desc">
            Appcon Technologies is an R&D engineering firm specializing in sensorless control of electrical motors and the conceptualization and optimization of power electronics. Innovating the future of motor control solutions since 2004.
          </p>
        </div>

        <div className={`footer-links ${linksVisible ? 'visible' : ''}`} ref={linksRef} data-animate="fade-up">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div className="footer-link-column" key={category}>
              <h4>{category}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`footer-bottom ${bottomVisible ? 'visible' : ''}`} ref={bottomRef} data-animate="fade-up">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Appcon Technologies. All rights reserved.
          </p>
          <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
