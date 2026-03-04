import { useState, useEffect } from 'react';

/** Lab images (right): motor test bench, Miniprint/LPKF, workstations, pick-and-place. */
const LAB_IMAGES = [
  { src: '/images/hero-labo-1.png', alt: 'Motor test bench and lab equipment' },
  { src: '/images/hero-labo-2.png', alt: 'Lab machinery and prototyping equipment' },
  { src: '/images/hero-labo-3.png', alt: 'Engineering lab workstations' },
  { src: '/images/hero-labo-4.png', alt: 'Pick-and-place and electronics assembly' },
];

/** Product images (left): motor+PCB, AMC ECU, PCB+motor, motor with integrated PCB. */
const PRODUCT_IMAGES = [
  { src: '/images/hero-product-1.png', alt: 'Motor and power electronics' },
  { src: '/images/hero-product-2.png', alt: 'APPCON motor control unit' },
  { src: '/images/hero-product-3.png', alt: 'PCB and motor assembly' },
  { src: '/images/hero-product-4.png', alt: 'Motor with integrated control' },
];

const SLIDE_INTERVAL_MS = 5500;

export default function FloatingShowcase() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Advance slide at start of frame to avoid jank
  useEffect(() => {
    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        setSlideIndex((prev) => (prev + 1) % LAB_IMAGES.length);
      });
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Preload next slide images so decode finishes before transition
  useEffect(() => {
    const next = (slideIndex + 1) % LAB_IMAGES.length;
    const labSrc = LAB_IMAGES[next].src;
    const productSrc = PRODUCT_IMAGES[next].src;
    const labImg = new Image();
    const productImg = new Image();
    labImg.src = labSrc;
    productImg.src = productSrc;
  }, [slideIndex]);

  return (
    <div className="floating-showcase" aria-hidden="true">
      {/* Right: lab images — one visible per slide */}
      {LAB_IMAGES.map((img, index) => (
        <div
          key={`lab-${index}`}
          className={`floating-image floating-image--center-right floating-image--lab${index === slideIndex ? ' floating-image--visible' : ''}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            width="320"
            height="240"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
      {/* Left: product images — one visible per slide, staggered via CSS delay */}
      {PRODUCT_IMAGES.map((img, index) => (
        <div
          key={`product-${index}`}
          className={`floating-image floating-image--center-left floating-image--product${index === slideIndex ? ' floating-image--visible' : ''}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            width="300"
            height="225"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
