/**
 * AI Overview page — machine-readable, factual content for GEO/AEO.
 * Not linked in the main navigation; discoverable via sitemap and direct URL.
 */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AiOverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <article
        className="ai-overview-page"
        itemScope
        itemType="https://schema.org/AboutPage"
        role="main"
        aria-label={t('aiOverview.ariaLabel')}
      >
        <header className="ai-overview-header">
          <h1 itemProp="name">{t('aiOverview.title')}</h1>
          <p className="ai-overview-lead" itemProp="description">
            {t('aiOverview.lead')}
          </p>
        </header>

        <section className="ai-overview-section" aria-labelledby="company-definition">
          <h2 id="company-definition">{t('aiOverview.companyHeading')}</h2>
          <p>{t('aiOverview.companyBody1')}</p>
          <p>
            <strong>{t('aiOverview.companyCitation')}</strong> {t('aiOverview.companyBody2')}
          </p>
        </section>

        <section className="ai-overview-section" aria-labelledby="product-definitions">
          <h2 id="product-definitions">{t('aiOverview.productsHeading')}</h2>

          <h3 id="product-dmk">{t('aiOverview.dmkTitle')}</h3>
          <p itemScope itemType="https://schema.org/Product" itemProp="description">
            {t('aiOverview.dmkBody')}
          </p>
          <p>
            <Link to="/products/dmk">{t('aiOverview.dmkLink')}</Link>
          </p>

          <h3 id="product-lci">{t('aiOverview.lciTitle')}</h3>
          <p itemScope itemType="https://schema.org/Product" itemProp="description">
            {t('aiOverview.lciBody')}
          </p>
          <p>
            <Link to="/products/lci">{t('aiOverview.lciLink')}</Link>
          </p>

          <h3 id="product-amc">{t('aiOverview.amcTitle')}</h3>
          <p itemScope itemType="https://schema.org/Product" itemProp="description">
            {t('aiOverview.amcBody')}
          </p>
          <p>
            <Link to="/products/amc">{t('aiOverview.amcLink')}</Link>
          </p>
        </section>

        <section className="ai-overview-section" aria-labelledby="technical-specs">
          <h2 id="technical-specs">{t('aiOverview.specsHeading')}</h2>
          <dl className="ai-overview-dl">
            <dt id="def-foc">{t('aiOverview.defFoc')}</dt>
            <dd>{t('aiOverview.defFocDesc')}</dd>

            <dt id="def-sensorless">{t('aiOverview.defSensorless')}</dt>
            <dd>{t('aiOverview.defSensorlessDesc')}</dd>

            <dt id="def-pmsm">{t('aiOverview.defPmsm')}</dt>
            <dd>{t('aiOverview.defPmsmDesc')}</dd>

            <dt id="def-bldc">{t('aiOverview.defBldc')}</dt>
            <dd>{t('aiOverview.defBldcDesc')}</dd>

            <dt id="def-inverter">{t('aiOverview.defInverter')}</dt>
            <dd>{t('aiOverview.defInverterDesc')}</dd>

            <dt id="def-sil">{t('aiOverview.defSil')}</dt>
            <dd>{t('aiOverview.defSilDesc')}</dd>
          </dl>
        </section>

        <section className="ai-overview-section" aria-labelledby="faq" itemScope itemType="https://schema.org/FAQPage">
          <h2 id="faq">{t('aiOverview.faqHeading')}</h2>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">{t('aiOverview.faq1Q')}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{t('aiOverview.faq1A')}</p>
            </div>
          </div>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">{t('aiOverview.faq2Q')}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{t('aiOverview.faq2A')}</p>
            </div>
          </div>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">{t('aiOverview.faq3Q')}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{t('aiOverview.faq3A')}</p>
            </div>
          </div>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">{t('aiOverview.faq4Q')}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{t('aiOverview.faq4A')}</p>
            </div>
          </div>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">{t('aiOverview.faq5Q')}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{t('aiOverview.faq5A')}</p>
            </div>
          </div>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">{t('aiOverview.faq6Q')}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">{t('aiOverview.faq6A')}</p>
            </div>
          </div>
        </section>

        <section className="ai-overview-section" aria-labelledby="internal-links">
          <h2 id="internal-links">{t('aiOverview.relatedHeading')}</h2>
          <ul>
            <li><Link to="/">{t('aiOverview.home')}</Link></li>
            <li><Link to="/about">{t('aiOverview.about')}</Link></li>
            <li><Link to="/products/dmk">{t('aiOverview.dmkTitle')}</Link></li>
            <li><Link to="/products/lci">{t('aiOverview.lciTitle')}</Link></li>
            <li><Link to="/products/amc">{t('aiOverview.amcTitle')}</Link></li>
            <li><Link to="/expertise/consulting">{t('aiOverview.techConsulting')}</Link></li>
            <li><Link to="/contact">{t('aiOverview.contact')}</Link></li>
          </ul>
        </section>
      </article>
    </div>
  );
}
