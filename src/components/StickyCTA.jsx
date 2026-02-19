import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SCROLL_THRESHOLD = 400;

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

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
