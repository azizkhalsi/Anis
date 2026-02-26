import { useState, useEffect } from 'react';

const SHOWCASE_IMAGES = [
  { 
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format', 
    alt: 'Industrial Electronics', 
    position: 'top-left' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format', 
    alt: 'Circuit Board Technology', 
    position: 'top-right' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', 
    alt: 'Electric Motor', 
    position: 'bottom-left' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&auto=format', 
    alt: 'Electronics Engineering', 
    position: 'bottom-right' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&h=300&fit=crop&auto=format', 
    alt: 'Microprocessor Technology', 
    position: 'center-left' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop&auto=format', 
    alt: 'Industrial Automation', 
    position: 'center-right' 
  },
];

/** Diagonal pairs (never same row): 2 on 2, cycling every 2s — feels varied, not aligned. */
const IMAGE_PAIRS = [
  [0, 3], // top-left + bottom-right
  [1, 2], // top-right + bottom-left
  [4, 1], // center-left + top-right
  [5, 2], // center-right + bottom-left
];
const PAIR_INTERVAL_MS = 2000;

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
