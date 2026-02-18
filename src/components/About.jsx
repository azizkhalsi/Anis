import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function About() {
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const contentVisible = useScrollAnimation(contentRef);
  const visualVisible = useScrollAnimation(visualRef);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div
            className={`about-content ${contentVisible ? 'visible' : ''}`}
            ref={contentRef}
            data-animate="fade-right"
          >
            <p className="about-text">
              Founded in 2004 by Dr.-Ing. Hafiedh Sammoud, Appcon Technologies is an R&D engineering firm specializing in sensorless control of electrical motors and the conceptualization and optimization of power electronics.
            </p>
            <p className="about-text">
              Our mission is to advance the state-of-the-art in sensorless motor control solutions, enabling their application in new scenarios where it is currently unfeasible. Particularly in high-volume products, where energy-efficient drives are underutilized due to cost constraints, we believe that our efforts contribute to optimizing energy consumption and reducing global CO₂ emissions.
            </p>
            <div className="about-highlights">
              <div className="highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <strong>Expert Team</strong>
                  <p>Highly qualified engineers with diverse expertise in drive technology, simulation, programming, and practical electronics.</p>
                </div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <strong>Global Reach</strong>
                  <p>International focus — we communicate with our partners in German, English, and French.</p>
                </div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <strong>Trusted Partners</strong>
                  <p>Collaborating with companies in white goods, power tools, and automotive — solutions used in systems produced in millions annually.</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`about-visual ${visualVisible ? 'visible' : ''}`}
            ref={visualRef}
            data-animate="fade-left"
          >
            <div className="about-image-wrapper">
              <div className="about-pattern"></div>
              <div className="about-card">
                <img src="/about-lab.png" alt="Appcon Technologies R&D Laboratory" className="about-card-img" />
                <div className="about-card-label">Our R&D Laboratory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
