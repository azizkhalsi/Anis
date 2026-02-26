import { useState, useEffect } from 'react';

const THROTTLE_MS = 100;

/**
 * Throttled scroll position. Shared by Navbar and StickyCTA to avoid duplicate listeners.
 */
export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    setScrollY(window.scrollY);
    let last = 0;
    let raf = null;

    function onScroll() {
      const now = Date.now();
      if (now - last >= THROTTLE_MS) {
        last = now;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          raf = null;
        });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return scrollY;
}
