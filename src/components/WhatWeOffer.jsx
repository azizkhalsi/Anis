import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

const STAGGER_DELAYS = [0, 120, 240];

export default function WhatWeOffer() {
  const { t } = useTranslation();
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const visible0 = useScrollAnimation(ref0, { delay: STAGGER_DELAYS[0] });
  const visible1 = useScrollAnimation(ref1, { delay: STAGGER_DELAYS[1] });
  const visible2 = useScrollAnimation(ref2, { delay: STAGGER_DELAYS[2] });
  const visibles = [visible0, visible1, visible2];

  const pillars = t('home.whatWeOffer.pillars', { returnObjects: true });
  const bannerText = t('home.whatWeOffer.banner');

  if (!Array.isArray(pillars) || pillars.length === 0) return null;

  return (
    <section
      id="what-we-offer"
      className="what-we-offer"
      aria-label={bannerText}
    >
      <div className="what-we-offer-banner">
        <span className="what-we-offer-banner-icon" aria-hidden="true" />
        <h2 className="what-we-offer-banner-title">{bannerText}</h2>
      </div>
      <div className="container">
        <div className="what-we-offer-grid">
          {pillars.map((pillar, index) => (
            <article
              key={index}
              ref={[ref0, ref1, ref2][index]}
              className={`what-we-offer-pillar ${visibles[index] ? 'visible' : ''}`}
              data-animate="fade-up"
            >
              <h3 className="what-we-offer-pillar-title">{pillar.title}</h3>
              <div className="what-we-offer-spheres">
                <div className="what-we-offer-sphere what-we-offer-sphere--small" aria-hidden="true" />
                <div className="what-we-offer-sphere what-we-offer-sphere--large">
                  <span className="what-we-offer-sphere-text">{pillar.sphereText}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="what-we-offer-logo" aria-hidden="true">
          <svg className="what-we-offer-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <div className="what-we-offer-logo-text">
            <span className="what-we-offer-logo-brand">APPCON</span>
            <span className="what-we-offer-logo-tech">TECHNOLOGIES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
