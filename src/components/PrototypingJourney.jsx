import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const STEPS = [
  { id: 1, title: 'Schematic', image: '/images/prototyping/step1-schematic.png', alt: 'Circuit schematic' },
  { id: 2, title: 'PCB layout', image: '/images/prototyping/step2-layout.png', alt: 'PCB layout' },
  { id: 3, title: 'Solder Paste Stencil', image: '/images/prototyping/step3-artwork.png', alt: 'Solder paste stencil' },
  { id: 4, title: 'Fabricated', image: '/images/prototyping/step4-fabricated.png', alt: 'Bare PCB' },
  { id: 5, title: 'Assembled', image: '/images/prototyping/step5-assembled.png', alt: 'Complete product' },
];

function ArrowConnector({ index }) {
  return (
    <span className="prototyping-journey-arrow" aria-hidden="true" style={{ '--arrow-index': index }}>
      <svg viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="prototyping-journey-arrow-svg">
        <path className="prototyping-journey-arrow-head" d="M36 6h6l-3-3v6l3-3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="prototyping-journey-arrow-line" d="M0 6h36" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 3" />
        <circle className="prototyping-journey-arrow-dot" r="2" cy="6" cx="0" />
      </svg>
    </span>
  );
}

export default function PrototypingJourney() {
  const sectionRef = useRef(null);
  const sectionVisible = useScrollAnimation(sectionRef, { threshold: 0.08 });

  return (
    <section
      className={`prototyping-journey prototyping-journey--horizontal ${sectionVisible ? 'visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="journey-heading"
    >
      <div className="container container--wide">
        <header className="prototyping-journey-header">
          <span className="prototyping-journey-label">Our process</span>
          <h2 id="journey-heading" className="prototyping-journey-title">
            From schematic to real product
          </h2>
        </header>

        <div className="prototyping-journey-steps">
          {STEPS.map((step, index) => (
            <div key={step.id} className="prototyping-journey-step-wrap">
              <article
                className="prototyping-journey-step"
                style={{ '--step-index': index }}
              >
                <div className="prototyping-journey-step-number">{String(step.id).padStart(2, '0')}</div>
                <div className="prototyping-journey-step-image-wrap">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="prototyping-journey-step-image"
                    width={320}
                    height={180}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="prototyping-journey-step-title">{step.title}</span>
              </article>
              {index < STEPS.length - 1 && <ArrowConnector index={index} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
