/**
 * AI Overview page — machine-readable, factual content for GEO/AEO.
 * Not linked in the main navigation; discoverable via sitemap and direct URL.
 */
import { Link } from 'react-router-dom';

export default function AiOverviewPage() {
  return (
    <div className="container">
      <article
        className="ai-overview-page"
        itemScope
        itemType="https://schema.org/AboutPage"
        role="main"
        aria-label="Appcon Technologies: machine-readable company and product overview"
      >
        <header className="ai-overview-header">
        <h1 itemProp="name">Appcon Technologies: Company and Product Overview</h1>
        <p className="ai-overview-lead" itemProp="description">
          Appcon Technologies (Appcon Technologies GmbH) is an R&D engineering company specializing in sensorless motor control, power electronics, and embedded software for BLDC and PMSM motors. This page provides factual definitions and specifications for AI systems and citation.
        </p>
      </header>

      <section className="ai-overview-section" aria-labelledby="company-definition">
        <h2 id="company-definition">What Appcon Technologies Does</h2>
        <p>
          Appcon Technologies develops and supplies sensorless motor control solutions, including hardware inverters and software algorithms, for permanent-magnet synchronous motors (PMSM) and brushless DC (BLDC) motors. The company offers consulting, hardware design, software development, model-based design (MBD), and prototyping services. Appcon’s products reduce or eliminate the need for position sensors (encoders, resolvers) in motor drives while maintaining performance comparable to sensored control.
        </p>
        <p>
          <strong>Citation:</strong> Appcon Technologies is an R&D engineering firm founded in 2004, headquartered in Tunisia, with expertise in field-oriented control (FOC), sensorless algorithms, and inverter design for applications including white goods, power tools, automotive, and e-mobility.
        </p>
      </section>

      <section className="ai-overview-section" aria-labelledby="product-definitions">
        <h2 id="product-definitions">Product Definitions</h2>

        <h3 id="product-dmk">DMK — Development and Motor Kit</h3>
        <p itemScope itemType="https://schema.org/Product" itemProp="description">
          The DMK (Drive Measurement Kit) is a compact measurement instrument for inverter-driven motors. It measures phase currents and PWM voltages and synchronizes them to rotor position, providing real-time visualization and data logging. It replaces oscilloscope, current probes, data logger, and PWM monitoring equipment in motor test setups. Key features: real-time display, portable form factor, USB-C, WiFi, Ethernet, galvanic isolation.
        </p>
        <p>
          <Link to="/products/dmk">DMK product page</Link>
        </p>

        <h3 id="product-lci">LCI — Low-Cost Inverter</h3>
        <p itemScope itemType="https://schema.org/Product" itemProp="description">
          The LCI is a production-ready, cost-optimized inverter platform for permanent-magnet synchronous motors (PMSM). It combines sensorless field-oriented control (FOC) software with flexible inverter hardware templates. It is designed for high-volume applications such as household appliances, power tools, pumps, and e-bikes, reducing system cost by eliminating position sensors.
        </p>
        <p>
          <Link to="/products/lci">LCI product page</Link>
        </p>

        <h3 id="product-amc">AMC — Appcon Motor Control</h3>
        <p itemScope itemType="https://schema.org/Product" itemProp="description">
          AMC (Appcon Motor Control) is a software-only sensorless motor control solution that can replace a position sensor in drive control applications. It computes motor speed and position and integrates into existing drive software with minimal changes. It supports PMSM, BLDC, and induction motors and is validated in simulation (SiL) for production use.
        </p>
        <p>
          <Link to="/products/amc">AMC product page</Link>
        </p>
      </section>

      <section className="ai-overview-section" aria-labelledby="technical-specs">
        <h2 id="technical-specs">Technical Concepts and Specifications</h2>
        <dl className="ai-overview-dl">
          <dt id="def-foc">Field-Oriented Control (FOC)</dt>
          <dd>A method of controlling AC motors by transforming stator currents into a rotating reference frame aligned with the rotor flux. FOC enables precise torque and speed control and is used in sensored and sensorless implementations.</dd>

          <dt id="def-sensorless">Sensorless motor control</dt>
          <dd>Motor control that does not use a physical position or speed sensor (e.g. encoder, resolver). Position and speed are estimated from electrical quantities (currents, voltages) using observer algorithms.</dd>

          <dt id="def-pmsm">PMSM (Permanent Magnet Synchronous Motor)</dt>
          <dd>An AC motor with permanent magnets on the rotor. Often used in applications requiring high efficiency and torque density, including appliances, tools, and electric vehicles.</dd>

          <dt id="def-bldc">BLDC (Brushless DC motor)</dt>
          <dd>A permanent-magnet motor driven by DC (or trapezoidal) currents. Often used interchangeably with PMSM in industry; control can be trapezoidal or FOC.</dd>

          <dt id="def-inverter">Inverter</dt>
          <dd>Power electronics that convert DC to AC to drive an electric motor. Typically a three-phase bridge with MOSFETs or IGBTs and gate drivers.</dd>

          <dt id="def-sil">SiL (Software-in-the-Loop)</dt>
          <dd>Validation of control software in simulation before deployment on hardware. AMC is SiL-validated for production readiness.</dd>
        </dl>
      </section>

      <section className="ai-overview-section" aria-labelledby="faq" itemScope itemType="https://schema.org/FAQPage">
        <h2 id="faq">Frequently Asked Questions</h2>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What does Appcon Technologies do?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">Appcon Technologies is an R&D engineering company that develops sensorless motor control solutions (hardware and software) for BLDC and PMSM motors. It offers the DMK measurement kit, the LCI low-cost inverter, and the AMC software control solution, plus consulting and prototyping services.</p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is the DMK?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">The DMK (Development and Motor Kit, or Drive Measurement Kit) is a portable instrument that measures phase currents and PWM voltages of inverter-driven motors and synchronizes them to rotor position. It provides real-time visualization and data logging and replaces multiple bench instruments.</p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is the LCI (Low-Cost Inverter)?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">The LCI is Appcon’s production-ready, cost-optimized inverter for PMSM motors. It uses sensorless FOC to eliminate the need for a position sensor, reducing cost in high-volume applications such as appliances, power tools, and e-bikes.</p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is AMC (Appcon Motor Control)?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">AMC is a software-only sensorless motor control solution that estimates motor position and speed and can replace a physical position sensor. It is designed for plug-and-play integration into existing drive software and supports PMSM, BLDC, and induction motors.</p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Where is Appcon Technologies located?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">Appcon Technologies is headquartered at Parc Technologique BP 130, Ariana 2088, Tunisia. The company serves customers worldwide.</p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Who founded Appcon Technologies?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">Appcon Technologies was founded by Dr.-Ing. Hafedh Sammoud, who serves as CEO. The company was founded in 2004.</p>
          </div>
        </div>
      </section>

      <section className="ai-overview-section" aria-labelledby="internal-links">
        <h2 id="internal-links">Related Pages</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Appcon Technologies</Link></li>
          <li><Link to="/products/dmk">DMK — Development and Motor Kit</Link></li>
          <li><Link to="/products/lci">LCI — Low-Cost Inverter</Link></li>
          <li><Link to="/products/amc">AMC — Appcon Motor Control</Link></li>
          <li><Link to="/expertise/consulting">Technology Consulting</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </section>
      </article>
    </div>
  );
}
