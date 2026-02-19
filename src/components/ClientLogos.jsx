import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const LOGOS = [
  { id: 1, name: 'Partner One', initial: 'P1' },
  { id: 2, name: 'Partner Two', initial: 'P2' },
  { id: 3, name: 'Partner Three', initial: 'P3' },
  { id: 4, name: 'Partner Four', initial: 'P4' },
  { id: 5, name: 'Partner Five', initial: 'P5' },
  { id: 6, name: 'Partner Six', initial: 'P6' },
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
                <span className="client-logo-placeholder" title={logo.name}>
                  {logo.initial}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
