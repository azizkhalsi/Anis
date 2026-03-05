import { useState, useEffect } from 'react';

/**
 * @param {React.RefObject<Element>} ref - element to observe
 * @param {{ threshold?: number, rootMargin?: string, delay?: number, observeKey?: string }} options
 *   - observeKey: when this changes (e.g. route/product/topic), the effect re-runs so the observer
 *     attaches to the new node. Use when the ref is used for conditionally rendered content so
 *     client-side navigation shows elements without needing a refresh.
 */
export default function useScrollAnimation(ref, { threshold = 0.1, rootMargin = '0px 0px -80px 0px', delay = 0, observeKey = null } = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, delay, observeKey]);

  return isVisible;
}
