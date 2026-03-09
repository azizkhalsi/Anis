import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <p className="not-found-text">{t('notFound.text')}</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            {t('notFound.backToHome')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/contact" className="btn btn-outline">{t('notFound.contactUs')}</Link>
        </div>
      </div>
    </section>
  );
}
