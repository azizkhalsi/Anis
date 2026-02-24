import { createContext, useContext, useState, useEffect } from 'react';

const THROTTLE_MS = 100;

const ScrollPositionContext = createContext(0);

export function ScrollPositionProvider({ children }) {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

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

  return (
    <ScrollPositionContext.Provider value={scrollY}>
      {children}
    </ScrollPositionContext.Provider>
  );
}

export function useScrollPosition() {
  return useContext(ScrollPositionContext);
}
