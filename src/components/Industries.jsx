import { useState, useRef, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

export const INDUSTRIES_DATA = [
  {
    id: 'whitegood',
    title: 'White Goods',
    subtitle: 'Household Appliances',
    description: 'Energy-efficient motor solutions for refrigerators, washing machines, dishwashers, and air conditioning units. Our sensorless control technology reduces energy consumption while maintaining quiet operation and reliability.',
    features: ['Refrigerator compressors', 'Washing machine drums', 'Dishwasher pumps', 'AC fan motors'],
    stat: '40%',
    statLabel: 'energy savings',
    color: '#2b6bc4',
    image: 'https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Modern household washing machine representing white goods industry',
  },
  {
    id: 'powertool',
    title: 'Power Tools',
    subtitle: 'Professional & Consumer',
    description: 'High-performance, brushless motor control for cordless drills, angle grinders, and professional power tools. Optimized for torque response, efficiency, and long battery life in demanding applications.',
    features: ['Cordless drills', 'Angle grinders', 'Circular saws', 'Impact drivers'],
    stat: '2x',
    statLabel: 'battery life',
    color: '#c42b2b',
    image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Professional power tools and cordless drills',
  },
  {
    id: 'automotive',
    title: 'Automotive',
    subtitle: 'Vehicle Systems',
    description: 'Automotive-grade motor control for pumps, fans, wipers, and comfort systems. Our solutions meet stringent quality and safety requirements, with AUTOSAR-compatible software for seamless vehicle integration.',
    features: ['Fuel & water pumps', 'Radiator fans', 'Wiper systems', 'Seat adjustment'],
    stat: '1M+',
    statLabel: 'units deployed',
    color: '#1a8a50',
    image: 'https://images.pexels.com/photos/3862634/pexels-photo-3862634.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Automotive production line with electronic vehicle systems',
  },
  {
    id: 'emobility',
    title: 'E-Mobility',
    subtitle: 'Electric Vehicles',
    description: 'E-bike, e-scooter, and electric vehicle traction motor solutions. Scalable sensorless FOC for efficient propulsion, regenerative braking, and smooth torque delivery across the full speed range.',
    features: ['E-bike hub motors', 'E-scooter drives', 'Light EV traction', 'Regen braking'],
    stat: '98%',
    statLabel: 'efficiency',
    color: '#b45309',
    image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Electric bicycle — e-mobility motor solutions',
  },
];

export default function Industries({ initialIndustry = 'whitegood', singleMode = false }) {
  const [active, setActive] = useState(initialIndustry);
  const ref = useRef(null);
  const visible = useScrollAnimation(ref);
  const industry = INDUSTRIES_DATA.find((i) => i.id === active);

  useEffect(() => {
    if (initialIndustry && INDUSTRIES_DATA.some((i) => i.id === initialIndustry)) {
      setActive(initialIndustry);
    }
  }, [initialIndustry]);

  return (
    <section className={`industries ${singleMode ? 'industries--single' : ''}`} id="industries">
      <div className="container">
        {!singleMode && (
          <div className={`industry-tabs ${visible ? 'visible' : ''}`} ref={ref} data-animate="fade-up">
            {INDUSTRIES_DATA.map((ind) => (
              <button
                key={ind.id}
                type="button"
                className={`industry-tab ${active === ind.id ? 'active' : ''}`}
                onClick={() => setActive(ind.id)}
                style={{ '--tab-color': ind.color }}
              >
                <span className="industry-tab-title">{ind.title}</span>
                <span className="industry-tab-sub">{ind.subtitle}</span>
              </button>
            ))}
          </div>
        )}

        <div className={`industry-showcase ${singleMode ? 'industry-showcase--single' : ''}`} key={industry.id}>
          <div className="industry-showcase-grid">
            <div className="industry-showcase-content">
              <div className="industry-showcase-stat" style={{ color: industry.color }}>
                <span className="industry-stat-number">{industry.stat}</span>
                <span className="industry-stat-label">{industry.statLabel}</span>
              </div>
              <h3 className="industry-showcase-title">{industry.title}</h3>
              <p className="industry-showcase-desc">{industry.description}</p>
              <div className="industry-features">
                {industry.features.map((f) => (
                  <div className="industry-feature" key={f} style={{ '--feat-color': industry.color }}>
                    <span className="industry-feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="industry-showcase-visual">
              <img
                src={industry.image}
                alt={industry.imageAlt}
                className="industry-showcase-img"
                loading="lazy"
              />
              <div className="industry-img-overlay" style={{ background: `linear-gradient(135deg, ${industry.color}15 0%, transparent 60%)` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
