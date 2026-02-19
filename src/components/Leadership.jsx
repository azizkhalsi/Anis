import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Leadership() {
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section className="leadership-section">
      <div className="container">
        <div className={`ceo-section ${visible ? 'visible' : ''}`} ref={ref} data-animate="fade-up">
          <div className="ceo-card">
            <div className="ceo-photo-wrapper">
              <img
                src="/images/ceo-portrait.png"
                alt="Dr.-Ing. Hafedh Sammoud, Founder and CEO of Appcon Technologies"
                className="ceo-photo"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 90vw, 400px"
              />
            </div>
            <div className="ceo-info">
              <span className="ceo-tag">Founder &amp; CEO</span>
              <h3 className="ceo-name">Dr.-Ing. Hafedh Sammoud</h3>
              <p className="ceo-bio">
                With over 20 years of experience in motor control and power electronics, Dr. Sammoud founded Appcon Technologies in 2004 with a clear mission: to make sensorless motor control viable for mass-production applications. His journey began as a research assistant, continued in senior engineering roles at a leading German corporation, and culminated in building Appcon into a trusted R&D partner for companies worldwide.
              </p>
              <a
                href="https://www.linkedin.com/in/dr-hafedh-sammoud-9403712/"
                target="_blank"
                rel="noopener noreferrer"
                className="ceo-linkedin"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Dr. Sammoud on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
