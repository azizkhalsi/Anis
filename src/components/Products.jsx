import { useState, useRef, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import OscilloscopeDisplay from './OscilloscopeDisplay';

export const PRODUCTS = [
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
      'Appcon Technologies is a leading inverter design house, offering cost-optimized solutions for Permanent Magnet Synchronous Motors (PMSM). Our robust, sensorless Field-Oriented Control (FOC) software and flexible inverter templates deliver exceptional performance and significant cost savings.',
      'We transform motors into intelligent units, reducing the need for additional sensors and further optimizing your system costs. Adaptable and scalable, our designs are ideal for household appliances, power tools, pumps, e-bikes, and any application needing efficient, cost-sensitive PMSM solutions. Partner with Appcon for accelerated development and reliable mass production.',
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
      'Appcon Motor Control (AMC) is a software-only control solution that saves the cost of a position sensor for any drive control application without compromising performance compared to sensored FOC. When AMC is integrated into drive software, it handles motor control and replaces the position sensor by calculating both motor speed and position.',
      'AMC is a plug-and-play solution that developers can seamlessly integrate into any drive software without requiring extensive knowledge in motor control.',
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

const DMK_FEATURE_BLOCKS = [
  {
    title: 'Power electronic testing',
    body: 'The unique PWM decoding for high-frequency, high-resolution signals beyond typical instrument capabilities. Its advanced voltage measurement decodes PWM in real time, revealing the exact inverter voltages as the motor experiences them. Without common filtering, any inverter malfunction is easily detected rather than masked.',
  },
  {
    title: 'Development engineers in motor control',
    body: 'As a compact, multifunctional measurement instrument that replaces multiple separate devices. They connect DMK to their motor/inverter system to gather analog signals and key motor-control variables for scope and visualize in real time with the DMK PC-Software. Access internal state variables of both the motor and the inverter directly. Record and store data for extended analysis.',
  },
  {
    title: 'Long-time tests',
    body: 'Measure and log all motor and inverter state variables over an extended period. Identify anomalies or performance degradation that might occur only after hours, days, or weeks of continuous operation. Automated data analysis on the extensive datasets provided by the DMK helps uncover hidden or statistically rare problems that are difficult for humans to detect.',
  },
  {
    title: 'Benchmarking reverse engineering',
    body: 'Analyze third-party or competitor drive systems with minimal setup, tapping directly into motor and inverter signals. DMK gathers precise data for fair performance comparisons—efficiency, accuracy, control strategy—and provides actionable insights to optimize designs, inform purchases, and guide partnerships.',
  },
];

const DMK_HMI_VISUALISATION_SRC = '/hmi/dmk-hmi-visualisation.png';
const DMK_HMI_CALIBRATION_SRC = '/hmi/dmk-hmi-calibration.png';
const DMK_REAL_MODEL_SRC = '/images/dmk-real-model.png';

const LCI_PCB_SRC = '/images/lci-pcb.png';

/* AMC content from appcontech.de/amc – used for AMC sub-section */
const AMC_BENEFITS = [
  {
    title: 'Easy integration in existing drive software',
    body: 'Clear interface definitions inspired by the AUTOSAR standard.',
  },
  {
    title: 'Optimization and version upgrades independent of the application',
    body: 'Validation via Software-in-the-Loop and with advanced evaluation boards.',
  },
  {
    title: 'One control software for all motors and inverters',
    body: 'Easy hardware migration and configuration for new motors.',
  },
  {
    title: 'Maximum flexibility for the application software',
    body: 'Easy and secure development of drive applications using AMC as the motor driver.',
  },
];

const AMC_MOTOR_CONTROL_ITEMS = [
  'Scalable across all power ranges',
  'Maximum torque and dynamics from standstill to >100k RPM',
  'Automatic motor identification and controller parameter configuration',
  'Advanced features including battery current limitation',
];

const AMC_SENSORLESS_ITEMS = [
  'No motor parameters needed for position estimation: the motor acts as the sensor',
  'Full torque at standstill and low speeds',
  'No additional hardware required',
  'Superior performance compared to position sensors at high speeds, with smooth and accurate speed and position information',
];

const AMC_IMG_INTEGRATION = '/images/amc/amc-integration-hardware.png';
const AMC_IMG_SENSORLESS_DIAGRAM = '/images/amc/amc-sensorless-diagram.png';

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
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, 50vw"
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
      <div className="amc-visual-frame">
        <img
          src={AMC_IMG_INTEGRATION}
          alt="AMC integration: Application and AMC interface with hardware — PCBs and motors"
          className="amc-diagram-img"
          width="800"
          height="450"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

function LciVisual() {
  return (
    <div className="lci-visual lci-visual--no-bg">
      <img
        src={LCI_PCB_SRC}
        alt="LCI Low-Cost Inverter — circular PCB"
        className="lci-pcb-img"
        width="600"
        height="600"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function DmkPcSoftwareScene() {
  const [screenOpen, setScreenOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('visualisation');

  return (
    <div className="dmk-pc-scene">
      <div className="dmk-pc-scene-desk dmk-pc-scene-desk--hub">
        <div className="dmk-pc-scene-desk-row dmk-pc-scene-desk-row--1">
        <div className="dmk-pc-scene-peripheral dmk-pc-scene-peripheral--pc">
          <div className="dmk-pc-scene-pc">
            <div className="dmk-pc-scene-pc-bezel">
              <div className={`dmk-pc-scene-screen ${screenOpen ? 'open' : ''}`}>
                {!screenOpen ? (
                  <div className="dmk-pc-scene-desktop">
                    <span className="dmk-pc-scene-desktop-label">Desktop</span>
                    <button
                      type="button"
                      className="dmk-pc-scene-dmk-icon"
                      onClick={() => setScreenOpen(true)}
                      aria-label="Open DMK software"
                    >
                      <span className="dmk-pc-scene-dmk-icon-symbol">DMK</span>
                      <span className="dmk-pc-scene-dmk-icon-name">DMK</span>
                    </button>
                  </div>
                ) : (
                  <div className="dmk-pc-scene-interface">
                    <div className="dmk-pc-scene-interface-header">
                      <button
                        type="button"
                        className="dmk-pc-scene-interface-back"
                        onClick={() => setScreenOpen(false)}
                        aria-label="Back to desktop"
                      >
                        ← Back
                      </button>
                      <div className="dmk-pc-scene-interface-tabs">
                        <button
                          type="button"
                          className={`dmk-pc-scene-tab ${activeTab === 'visualisation' ? 'active' : ''}`}
                          onClick={() => setActiveTab('visualisation')}
                        >
                          Visualisation
                        </button>
                        <button
                          type="button"
                          className={`dmk-pc-scene-tab ${activeTab === 'calibration' ? 'active' : ''}`}
                          onClick={() => setActiveTab('calibration')}
                        >
                          Oscilloscope & calibration
                        </button>
                      </div>
                    </div>
                    <div className="dmk-pc-scene-interface-content">
                      {activeTab === 'visualisation' && (
                        <div className="dmk-pc-scene-interface-pane dmk-pc-scene-interface-pane--visualisation">
                          <img
                            src={DMK_HMI_VISUALISATION_SRC}
                            alt="DMK visualisation interface"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {activeTab === 'calibration' && (
                        <div className="dmk-pc-scene-interface-pane dmk-pc-scene-interface-pane--calibration">
                          <img
                            src={DMK_HMI_CALIBRATION_SRC}
                            alt="DMK oscilloscope and sensor calibration"
                            loading="lazy"
                            className="dmk-pc-scene-calibration-img"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="dmk-pc-scene-pc-stand" />
            <div className="dmk-pc-scene-pc-base" />
          </div>
          <div className="dmk-pc-scene-cable-wrap dmk-pc-scene-cable-wrap--to-hub">
            <svg className="dmk-pc-scene-cable" viewBox="0 0 80 32" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path className="dmk-pc-scene-cable-line" d="M 2 16 C 38 16 42 8 40 16 C 38 24 42 24 78 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="dmk-pc-scene-hub">
          <div className="dmk-pc-scene-device dmk-pc-scene-device--model3d dmk-pc-scene-device--hub">
            <div className="dmk-pc-scene-device-inner">
              <img src={DMK_REAL_MODEL_SRC} alt="DMK device" className="dmk-pc-scene-device-img" loading="lazy" />
            </div>
          </div>
        </div>

        <div className="dmk-pc-scene-peripheral dmk-pc-scene-peripheral--scope">
          <div className="dmk-pc-scene-cable-wrap dmk-pc-scene-cable-wrap--to-hub">
            <svg className="dmk-pc-scene-cable" viewBox="0 0 80 32" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path className="dmk-pc-scene-cable-line" d="M 2 16 C 38 16 42 8 40 16 C 38 24 42 24 78 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="dmk-pc-scene-oscilloscope">
            <div className="dmk-pc-scene-oscilloscope-frame">
              <OscilloscopeDisplay />
            </div>
          </div>
        </div>
        </div>

      <div className="dmk-pc-scene-cable-wrap dmk-pc-scene-cable-wrap--to-hub dmk-pc-scene-cable-wrap--vertical dmk-pc-scene-cable-wrap--hub-usb">
        <svg className="dmk-pc-scene-cable" viewBox="0 0 32 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path className="dmk-pc-scene-cable-line" d="M 16 2 C 16 28 10 32 16 58" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="dmk-pc-scene-desk-row dmk-pc-scene-desk-row--usb">
        <div className="dmk-pc-scene-peripheral dmk-pc-scene-peripheral--usb">
          <div className="dmk-pc-scene-usb">
            <div className="dmk-pc-scene-usb-inner">
              <div className="dmk-pc-scene-usb-slot" aria-hidden="true" />
              <span className="dmk-pc-scene-usb-label">USB</span>
            </div>
          </div>
        </div>
      </div>
      </div>
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

export default function Products({ initialProduct = 'dmk', singleMode = false }) {
  const [active, setActive] = useState(initialProduct);
  const navRef = useRef(null);
  const featureBlocksRef = useRef(null);
  const hmiSectionRef = useRef(null);
  const demoEmbedRef = useRef(null);
  const amcBenefitsRef = useRef(null);
  const amcGameChangerRef = useRef(null);
  const amcSensorlessRef = useRef(null);
  const navVisible = useScrollAnimation(navRef);
  const featureBlocksVisible = useScrollAnimation(featureBlocksRef, { threshold: 0.08 });
  const hmiVisible = useScrollAnimation(hmiSectionRef, { threshold: 0.08 });
  const demoEmbedVisible = useScrollAnimation(demoEmbedRef, { threshold: 0.08 });
  const amcBenefitsVisible = useScrollAnimation(amcBenefitsRef, { threshold: 0.08 });
  const amcGameChangerVisible = useScrollAnimation(amcGameChangerRef, { threshold: 0.08 });
  const amcSensorlessVisible = useScrollAnimation(amcSensorlessRef, { threshold: 0.08 });
  const product = PRODUCTS.find((p) => p.id === active);
  const Visual = VISUALS[active];

  useEffect(() => {
    if (initialProduct && PRODUCTS.some((p) => p.id === initialProduct)) {
      setActive(initialProduct);
    }
  }, [initialProduct]);

  return (
    <section className={`products ${singleMode ? 'products--single' : ''}`} id="products">
      <div className="container">
        {!singleMode && (
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
        )}

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

          {active === 'dmk' && (
            <>
              <div
                className={`dmk-feature-blocks ${featureBlocksVisible ? 'visible' : ''}`}
                ref={featureBlocksRef}
                data-animate="fade-up"
              >
                <h4 className="dmk-feature-blocks-title">Where DMK fits</h4>
                <div className="dmk-feature-blocks-grid">
                  {DMK_FEATURE_BLOCKS.map((block, i) => (
                    <div key={i} className="dmk-feature-block">
                      <h5 className="dmk-feature-block-title">{block.title}</h5>
                      <p className="dmk-feature-block-body">{block.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`dmk-hmi-section ${hmiVisible ? 'visible' : ''}`}
                ref={hmiSectionRef}
                data-animate="fade-up"
              >
                <h4 className="dmk-hmi-title">External connections</h4>
                <DmkPcSoftwareScene />
              </div>

              <div
                className={`dmk-demo-embed-section ${demoEmbedVisible ? 'visible' : ''}`}
                ref={demoEmbedRef}
                data-animate="fade-up"
              >
                <div className="dmk-demo-embed-head">
                  <h4 className="dmk-demo-embed-title">One instrument at the centre of your test bench</h4>
                  <p className="dmk-demo-embed-intro">
                    The DMK connects directly to your PC for live visualisation, to an oscilloscope via analog outputs, and to USB storage for long-term recording. Real-time measurement and analysis from a single compact unit.
                  </p>
                </div>
                <div className="dmk-demo-embed-content">
                  <ul className="dmk-demo-embed-list">
                    <li><strong>PC software</strong> — Configure the device, view live waveforms, and run analysis from your laptop or desktop.</li>
                    <li><strong>Oscilloscope</strong> — Use the analog outputs to monitor signals on any scope; no need for a separate PC during testing.</li>
                    <li><strong>USB storage</strong> — Record hours of data to an external SSD (up to 2TB) for later offline analysis.</li>
                    <li><strong>Ethernet / WiFi</strong> — Remote access and streaming for integration into automated test rigs.</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {active === 'amc' && (
            <>
              <div
                className={`amc-benefits-section ${amcBenefitsVisible ? 'visible' : ''}`}
                ref={amcBenefitsRef}
                data-animate="fade-up"
              >
                <h4 className="amc-section-title">Why AMC</h4>
                <div className="amc-benefits-grid">
                  {AMC_BENEFITS.map((item, i) => (
                    <div key={i} className="amc-benefit-card" style={{ transitionDelay: `${i * 80}ms` }}>
                      <span className="amc-benefit-number">0{i + 1}</span>
                      <h5 className="amc-benefit-title">{item.title}</h5>
                      <p className="amc-benefit-body">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`amc-gamechanger-section ${amcGameChangerVisible ? 'visible' : ''}`}
                ref={amcGameChangerRef}
                data-animate="fade-up"
              >
                <h3 className="amc-gamechanger-headline">
                  A game-changing solution for <em>sensorless</em> control of PMSM motor control
                </h3>
                <ul className="amc-gamechanger-list">
                  {AMC_MOTOR_CONTROL_ITEMS.map((text, i) => (
                    <li key={i} className="amc-gamechanger-item" style={{ transitionDelay: `${i * 60}ms` }}>
                      <span className="amc-gamechanger-dot" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`amc-sensorless-section ${amcSensorlessVisible ? 'visible' : ''}`}
                ref={amcSensorlessRef}
                data-animate="fade-up"
              >
                <h4 className="amc-section-title amc-section-title--sensorless">Sensorless algorithm</h4>
                <div className="amc-sensorless-diagram-wrap">
                  <img
                    src={AMC_IMG_SENSORLESS_DIAGRAM}
                    alt="AMC sensorless motor control block diagram: microcontroller, inverter, PMSM"
                    className="amc-sensorless-diagram-img"
                    loading="lazy"
                  />
                </div>
                <div className="amc-sensorless-cards">
                  {AMC_SENSORLESS_ITEMS.map((text, i) => (
                    <div key={i} className="amc-sensorless-card" style={{ transitionDelay: `${i * 70}ms` }}>
                      <span className="amc-sensorless-icon" aria-hidden>✓</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
