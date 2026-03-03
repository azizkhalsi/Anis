import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '';

/* Top row: Miele, STMicroelectronics */
const LOGOS_TOP = [
  { id: 'miele', name: 'Miele', src: `${BASE}images/logos/miele.png`, alt: 'Miele', larger: true },
  { id: 'st', name: 'STMicroelectronics', src: `${BASE}images/logos/stmicroelectronics.png`, alt: 'STMicroelectronics', larger: true, largest: true },
];

/* Bottom row: Microchip, HL Mando, SPEMOT */
const LOGOS_BOTTOM = [
  { id: 'microchip', name: 'Microchip', src: `${BASE}images/logos/microchip.png`, alt: 'Microchip', larger: true },
  { id: 'partner', name: 'HL Mando', src: `${BASE}images/logos/partner.png`, alt: 'HL Mando', larger: true, largest: true, noBg: true },
  { id: 'spemot', name: 'SPEMOT', src: `${BASE}images/logos/spemot.png`, alt: 'SPEMOT' },
];

export default function ClientLogos() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section id="client-logos" className="client-logos" ref={ref} aria-label={t('home.clientLogos.heading')}>
      <div className="container">
        <p className={`client-logos-heading${visible ? ' visible' : ''}`} data-animate="fade-up">
          {t('home.clientLogos.heading')}
        </p>
        <div className={`client-logos-track${visible ? ' visible' : ''}`} data-animate="fade-up">
          <div className="client-logos-inner">
            <div className="client-logos-row client-logos-row--top">
              {LOGOS_TOP.map((logo) => (
                <div key={logo.id} className={`client-logo-item${logo.larger ? ' client-logo-item--larger' : ''}${logo.largest ? ' client-logo-item--largest' : ''}`}>
                  <span className="client-logo-img-wrap" title={logo.name}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="client-logo-img"
                      width={logo.largest ? 260 : logo.larger ? 220 : 200}
                      height={logo.largest ? 104 : logo.larger ? 88 : 80}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </div>
              ))}
            </div>
            <div className="client-logos-row client-logos-row--bottom">
              {LOGOS_BOTTOM.map((logo) => (
                <div key={logo.id} className={`client-logo-item${logo.larger ? ' client-logo-item--larger' : ''}${logo.largest ? ' client-logo-item--largest' : ''}${logo.noBg ? ' client-logo-item--no-bg' : ''}`}>
                  <span className="client-logo-img-wrap" title={logo.name}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="client-logo-img"
                      width={logo.largest ? 260 : logo.larger ? 220 : 200}
                      height={logo.largest ? 104 : logo.larger ? 88 : 80}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`client-logos-story${visible ? ' visible' : ''}`} data-animate="fade-up">
          <h2 className="client-logos-story-title">{t('home.clientLogos.storyTitle')}</h2>
          <p className="client-logos-story-text">
            {t('home.clientLogos.storyText')}
          </p>
        </div>
      </div>
    </section>
  );
}
