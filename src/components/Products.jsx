import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const DMK_USE_CASES = [
  {
    title: 'Power Electronic Testing',
    description: 'Validate inverter designs with precise phase current and PWM voltage measurements. DMK provides synchronized data capture for comprehensive power stage analysis and efficiency evaluation.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M16 22h16M16 28h12M16 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="16" r="3" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'Development Engineers',
    description: 'Accelerate motor control development with real-time visualization of currents, voltages, and rotor position. Debug and optimize your algorithms with perfectly synchronized measurement data.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8L40 18V34L24 44L8 34V18L24 8Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Long-Time Tests',
    description: 'Run endurance and reliability tests with continuous data logging. The portable DMK with integrated battery supports extended test runs without external power dependency.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M24 12v12l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Benchmarking',
    description: 'Compare motor performance across different configurations with consistent, repeatable measurements. DMK delivers standardized data capture for accurate benchmarking and competitive analysis.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 36V20l8 8 8-12 8 8 8-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 38h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const DMK_SPECS = [
  { label: 'Power Supply', value: 'USB-C' },
  { label: 'Battery', value: '4000mAh' },
  { label: 'Max Current', value: '15A (configurable 1A – 200A)' },
  { label: 'Max Voltage', value: '400V Peak (configurable 20V – 400V)' },
  { label: 'PWM Frequency', value: 'Up to 20kHz (configurable 4 – 40kHz)' },
  { label: 'Encoder Type', value: 'Incremental A,B,Z (SPI, AB2 configurable)' },
  { label: 'Isolation', value: '600V' },
];

export default function Products() {
  const dmkRef = useRef(null);
  const useCasesRef = useRef(null);
  const specsRef = useRef(null);
  const lciRef = useRef(null);
  const amcRef = useRef(null);

  const dmkVisible = useScrollAnimation(dmkRef, { delay: 100 });
  const useCasesVisible = useScrollAnimation(useCasesRef, { delay: 100 });
  const specsVisible = useScrollAnimation(specsRef, { delay: 100 });
  const lciVisible = useScrollAnimation(lciRef, { delay: 150 });
  const amcVisible = useScrollAnimation(amcRef, { delay: 200 });

  return (
    <section className="products" id="products">
      <div className="container">

        {/* DMK Showcase */}
        <div className={`products-dmk ${dmkVisible ? 'visible' : ''}`} ref={dmkRef} data-animate="fade-up">
          <span className="product-badge product-badge-flagship">Flagship Product</span>
          <h3 className="products-dmk-name">DMK</h3>
          <p className="products-dmk-tagline">Drive Measurement Kit</p>
          <div className="products-dmk-image">
            <img src="/product-dmk.png" alt="DMK - Drive Measurement Kit" />
          </div>
          <div className="products-dmk-desc">
            <p>
              The DMK is a compact and powerful measurement solution designed for inverter-driven motors. It precisely measures phase currents and PWM-voltages and perfectly synchronizes them to the rotor position, providing real-time visualization and data storage.
            </p>
            <p>
              With its integrated functionalities, DMK simplifies motor analysis, making it an essential tool for development, benchmarking and endurance tests. Beyond its core capabilities, the DMK replaces multiple laboratory instruments — saving cost and space while delivering measurement results specifically tailored to motor control applications.
            </p>
          </div>

          <div className="products-use-cases" ref={useCasesRef}>
            {DMK_USE_CASES.map((useCase, index) => (
              <div
                key={useCase.title}
                className={`use-case-card ${useCasesVisible ? 'visible' : ''}`}
                data-animate="fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="use-case-icon">{useCase.icon}</div>
                <h4>{useCase.title}</h4>
                <p>{useCase.description}</p>
              </div>
            ))}
          </div>

          <div className={`products-specs ${specsVisible ? 'visible' : ''}`} ref={specsRef} data-animate="fade-up">
            <h4 className="specs-title">Specifications</h4>
            <table className="specs-table">
              <tbody>
                {DMK_SPECS.map((spec) => (
                  <tr key={spec.label}>
                    <td className="spec-label">{spec.label}</td>
                    <td className="spec-value">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LCI and AMC Cards */}
        <div className="products-cards-grid">
          <div className={`product-card ${lciVisible ? 'visible' : ''}`} ref={lciRef} data-animate="fade-up">
            <span className="product-badge product-badge-hardware">Hardware</span>
            <h3 className="product-card-name">LCI</h3>
            <p className="product-card-subtitle">Low-Cost Inverter</p>
            <div className="product-card-image">
              <img src="/product-lci.png" alt="LCI - Low-Cost Inverter" />
            </div>
            <p className="product-card-desc">
              The LCI is a cost-optimized inverter platform designed for high-volume applications. It delivers reliable sensorless FOC performance in a compact form factor, enabling energy-efficient motor control where cost is a primary concern.
            </p>
            <p className="product-card-desc">
              Built for household appliances, power tools, e-bikes, and pumps, the LCI integrates proven motor control technology into affordable hardware. Its modular design allows easy adaptation to different motor types and power ratings.
            </p>
            <div className="product-tags">
              <span>PMSM</span>
              <span>Sensorless FOC</span>
              <span>Cost-Optimized</span>
              <span>Household Appliances</span>
              <span>Power Tools</span>
              <span>E-Bikes</span>
              <span>Pumps</span>
            </div>
          </div>

          <div className={`product-card ${amcVisible ? 'visible' : ''}`} ref={amcRef} data-animate="fade-up">
            <span className="product-badge product-badge-software">Software</span>
            <h3 className="product-card-name">AMC</h3>
            <p className="product-card-subtitle">Appcon Motor Control</p>
            <div className="product-card-image">
              <img src="/product-amc.png" alt="AMC - Appcon Motor Control" />
            </div>
            <p className="product-card-desc">
              AMC is a comprehensive motor control software framework designed for seamless integration into automotive and industrial applications. Its AUTOSAR-inspired architecture ensures interoperability, maintainability, and validation compliance.
            </p>
            <p className="product-card-desc">
              The plug-and-play approach minimizes integration effort while the SiL-validated sensorless algorithms deliver robust performance across a wide range of motor types. AMC supports all common motor topologies and is ready for production deployment.
            </p>
            <div className="product-features-grid">
              <div className="product-feature-col">
                <h5>Motor Control</h5>
                <ul>
                  <li>Field-Oriented Control (FOC)</li>
                  <li>Direct Torque Control (DTC)</li>
                  <li>MTPA / Flux Weakening</li>
                  <li>Multi-motor support</li>
                </ul>
              </div>
              <div className="product-feature-col">
                <h5>Sensorless Algorithm</h5>
                <ul>
                  <li>High-frequency injection</li>
                  <li>Back-EMF observers</li>
                  <li>Startup & low-speed</li>
                  <li>Full speed range</li>
                </ul>
              </div>
            </div>
            <div className="product-tags">
              <span>AUTOSAR-Inspired</span>
              <span>Plug & Play</span>
              <span>SiL Validated</span>
              <span>All Motors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
