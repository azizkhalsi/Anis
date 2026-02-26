import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function MissionPage() {
  const { t } = useTranslation();
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
        tag={t('mission.pageTag')}
        title={t('mission.pageTitle')}
        description={t('mission.pageDescription')}
      />
      <section className="mission-page" id="mission">
        <div className="container mission-container">
          <div className={`mission-block mission-block--highlight ${missionVisible ? 'visible' : ''}`} ref={missionRef} data-animate="fade-up">
            <span className="mission-label">{t('mission.missionLabel')}</span>
            <h2 className="mission-heading">{t('mission.missionHeading')}</h2>
            <p className="mission-statement">{t('mission.missionStatement')}</p>
            <p className="mission-text">{t('mission.missionText')}</p>
          </div>

          <div className={`mission-block ${philosophyVisible ? 'visible' : ''}`} ref={philosophyRef} data-animate="fade-up">
            <span className="mission-label">{t('mission.philosophyLabel')}</span>
            <h2 className="mission-heading">{t('mission.philosophyHeading')}</h2>
            <p className="mission-slogan">&quot;{t('mission.philosophySlogan')}&quot;</p>
            <p className="mission-text">{t('mission.philosophyText1')}</p>
            <p className="mission-text">{t('mission.philosophyText2')}</p>
          </div>

          <div className={`mission-block ${valuesVisible ? 'visible' : ''}`} ref={valuesRef} data-animate="fade-up">
            <span className="mission-label">{t('mission.valuesLabel')}</span>
            <h2 className="mission-heading">{t('mission.valuesHeading')}</h2>
            <div className="mission-values-grid">
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>{t('mission.value1Title')}</h3>
                <p>{t('mission.value1Body')}</p>
              </div>
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <h3>{t('mission.value2Title')}</h3>
                <p>{t('mission.value2Body')}</p>
              </div>
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>{t('mission.value3Title')}</h3>
                <p>{t('mission.value3Body')}</p>
              </div>
              <div className="mission-value">
                <div className="mission-value-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>{t('mission.value4Title')}</h3>
                <p>{t('mission.value4Body')}</p>
              </div>
            </div>
          </div>

          <div className={`mission-block mission-block--accent ${visionVisible ? 'visible' : ''}`} ref={visionRef} data-animate="fade-up">
            <span className="mission-label">{t('mission.visionLabel')}</span>
            <h2 className="mission-heading">{t('mission.visionHeading')}</h2>
            <p className="mission-text">{t('mission.visionText1')}</p>
            <p className="mission-text">{t('mission.visionText2')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
