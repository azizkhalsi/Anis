import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SEGMENT_LABELS = {
  about: 'nav.whoWeAre',
  company: 'nav.company',
  mission: 'nav.ourMission',
  'our-story': 'nav.ourStory',
  events: 'nav.industryEvents',
  expertise: 'nav.expertise',
  consulting: 'nav.technologyConsulting',
  hardware: 'nav.hardwareEngineering',
  software: 'nav.softwareDevelopment',
  mbd: 'nav.modelBasedDesign',
  prototyping: 'nav.prototyping',
  products: 'nav.products',
  dmk: 'nav.dmk',
  lci: 'nav.lci',
  amc: 'nav.amc',
  industries: 'nav.industries',
  whitegood: 'nav.whiteGoods',
  powertool: 'nav.powerTools',
  automotive: 'nav.automotive',
  contact: 'nav.contact',
  privacy: 'footer.privacyPolicy',
  simulator: 'nav.simulator',
};

function buildSegments(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return [];
  const segments = [{ to: '/', labelKey: 'common.breadcrumbHome' }];
  let path = '';
  for (let i = 0; i < parts.length; i++) {
    path += `/${parts[i]}`;
    const labelKey = SEGMENT_LABELS[parts[i]] || null;
    if (labelKey) segments.push({ to: path, labelKey });
  }
  return segments;
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  if (pathname === '/') return null;
  const segments = buildSegments(pathname);
  if (segments.length < 2) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {segments.map((seg, i) => (
          <li key={seg.to} className="breadcrumbs-item">
            {i > 0 && <span className="breadcrumbs-sep" aria-hidden>›</span>}
            {i === segments.length - 1 ? (
              <span className="breadcrumbs-current">{t(seg.labelKey)}</span>
            ) : (
              <Link to={seg.to} className="breadcrumbs-link">{t(seg.labelKey)}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
