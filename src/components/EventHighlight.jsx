import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function EventHighlight() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section className="event-highlight" ref={ref}>
      <div className="container">
        <div className={`event-card ${visible ? 'visible' : ''}`} data-animate="fade-up">
          <div className="event-badge">
            <span className="event-badge-dot" />
            {t('events.badge')}
          </div>
          <div className="event-content">
            <div className="event-text">
              <h3 className="event-title">{t('events.title')}</h3>
              <p className="event-desc">{t('events.desc')}</p>
              <div className="event-innovations">
                <div className="event-innovation">
                  <span className="event-innovation-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                  <div>
                    <strong>{t('events.innovation1Title')}</strong>
                    <p>{t('events.innovation1Body')}</p>
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
                    <strong>{t('events.innovation2Title')}</strong>
                    <p>{t('events.innovation2Body')}</p>
                  </div>
                </div>
              </div>
              <Link to="/products" className="btn btn-outline event-cta">
                {t('events.cta')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="event-photo">
              <img
                src="/images/ceo-hafedh-sammoud.png"
                alt={t('events.photoAlt')}
                width="480"
                height="320"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <span className="event-photo-caption">{t('events.photoCaption')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
