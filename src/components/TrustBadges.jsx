import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const BADGES = [
  { id: 1, label: 'Expertise', desc: '20+ years in motor control' },
  { id: 2, label: 'Quality', desc: 'Production-ready solutions' },
  { id: 3, label: 'Support', desc: 'Dedicated R&D partnership' },
];

export default function TrustBadges() {
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section className="trust-badges" ref={ref} aria-label="Why work with us">
      <div className="container">
        <p className={`trust-badges-heading${visible ? ' visible' : ''}`} data-animate="fade-up">
          Why work with us
        </p>
        <div className={`trust-badges-grid${visible ? ' visible' : ''}`} data-animate="fade-up">
          {BADGES.map((badge) => (
            <div key={badge.id} className="trust-badge-item">
              <span className="trust-badge-label">{badge.label}</span>
              <span className="trust-badge-desc">{badge.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
