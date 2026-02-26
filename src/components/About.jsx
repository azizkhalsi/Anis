import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function About() {
  const { t } = useTranslation();
  const location = useLocation();
  const contentRef = useRef(null);
  const contentVisible = useScrollAnimation(contentRef);

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash === 'who-we-are') {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid about-grid--content-only">
          <div
            id="who-we-are"
            className={`about-content ${contentVisible ? 'visible' : ''}`}
            ref={contentRef}
            data-animate="fade-right"
          >
            <p className="about-text">{t('about.paragraph1')}</p>
            <p className="about-text">{t('about.paragraph2')}</p>
            <div className="about-highlights">
              <div className="highlight">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div>
                  <strong>{t('about.highlight1Title')}</strong>
                  <p>{t('about.highlight1Body')}</p>
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
                  <strong>{t('about.highlight2Title')}</strong>
                  <p>{t('about.highlight2Body')}</p>
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
                  <strong>{t('about.highlight3Title')}</strong>
                  <p>{t('about.highlight3Body')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
