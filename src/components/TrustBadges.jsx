import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function TrustBadges() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  const items = t('home.trustBadges.items', { returnObjects: true });

  return (
    <section className="trust-badges" ref={ref} aria-label={t('home.trustBadges.heading')}>
      <div className="container">
        <p className={`trust-badges-heading${visible ? ' visible' : ''}`} data-animate="fade-up">
          {t('home.trustBadges.heading')}
        </p>
        <div className={`trust-badges-grid${visible ? ' visible' : ''}`} data-animate="fade-up">
          {items.map((badge, index) => (
            <div key={index} className="trust-badge-item">
              <span className="trust-badge-label">{badge.label}</span>
              <span className="trust-badge-desc">{badge.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
