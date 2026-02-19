import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FOOTER_LINKS = {
  Company: [
    { label: 'Who We Are', to: '/about' },
    { label: 'Our Story', to: '/company/our-story' },
    { label: 'Industry Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
  ],
  Products: [
    { label: 'DMK', to: '/products/dmk' },
    { label: 'LCI', to: '/products/lci' },
    { label: 'AMC', to: '/products/amc' },
  ],
  Expertise: [
    { label: 'Technology Consulting', to: '/expertise/consulting' },
    { label: 'Hardware Engineering', to: '/expertise/hardware' },
  ],
  Industries: [
    { label: 'White Goods', to: '/industries/whitegood' },
    { label: 'Power Tools', to: '/industries/powertool' },
    { label: 'Automotive', to: '/industries/automotive' },
    { label: 'E-Mobility', to: '/industries/emobility' },
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
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/company/appcontechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Appcon Technologies on LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
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
