import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DmkDataIntelligence from '../components/DmkDataIntelligence';

/**
 * Standalone preview of the DMK Data Intelligence section for design review.
 * Not linked in main nav; use /products/dmk-data-intelligence-preview to view.
 */
export default function DmkDataIntelligencePreviewPage() {
  const { t } = useTranslation();

  return (
    <div className="dmk-data-intelligence-preview-page">
      <div className="dmk-data-intelligence-preview-bar">
        <Link to="/products/dmk" className="dmk-data-intelligence-preview-back">
          ← {t('products.dmk.pcSceneBackLabel')} / DMK
        </Link>
        <span className="dmk-data-intelligence-preview-label">
          {t('products.dmk.pcSceneDataIntelligence')} — preview
        </span>
        <a
          href="/dmk-story-standalone.html"
          target="_blank"
          rel="noopener noreferrer"
          className="dmk-data-intelligence-preview-standalone"
        >
          Open standalone HTML ↗
        </a>
      </div>
      <div className="dmk-data-intelligence-preview-content">
        <DmkDataIntelligence variant="page" />
      </div>
    </div>
  );
}
