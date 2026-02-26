import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FOOTER_LINKS = [
  { categoryKey: 'footer.company', links: [
    { labelKey: 'footer.whoWeAre', to: '/about' },
    { labelKey: 'footer.ourStory', to: '/company/our-story' },
    { labelKey: 'footer.industryEvents', to: '/events' },
    { labelKey: 'footer.contact', to: '/contact' },
    { labelKey: 'footer.privacyPolicy', to: '/privacy' },
  ]},
  { categoryKey: 'footer.products', links: [
    { labelKey: 'footer.dmk', to: '/products/dmk' },
    { labelKey: 'footer.lci', to: '/products/lci' },
    { labelKey: 'footer.amc', to: '/products/amc' },
  ]},
  { categoryKey: 'footer.expertise', links: [
    { labelKey: 'footer.technologyConsulting', to: '/expertise/consulting' },
    { labelKey: 'footer.hardwareEngineering', to: '/expertise/hardware' },
  ]},
  { categoryKey: 'footer.industries', links: [
    { labelKey: 'footer.whiteGoods', to: '/industries/whitegood' },
    { labelKey: 'footer.powerTools', to: '/industries/powertool' },
    { labelKey: 'footer.automotive', to: '/industries/automotive' },
  ]},
];

export default function Footer() {
  const { t } = useTranslation();
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  const logoVisible = useScrollAnimation(logoRef);
  const linksVisible = useScrollAnimation(linksRef, { delay: 100 });

  return (
    <footer className="footer">
      <div className="container">
        <div className={`footer-content ${logoVisible ? 'visible' : ''}`} ref={logoRef} data-animate="fade-up">
          <Link to="/">
            <img src="/logo.png" alt="Appcon Technologies" className="logo-img" width="160" height="40" loading="lazy" decoding="async" />
          </Link>
          <p className="footer-brand-desc">
            {t('footer.brandDesc')}
          </p>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/company/appcontechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={t('footer.linkedInAria')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <div className={`footer-links ${linksVisible ? 'visible' : ''}`} ref={linksRef} data-animate="fade-up">
          {FOOTER_LINKS.map((col) => (
            <div className="footer-link-column" key={col.categoryKey}>
              <h4>{t(col.categoryKey)}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link to={link.to}>{t(link.labelKey)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom footer-bottom--always-visible">
          <p className="footer-copyright">
            &copy; 2026 {t('footer.copyright')}
            {' · '}
            <Link to="/privacy" className="footer-privacy-link">{t('footer.privacyPolicy')}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
