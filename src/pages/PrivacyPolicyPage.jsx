import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const localeForDate = (lng) => (lng && lng.startsWith('de') ? 'de-DE' : 'en-GB');

export default function PrivacyPolicyPage() {
  const { t, i18n } = useTranslation();
  const dateLocale = localeForDate(i18n.language);
  return (
    <>
      <PageHeader
        tag={t('privacyPage.pageTag')}
        title={t('privacyPage.pageTitle')}
        description={t('privacyPage.pageDescription')}
      />
      <section className="privacy-policy page-content">
        <div className="container container--privacy-with-toc">
          <nav className="privacy-toc" aria-label={t('privacyPage.onThisPage')}>
            <p className="privacy-toc-title">{t('privacyPage.onThisPage')}</p>
            <ol className="privacy-toc-list">
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <li key={n}>
                  <a href={`#privacy-section-${n}`} className="privacy-toc-link">{t(`privacyPage.section${n}Title`)}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="privacy-policy-content">
            <p className="privacy-policy-updated">
              <strong>{t('privacyPage.lastUpdated')}</strong>{' '}
              {new Date().toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <h2 id="privacy-section-1">{t('privacyPage.section1Title')}</h2>
            <p>{t('privacyPage.section1Body')}</p>

            <h2 id="privacy-section-2">{t('privacyPage.section2Title')}</h2>
            <p>
              {t('privacyPage.section2IntroPrefix')}
              <strong>{t('privacyPage.section2IntroBold')}</strong>
              {t('privacyPage.section2IntroSuffix')}
            </p>
            <ul>
              <li>{t('privacyPage.section2ListItem1')}</li>
              <li>{t('privacyPage.section2ListItem2')}</li>
              <li>{t('privacyPage.section2ListItem3')}</li>
            </ul>
            <p>{t('privacyPage.section2Note')}</p>

            <h2 id="privacy-section-3">{t('privacyPage.section3Title')}</h2>
            <p>{t('privacyPage.section3Intro')}</p>
            <ul>
              <li>{t('privacyPage.section3ListItem1')}</li>
              <li>{t('privacyPage.section3ListItem2')}</li>
            </ul>
            <p>{t('privacyPage.section3Note')}</p>

            <h2 id="privacy-section-4">{t('privacyPage.section4Title')}</h2>
            <p>{t('privacyPage.section4Body')}</p>

            <h2 id="privacy-section-5">{t('privacyPage.section5Title')}</h2>
            <p>{t('privacyPage.section5Body')}</p>

            <h2 id="privacy-section-6">{t('privacyPage.section6Title')}</h2>
            <p>{t('privacyPage.section6Intro')}</p>
            <ul>
              <li>{t('privacyPage.section6ListItem1')}</li>
              <li>{t('privacyPage.section6ListItem2')}</li>
              <li>{t('privacyPage.section6ListItem3')}</li>
              <li>{t('privacyPage.section6ListItem4')}</li>
            </ul>
            <p>{t('privacyPage.section6Note')}</p>

            <h2 id="privacy-section-7">{t('privacyPage.section7Title')}</h2>
            <p>{t('privacyPage.section7Body')}</p>

            <h2 id="privacy-section-8">{t('privacyPage.section8Title')}</h2>
            <p>{t('privacyPage.section8Body')}</p>

            <h2 id="privacy-section-9">{t('privacyPage.section9Title')}</h2>
            <p>{t('privacyPage.section9Body')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
