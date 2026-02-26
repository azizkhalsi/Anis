import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function PublicationsList() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const visible = useScrollAnimation(sectionRef, { threshold: 0.08 });

  const items = t('publications.items', { returnObjects: true });
  const itemsArray = Array.isArray(items) ? items : [];

  return (
    <section
      id="publications"
      className={`publications-section ${visible ? 'visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="publications-heading"
      data-animate="fade-up"
    >
      <div className="container">
        <header className="publications-header">
          <h2 id="publications-heading" className="publications-title">
            {t('publications.sectionTitle')}
          </h2>
          <p className="publications-subtitle">
            {t('publications.sectionSubtitle')}
          </p>
        </header>

        <ul className="publications-list">
          {itemsArray.map((item, index) => (
            <li key={index} className="publications-item">
              <article className="publications-card">
                <div className="publications-card-meta">
                  <span className="publications-type">
                    {t(`publications.types.${item.type}`)}
                  </span>
                  <span className="publications-year">{item.year}</span>
                </div>
                <h3 className="publications-card-title">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="publications-link"
                  >
                    {t(item.titleKey)}
                  </a>
                </h3>
                {item.venueKey && t(item.venueKey) && (
                  <p className="publications-venue">{t(item.venueKey)}</p>
                )}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="publications-cta"
                >
                  {t('publications.viewOnResearchGate')}
                </a>
              </article>
            </li>
          ))}
        </ul>

        <div className="publications-footer">
          <a
            href={t('publications.profileUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="publications-view-all"
          >
            {t('publications.viewAllOnResearchGate')}
          </a>
        </div>
      </div>
    </section>
  );
}
