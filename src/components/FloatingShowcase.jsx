import { useState, useEffect, useRef } from 'react';

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
  { src: '/images/hero-product-lci-circular.png', alt: 'APPCON LCI circular PCB unit' },
  { src: '/images/hero-product-3.png', alt: 'PCB and motor assembly' },
  { src: '/images/hero-product-4.png', alt: 'Motor with integrated control' },
];

const SLIDE_INTERVAL_MS = 4000;
const CROSSFADE_MS = 1600;

/**
 * A true crossfade image carousel. All images are stacked at the same position.
 * The active image has opacity 1; the previously-active image transitions out
 * simultaneously, creating a smooth dissolve.
 */
function CrossfadeStack({ images, activeIndex, className, side }) {
  const prevRef = useRef(activeIndex);
  const [prevIndex, setPrevIndex] = useState(activeIndex);

  useEffect(() => {
    // When activeIndex changes, store the old one as "previous" for crossfade overlap
    setPrevIndex(prevRef.current);
    prevRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <>
      {images.map((img, index) => {
        const isActive = index === activeIndex;
        const isPrev = index === prevIndex && prevIndex !== activeIndex;

        return (
          <div
            key={`${side}-${index}`}
            className={`floating-image ${className}`}
            style={{
              opacity: isActive ? 0.92 : isPrev ? 0 : 0,
              filter: isActive ? 'blur(0)' : 'blur(4px)',
              transform: isActive
                ? 'translateY(0) scale(1)'
                : 'translateY(0) scale(0.97)',
              transition: isActive
                ? `opacity ${CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${CROSSFADE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
                : `opacity ${CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${CROSSFADE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              pointerEvents: 'none',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              width={side === 'lab' ? '320' : '300'}
              height={side === 'lab' ? '240' : '225'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        );
      })}
    </>
  );
}

export default function FloatingShowcase() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Advance slide only when page is visible; pause when tab is hidden
  useEffect(() => {
    const intervalRef = { current: null };
    const schedule = () => {
      if (document.visibilityState === 'hidden') return;
      intervalRef.current = setInterval(() => {
        if (document.visibilityState === 'hidden') return;
        requestAnimationFrame(() => {
          setSlideIndex((prev) => (prev + 1) % LAB_IMAGES.length);
        });
      }, SLIDE_INTERVAL_MS);
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else {
        if (!intervalRef.current) schedule();
      }
    };
    schedule();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Preload next slide images so decode finishes before transition
  useEffect(() => {
    const next = (slideIndex + 1) % LAB_IMAGES.length;
    const labImg = new Image();
    const productImg = new Image();
    labImg.src = LAB_IMAGES[next].src;
    productImg.src = PRODUCT_IMAGES[next].src;
  }, [slideIndex]);

  return (
    <div className="floating-showcase" aria-hidden="true">
      {/* Right: lab images — true crossfade */}
      <CrossfadeStack
        images={LAB_IMAGES}
        activeIndex={slideIndex}
        className="floating-image--center-right floating-image--lab"
        side="lab"
      />
      {/* Left: product images — true crossfade with slight delay */}
      <CrossfadeStack
        images={PRODUCT_IMAGES}
        activeIndex={slideIndex}
        className="floating-image--center-left floating-image--product"
        side="product"
      />
    </div>
  );
}
