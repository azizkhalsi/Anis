import { useState, useEffect, useRef } from 'react';
import { ScrollPositionContext } from './scrollPositionContextValue';

/** Only update React state when scroll changes by this much (px) to reduce re-renders and scroll lag. */
const SCROLL_UPDATE_THRESHOLD = 40;
const THROTTLE_MS = 80;

export function ScrollPositionProvider({ children }) {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  const lastSent = useRef(scrollY);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const now = Date.now();
      if (now - lastTimeRef.current < THROTTLE_MS) return;
      lastTimeRef.current = now;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = lastSent.current;
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        const threshold = isMobile ? 56 : SCROLL_UPDATE_THRESHOLD;
        const pastThreshold = Math.abs(y - prev) >= threshold;
        const cross50 = (prev <= 50 && y > 50) || (prev > 50 && y <= 50);
        const cross400 = (prev <= 400 && y > 400) || (prev > 400 && y <= 400);
        if (y !== prev && (pastThreshold || cross50 || cross400)) {
          lastSent.current = y;
          setScrollY(y);
        }
        rafRef.current = null;
      });
    }

    const initialY = typeof window !== 'undefined' ? window.scrollY : 0;
    lastSent.current = initialY;
    setScrollY(initialY);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <ScrollPositionContext.Provider value={scrollY}>
      {children}
    </ScrollPositionContext.Provider>
  );
}
