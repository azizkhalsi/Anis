import { Link, useLocation } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';

const SCROLL_THRESHOLD = 400;

export default function StickyCTA() {
  const scrollY = useScrollPosition();
  const { pathname } = useLocation();

  if (pathname === '/simulator') return null;
  if (scrollY <= SCROLL_THRESHOLD) return null;

  return (
    <div className="sticky-cta" role="banner">
      <div className="sticky-cta-inner">
        <span className="sticky-cta-text">Ready to discuss your project?</span>
        <Link to="/contact" className="btn btn-primary sticky-cta-btn">
          Get in touch
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
