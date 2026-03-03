import { useState, useEffect } from 'react';

/** Two hero images on the left: office/lab workspace + lab equipment (ProScan). */
const SHOWCASE_IMAGES = [
  { src: '/images/hero-floating-1.png', alt: 'Engineering lab and workspace', position: 'center-left' },
  { src: '/images/hero-floating-2.png', alt: 'Lab equipment and test bench', position: 'center-left' },
];

/** One visible at a time on the left — alternate for appear/disappear. */
const IMAGE_PAIRS = [[0], [1]];
const PAIR_INTERVAL_MS = 5500;

export default function FloatingShowcase() {
  const [pairIndex, setPairIndex] = useState(0);
  const visibleImages = IMAGE_PAIRS[pairIndex] ?? IMAGE_PAIRS[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setPairIndex((prev) => (prev + 1) % IMAGE_PAIRS.length);
    }, PAIR_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-showcase" aria-hidden="true">
      {SHOWCASE_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`floating-image floating-image--${img.position}${visibleImages.includes(index) ? ' floating-image--visible' : ''}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            width="200"
            height="150"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
