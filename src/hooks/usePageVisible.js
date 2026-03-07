import { useState, useEffect } from 'react';

/**
 * Returns true when the document/tab is visible to the user.
 * Updates on visibilitychange (e.g. tab switch, window minimize).
 * Use to pause animations when the page is not visible.
 */
export default function usePageVisible() {
  const [visible, setVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );

  useEffect(() => {
    setVisible(typeof document !== 'undefined' ? document.visibilityState === 'visible' : true);
    const handleChange = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleChange);
    return () => document.removeEventListener('visibilitychange', handleChange);
  }, []);

  return visible;
}
