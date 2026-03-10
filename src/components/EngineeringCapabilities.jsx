import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function EngineeringCapabilities() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);
  const items = t('home.engineeringCapabilities.items', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  return (
    <section
      className="engineering-capabilities"
      ref={ref}
      aria-label={t('home.engineeringCapabilities.title')}
    >
      <div className="container">
        <h2 className={`engineering-capabilities-title${visible ? ' visible' : ''}`} data-animate="fade-up">
          {t('home.engineeringCapabilities.title')}
        </h2>
        <ul className={`engineering-capabilities-list${visible ? ' visible' : ''}`} data-animate="fade-up">
          {list.map((item, i) => (
            <li key={i} className="engineering-capabilities-item">
              <span className="engineering-capabilities-check" aria-hidden="true">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
