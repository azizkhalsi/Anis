import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

const STEP_IMAGES = [
  '/images/prototyping/step1-schematic.png',
  '/images/prototyping/step2-layout.png',
  '/images/prototyping/step3-artwork.png',
  '/images/prototyping/step4-fabricated.png',
  '/images/prototyping/step5-assembled.png',
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
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const sectionVisible = useScrollAnimation(sectionRef, { threshold: 0.08 });

  const steps = t('expertise.prototypingJourney.steps', { returnObjects: true });
  const stepsArray = Array.isArray(steps) ? steps : [];

  return (
    <section
      className={`prototyping-journey prototyping-journey--horizontal ${sectionVisible ? 'visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="journey-heading"
    >
      <div className="container container--wide">
        <header className="prototyping-journey-header">
          <span className="prototyping-journey-label">{t('expertise.prototypingJourney.label')}</span>
          <h2 id="journey-heading" className="prototyping-journey-title">
            {t('expertise.prototypingJourney.title')}
          </h2>
        </header>

        <div className="prototyping-journey-steps">
          {stepsArray.map((step, index) => (
            <div key={index} className="prototyping-journey-step-wrap">
              <article
                className="prototyping-journey-step"
                style={{ '--step-index': index }}
              >
                <div className="prototyping-journey-step-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="prototyping-journey-step-image-wrap">
                  <img
                    src={STEP_IMAGES[index]}
                    alt={step?.alt ?? step?.title ?? ''}
                    className="prototyping-journey-step-image"
                    width={320}
                    height={180}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="prototyping-journey-step-title">{step?.title ?? ''}</span>
              </article>
              {index < stepsArray.length - 1 && <ArrowConnector index={index} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
