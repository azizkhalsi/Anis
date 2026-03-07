import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function ClientLogos() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);

  return (
    <section id="client-logos" className="client-logos" ref={ref} aria-label={t('home.clientLogos.heading')}>
      <div className="container">
        <p className={`client-logos-heading${visible ? ' visible' : ''}`} data-animate="fade-up">
          {t('home.clientLogos.heading')}
        </p>
        <div className={`client-logos-track${visible ? ' visible' : ''}`} data-animate="fade-up">
          <div className="client-logos-companies-text">
            <p className="client-logos-companies-paragraph">
              {t('home.clientLogos.companiesParagraph')}
            </p>
          </div>
        </div>
        <div className={`client-logos-story${visible ? ' visible' : ''}`} data-animate="fade-up">
          <h2 className="client-logos-story-title">{t('home.clientLogos.storyTitle')}</h2>
          <p className="client-logos-story-text">
            {t('home.clientLogos.storyText')}
          </p>
        </div>
      </div>
    </section>
  );
}
