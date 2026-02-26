import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        tag={t('contact.pageTag')}
        title={t('contact.pageTitle')}
        description={t('contact.pageDescription')}
      />
      <div className="container">
        <p className="contact-privacy-note">
          {t('contact.privacyNotePrefix')}{' '}
          <Link to="/privacy">{t('contact.privacyLinkText')}</Link>{' '}
          {t('contact.privacyNoteSuffix')}
        </p>
      </div>
      <Contact />
    </>
  );
}
