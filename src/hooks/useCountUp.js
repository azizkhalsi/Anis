import { useState, useEffect, useRef } from 'react';

export default function useCountUp(target, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  const lastDisplayedRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const start = performance.now();
    lastDisplayedRef.current = 0;

    function update(now) {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        return;
      }
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.floor(eased * target);
      if (next !== lastDisplayedRef.current) {
        lastDisplayedRef.current = next;
        setCount(next);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') rafRef.current = requestAnimationFrame(update);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    rafRef.current = requestAnimationFrame(update);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, trigger]);

  if (target >= 1000000) {
    return (count / 1000000).toFixed(count < target ? 1 : 0) + 'M';
  }
  return count.toLocaleString();
}
