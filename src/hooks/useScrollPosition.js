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
          const y = window.scrollY;
          setScrollY(y);
          // #region agent log
          fetch('http://127.0.0.1:7374/ingest/3b192536-1e54-4b21-8ca0-89e6554bb50d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'455fe2'},body:JSON.stringify({sessionId:'455fe2',location:'useScrollPosition.js:scroll',message:'scroll position update',data:{scrollY:y},hypothesisId:'H1',timestamp:Date.now()})}).catch(()=>{});
          // #endregion
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
