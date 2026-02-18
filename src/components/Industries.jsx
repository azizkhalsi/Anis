import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const INDUSTRIES_DATA = [
  {
    id: 1,
    title: 'White Goods',
    image: '/industry-whitegood.png',
    description: 'Energy-efficient motor solutions for refrigerators, washing machines, dishwashers, and air conditioning units. Our sensorless control technology reduces energy consumption while maintaining quiet operation and reliability in household appliances.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M6 18h36" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="24" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <rect x="28" y="24" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Power Tools',
    image: '/industry-powertool.png',
    description: 'High-performance, brushless motor control for cordless drills, angle grinders, and professional power tools. Optimized for torque response, efficiency, and long battery life in demanding applications.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L28 14h8l-6 6 2 8-8-4-8 4 2-8-6-6h8l4-8z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M24 20v20M20 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Automotive',
    image: '/industry-automotive.png',
    description: 'Automotive-grade motor control for pumps, fans, wipers, and comfort systems. Our solutions meet stringent quality and safety requirements, with AUTOSAR-compatible software for seamless vehicle integration.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32l4-12h24l4 12" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="14" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="34" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M18 34h12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'E-Mobility',
    image: '/industry-emobility.png',
    description: 'E-bike, e-scooter, and electric vehicle traction motor solutions. Scalable sensorless FOC for efficient propulsion, regenerative braking, and smooth torque delivery across the full speed range.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="36" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M12 30h12l8-14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const STAGGER_DELAYS = [0, 100, 200, 300];

export default function Industries() {
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const visible0 = useScrollAnimation(refs[0], { delay: STAGGER_DELAYS[0] });
  const visible1 = useScrollAnimation(refs[1], { delay: STAGGER_DELAYS[1] });
  const visible2 = useScrollAnimation(refs[2], { delay: STAGGER_DELAYS[2] });
  const visible3 = useScrollAnimation(refs[3], { delay: STAGGER_DELAYS[3] });
  const visibles = [visible0, visible1, visible2, visible3];

  return (
    <section className="industries" id="industries">
      <div className="container">
        <div className="industries-grid">
          {INDUSTRIES_DATA.map((industry, index) => (
            <div
              key={industry.id}
              ref={refs[index]}
              className={`industry-card ${visibles[index] ? 'visible' : ''}`}
              data-animate="fade-up"
            >
              <div className="industry-card-image">
                <img src={industry.image} alt={industry.title} />
              </div>
              <div className="industry-card-body">
                <div className="industry-icon">{industry.icon}</div>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
