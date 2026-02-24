import { useState, useEffect, useRef } from 'react';

export default function useCountUp(target, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  const lastDisplayedRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const start = performance.now();
    let updateCount = 0;
    lastDisplayedRef.current = 0;

    function update(now) {
      updateCount += 1;
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
      } else {
        fetch('http://127.0.0.1:7374/ingest/3b192536-1e54-4b21-8ca0-89e6554bb50d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'455fe2'},body:JSON.stringify({sessionId:'455fe2',location:'useCountUp.js:done',message:'countUp done',data:{target,duration,updateCount},hypothesisId:'H2',timestamp:Date.now()})}).catch(function(){});
      }
    }

    fetch('http://127.0.0.1:7374/ingest/3b192536-1e54-4b21-8ca0-89e6554bb50d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'455fe2'},body:JSON.stringify({sessionId:'455fe2',location:'useCountUp.js:start',message:'countUp start',data:{target,duration},hypothesisId:'H2',timestamp:Date.now()})}).catch(function(){});
    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, trigger]);

  if (target >= 1000000) {
    return (count / 1000000).toFixed(count < target ? 1 : 0) + 'M';
  }
  return count.toLocaleString();
}
