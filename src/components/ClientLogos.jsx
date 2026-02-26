import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '';

const LOGOS = [
  { id: 1, name: 'HILTI', src: `${BASE}images/logos/hilti.png`, alt: 'HILTI' },
  { id: 2, name: 'SPEMOT', src: `${BASE}images/logos/spemot.png`, alt: 'SPEMOT' },
  { id: 3, name: 'Microchip', src: `${BASE}images/logos/microchip.png`, alt: 'Microchip' },
  { id: 4, name: 'Miele', src: `${BASE}images/logos/miele.png`, alt: 'Miele' },
];

export default function ClientLogos() {
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section className="client-logos" ref={ref} aria-label="Trusted by industry partners">
      <div className="container">
        <p className={`client-logos-heading${visible ? ' visible' : ''}`} data-animate="fade-up">
          Trusted by industry leaders
        </p>
        <div className={`client-logos-track${visible ? ' visible' : ''}`} data-animate="fade-up">
          <div className="client-logos-inner">
            {LOGOS.map((logo) => (
              <div key={logo.id} className="client-logo-item">
                <span className="client-logo-img-wrap" title={logo.name}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="client-logo-img"
                    width={180}
                    height={72}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={`client-logos-story${visible ? ' visible' : ''}`} data-animate="fade-up">
          <h2 className="client-logos-story-title">Partnership &amp; success story</h2>
          <p className="client-logos-story-text">
            We collaborate with industry leaders like Miele&amp;Cie KG to deliver sensorless motor control in mass production. With over 20 patents, Appcon drives innovation and ensures project success from concept to deployment.
          </p>
        </div>
      </div>
    </section>
  );
}
