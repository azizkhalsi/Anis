import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function EventHighlight() {
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section className="event-highlight" ref={ref}>
      <div className="container">
        <div className={`event-card ${visible ? 'visible' : ''}`} data-animate="fade-up">
          <div className="event-badge">
            <span className="event-badge-dot" />
            Industry Event
          </div>
          <div className="event-content">
            <div className="event-text">
              <h3 className="event-title">
                Appcon Technologies at PCIM Europe 2025
              </h3>
              <p className="event-desc">
                We exhibited at <strong>PCIM Europe 2025</strong> in Nuremberg (May 6–8), connecting with experts across power tools, white goods, e-bikes, scooters, and industrial inverters. We introduced two major innovations:
              </p>
              <div className="event-innovations">
                <div className="event-innovation">
                  <span className="event-innovation-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                  <div>
                    <strong>High-Frequency Injection Control</strong>
                    <p>Sensorless control with full torque at standstill</p>
                  </div>
                </div>
                <div className="event-innovation">
                  <span className="event-innovation-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </span>
                  <div>
                    <strong>DMK (Diagnostic Measurement Card)</strong>
                    <p>Streamlining debugging, benchmarking &amp; reverse engineering</p>
                  </div>
                </div>
              </div>
              <Link to="/products" className="btn btn-outline event-cta">
                Discover Our Products
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="event-photo">
              <img
                src="/images/ceo-hafedh-sammoud.png"
                alt="Dr. Hafedh Sammoud at the Appcon Technologies booth, PCIM Europe 2025 Nuremberg"
                width="480"
                height="320"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <span className="event-photo-caption">
                Dr. Hafedh Sammoud at PCIM Europe 2025, Nuremberg
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
