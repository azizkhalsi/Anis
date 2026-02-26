import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollPosition } from '../hooks/useScrollPositionContext';

const SCROLL_THRESHOLD = 400;
const BOTTOM_HIDE_OFFSET = 140;

export default function StickyCTA() {
  const { t } = useTranslation();
  const scrollY = useScrollPosition();
  const { pathname } = useLocation();

  if (pathname === '/simulator') return null;
  if (pathname === '/contact') return null;
  if (scrollY <= SCROLL_THRESHOLD) return null;

  const docHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0;
  const viewHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const isNearBottom = docHeight > 0 && viewHeight > 0 && scrollY + viewHeight >= docHeight - BOTTOM_HIDE_OFFSET;
  if (isNearBottom) return null;

  return (
    <div className="sticky-cta" role="banner">
      <div className="sticky-cta-inner">
        <span className="sticky-cta-text">{t('common.stickyCtaText')}</span>
        <Link to="/contact" className="btn btn-primary sticky-cta-btn">
          {t('common.getInTouch')}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
