import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

const SERVICE_ICONS = [
  (
    <svg key="1" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M16 24L22 30L32 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg key="2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M16 32V24M24 32V16M32 32V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8L40 18V34L24 44L8 34V18L24 8Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M24 18L32 23V31L24 36L16 31V23L24 18Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M18 24L22 28L30 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
];

const STAGGER_DELAYS = [0, 100, 200, 300];

export default function Services() {
  const { t } = useTranslation();
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const visible0 = useScrollAnimation(ref0, { delay: STAGGER_DELAYS[0] });
  const visible1 = useScrollAnimation(ref1, { delay: STAGGER_DELAYS[1] });
  const visible2 = useScrollAnimation(ref2, { delay: STAGGER_DELAYS[2] });
  const visible3 = useScrollAnimation(ref3, { delay: STAGGER_DELAYS[3] });
  const visibles = [visible0, visible1, visible2, visible3];

  const headerRef = useRef(null);
  const headerVisible = useScrollAnimation(headerRef);

  const items = t('home.services.items', { returnObjects: true });

  return (
    <section className="services" id="services">
      <div className="container">
        <div className={`section-header ${headerVisible ? 'visible' : ''}`} ref={headerRef} data-animate="fade-up">
          <span className="section-tag">{t('home.services.tag')}</span>
          <h2 className="section-title">{t('home.services.title')}</h2>
          <p className="section-desc">{t('home.services.desc')}</p>
        </div>
        <div className="services-grid">
          {items.map((service, index) => (
            <div
              key={index}
              ref={[ref0, ref1, ref2, ref3][index]}
              className={`service-card ${visibles[index] ? 'visible' : ''}`}
              data-animate="fade-up"
            >
              <div className="service-icon">{SERVICE_ICONS[index]}</div>
              <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
