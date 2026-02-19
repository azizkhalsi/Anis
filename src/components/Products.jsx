import { useState, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const PRODUCTS = [
  {
    id: 'dmk',
    name: 'DMK',
    tagline: 'Drive Measurement Kit',
    badge: 'Flagship Product',
    badgeClass: 'product-badge-flagship',
    hero: 'One instrument. Replaces your entire motor test bench.',
    description: [
      'The DMK is a compact and powerful measurement solution designed for inverter-driven motors. It precisely measures phase currents and PWM-voltages and perfectly synchronizes them to the rotor position, providing real-time visualization and data storage.',
      'With its integrated functionalities, DMK simplifies motor analysis, making it an essential tool for development, benchmarking and endurance tests. It replaces oscilloscope, current probes, data logger, and PWM monitoring equipment — saving cost, space, and engineering effort.',
    ],
    highlights: [
      { icon: 'scope', label: 'Replaces Oscilloscope', detail: '+ 3 current probes' },
      { icon: 'log', label: 'Data Logger', detail: 'Long-term recording' },
      { icon: 'pwm', label: 'PWM Monitor', detail: 'Typically $50k+ equipment' },
      { icon: 'rotor', label: 'Rotor Position', detail: 'Real-time measurement' },
    ],
    tags: ['Real-Time', 'Portable', 'USB-C', 'WiFi', 'Ethernet', 'Galvanic Isolation'],
  },
  {
    id: 'lci',
    name: 'LCI',
    tagline: 'Low-Cost Inverter',
    badge: 'Hardware',
    badgeClass: 'product-badge-hardware',
    hero: 'Production-ready inverter. Designed for millions.',
    description: [
      'The LCI is a cost-optimized inverter platform designed for high-volume applications. It delivers reliable sensorless FOC performance in a compact form factor, enabling energy-efficient motor control where cost is a primary concern.',
      'Built for household appliances, power tools, e-bikes, and pumps, the LCI integrates proven motor control technology into affordable hardware. Its modular design allows easy adaptation to different motor types and power ratings.',
    ],
    highlights: [
      { icon: 'cost', label: 'Cost-Optimized', detail: 'High-volume ready' },
      { icon: 'motor', label: 'Sensorless FOC', detail: 'No encoder needed' },
      { icon: 'modular', label: 'Modular Design', detail: 'Adaptable platform' },
      { icon: 'compact', label: 'Compact', detail: 'Minimal footprint' },
    ],
    tags: ['PMSM', 'Sensorless FOC', 'Cost-Optimized', 'Household Appliances', 'Power Tools', 'E-Bikes'],
  },
  {
    id: 'amc',
    name: 'AMC',
    tagline: 'Appcon Motor Control',
    badge: 'Software',
    badgeClass: 'product-badge-software',
    hero: 'Plug-and-play motor control. Any motor. Any platform.',
    description: [
      'AMC is a comprehensive motor control software framework designed for seamless integration into automotive and industrial applications. Its AUTOSAR-inspired architecture ensures interoperability, maintainability, and validation compliance.',
      'The plug-and-play approach minimizes integration effort while the SiL-validated sensorless algorithms deliver robust performance across a wide range of motor types.',
    ],
    highlights: [
      { icon: 'auto', label: 'AUTOSAR-Inspired', detail: 'Industry standard' },
      { icon: 'plug', label: 'Plug & Play', detail: 'Minimal integration' },
      { icon: 'sil', label: 'SiL Validated', detail: 'Production-ready' },
      { icon: 'all', label: 'All Motors', detail: 'PMSM, BLDC, Induction' },
    ],
    tags: ['AUTOSAR-Inspired', 'Plug & Play', 'SiL Validated', 'FOC', 'DTC', 'HF Injection'],
  },
];

const DMK_SPECS = [
  { label: 'Power', value: 'USB-C', icon: '⚡' },
  { label: 'Battery', value: '4000mAh', icon: '🔋' },
  { label: 'Current', value: '1A–200A', icon: '〰️' },
  { label: 'Voltage', value: '400V Peak', icon: '⚡' },
  { label: 'PWM', value: '4–40kHz', icon: '📊' },
  { label: 'Encoder', value: 'A,B,Z / SPI', icon: '🔄' },
  { label: 'Isolation', value: '600V', icon: '🛡️' },
];

function DmkVisual() {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <div
      className="dmk-photo-visual"
      onMouseEnter={() => setShowSpecs(true)}
      onMouseLeave={() => setShowSpecs(false)}
    >
      <img
        src="/images/dmk-connections.png"
        alt="DMK-RT connected between inverter and motor"
        className="dmk-photo-img"
        loading="lazy"
      />
      <div className={`dmk-specs-overlay ${showSpecs ? 'visible' : ''}`}>
        <div className="dmk-specs-grid">
          {DMK_SPECS.map((spec) => (
            <div key={spec.label} className="dmk-spec-item">
              <span className="dmk-spec-value">{spec.value}</span>
              <span className="dmk-spec-label">{spec.label}</span>
            </div>
          ))}
        </div>
        <span className="dmk-specs-hint">Specifications</span>
      </div>
      {!showSpecs && (
        <span className="dmk-hover-hint">Hover for specs</span>
      )}
    </div>
  );
}

function AmcVisual() {
  return (
    <div className="amc-visual-wrapper">
      <img
        src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="AMC Motor Control — embedded software framework"
        className="amc-diagram-img"
        loading="lazy"
      />
    </div>
  );
}

function LciVisual() {
  return (
    <div className="lci-visual">
      <img
        src="https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="LCI Low-Cost Inverter — compact power electronics board"
        className="lci-pcb-img"
        loading="lazy"
      />
    </div>
  );
}

function HighlightIcon({ type }) {
  const icons = {
    scope: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    log: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    pwm: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    rotor: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    cost: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    motor: <><circle cx="12" cy="12" r="10" /><path d="M12 6v12M6 12h12" /></>,
    modular: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    compact: <><rect x="2" y="7" width="20" height="15" rx="2" /><path d="M17 2l-5 5-5-5" /></>,
    auto: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    plug: <><path d="M12 22V12M8 5v4M16 5v4M5 9h14v3a7 7 0 0 1-14 0V9z" /></>,
    sil: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    all: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

const VISUALS = { dmk: DmkVisual, lci: LciVisual, amc: AmcVisual };

export default function Products() {
  const [active, setActive] = useState('dmk');
  const navRef = useRef(null);
  const navVisible = useScrollAnimation(navRef);
  const product = PRODUCTS.find((p) => p.id === active);
  const Visual = VISUALS[active];

  return (
    <section className="products" id="products">
      <div className="container">
        <div className={`product-nav ${navVisible ? 'visible' : ''}`} ref={navRef} data-animate="fade-up">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`product-nav-btn ${active === p.id ? 'active' : ''}`}
              onClick={() => setActive(p.id)}
            >
              <span className="product-nav-name">{p.name}</span>
              <span className="product-nav-tagline">{p.tagline}</span>
            </button>
          ))}
        </div>

        <div className="product-showcase-v2" key={product.id}>
          <div className="product-showcase-top">
            <div className="product-showcase-info">
              <span className={`product-badge ${product.badgeClass}`}>{product.badge}</span>
              <h3 className="product-showcase-name">{product.name}</h3>
              <p className="product-showcase-tagline">{product.tagline}</p>
              <p className="product-showcase-hero">{product.hero}</p>
            </div>
            <div className="product-showcase-visual">
              <Visual />
            </div>
          </div>

          <div className="product-highlights">
            {product.highlights.map((h) => (
              <div className="product-highlight-card" key={h.label}>
                <div className="product-highlight-icon">
                  <HighlightIcon type={h.icon} />
                </div>
                <strong>{h.label}</strong>
                <span>{h.detail}</span>
              </div>
            ))}
          </div>

          <div className="product-showcase-body">
            <div className="product-showcase-desc">
              {product.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="product-tags">
            {product.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
