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

export default function FloatingShowcase() {
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    const getRandomImages = () => {
      const count = Math.floor(Math.random() * 2) + 2;
      const indices = [];
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * SHOWCASE_IMAGES.length);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    };

    setVisibleImages(getRandomImages());
    const interval = setInterval(() => {
      setVisibleImages(getRandomImages());
    }, 2500 + Math.random() * 2000);

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
