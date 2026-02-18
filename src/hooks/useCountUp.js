import { useState, useEffect, useRef } from 'react';

export default function useCountUp(target, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, trigger]);

  if (target >= 1000000) {
    return (count / 1000000).toFixed(count < target ? 1 : 0) + 'M';
  }
  return count.toLocaleString();
}
