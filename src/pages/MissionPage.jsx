import { useRef } from 'react';
import PageHeader from '../components/PageHeader';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function MissionPage() {
  const missionRef = useRef(null);
  const philosophyRef = useRef(null);
  const valuesRef = useRef(null);
  const visionRef = useRef(null);

  const missionVisible = useScrollAnimation(missionRef, { threshold: 0.1 });
  const philosophyVisible = useScrollAnimation(philosophyRef, { threshold: 0.1 });
  const valuesVisible = useScrollAnimation(valuesRef, { threshold: 0.1 });
  const visionVisible = useScrollAnimation(visionRef, { threshold: 0.1 });

  return (
    <>
      <PageHeader
        tag="Our Mission"
        title="Advancing the State-of-the-Art"
        description="Driving innovation in sensorless motor control solutions to enable energy-efficient drives across industries worldwide."
      />
      <section className="mission-page" id="mission">
        <div className="container mission-container">
          <div className={`mission-block mission-block--highlight ${missionVisible ? 'visible' : ''}`} ref={missionRef} data-animate="fade-up">
            <span className="mission-label">The Mission</span>
            <h2 className="mission-heading">Our Purpose</h2>
            <p className="mission-statement">
              The mission of Appcon Technologies is to advance the state-of-the-art in sensorless motor control solutions.
            </p>
            <p className="mission-text">
              We dedicate ourselves to pushing the boundaries of what's possible in motor control and power electronics, developing solutions that reduce cost, eliminate complexity, and deliver higher reliability through sensorless technology.
            </p>
          </div>

          <div className={`mission-block ${philosophyVisible ? 'visible' : ''}`} ref={philosophyRef} data-animate="fade-up">
            <span className="mission-label">The Philosophy</span>
            <h2 className="mission-heading">Beyond the Know-How</h2>
            <p className="mission-slogan">
              "Beyond knowing the know-how — we know the <em>know-why</em>."
            </p>
            <p className="mission-text">
              At Appcon, we don't just implement solutions — we understand the fundamental principles that make them work. This deep understanding allows us to innovate, optimize, and solve problems that others cannot. When you work with us, you gain access to decades of research-backed expertise in motor control theory and practice.
            </p>
            <p className="mission-text">
              Our engineers bring academic rigor combined with practical industry experience, enabling us to translate complex theoretical concepts into robust, production-ready systems.
            </p>
          </div>

          <div className={`mission-block ${valuesVisible ? 'visible' : ''}`} ref={valuesRef} data-animate="fade-up">
            <span className="mission-label">Core Values</span>
            <h2 className="mission-heading">What Drives Us</h2>
            <div className="mission-values-grid">
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Innovation</h3>
                <p>Continuously pushing the boundaries of sensorless control technology</p>
              </div>
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <h3>Excellence</h3>
                <p>Delivering solutions that exceed expectations in quality and reliability</p>
              </div>
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Partnership</h3>
                <p>Collaborating closely with clients from concept through production</p>
              </div>
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Sustainability</h3>
                <p>Enabling energy-efficient drives that reduce global CO₂ emissions</p>
              </div>
            </div>
          </div>

          <div className={`mission-block mission-block--accent ${visionVisible ? 'visible' : ''}`} ref={visionRef} data-animate="fade-up">
            <span className="mission-label">The Vision</span>
            <h2 className="mission-heading">Where We're Headed</h2>
            <p className="mission-text">
              We envision a future where energy-efficient motor drives are ubiquitous — from household appliances and power tools to automotive and e-mobility applications. Through our work in sensorless control, we aim to eliminate the need for expensive encoders and sensors, reducing cost and complexity while improving reliability.
            </p>
            <p className="mission-text">
              With systems in production numbering in the millions annually, we are proud to contribute to global energy optimization and a more sustainable future. Our vision is to remain at the forefront of motor control innovation, continuously advancing the technology that powers the world.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
