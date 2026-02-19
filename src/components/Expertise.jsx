import { useState, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const TABS = [
  {
    id: 'consulting',
    label: 'Technology Consulting',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    content: (
      <>
        <h3>Technology Consulting</h3>
        <p>At Appcon Technologies, we offer comprehensive guidance and expert consultancy services to our clients in the field of motor control and power electronics. Our dedicated team of professionals leverages extensive expertise to provide strategic advice on technology adoption, implementation, and optimization.</p>
        <p>Whether you are navigating the complexities of motor control systems or seeking to enhance the efficiency of your power electronics, we offer tailored solutions to meet your specific needs. Partner with us for cutting-edge insights, innovative strategies, and a collaborative approach to elevate your technology initiatives in the dynamic realms of motor control and power electronics.</p>
        <ul className="expertise-list">
          <li>Strategic technology adoption guidance</li>
          <li>Implementation & optimization consulting</li>
          <li>Motor control system architecture</li>
          <li>Power electronics efficiency analysis</li>
        </ul>
      </>
    ),
    visualCard: (
      <div className="expertise-visual-card expertise-visual-animated">
        <div className="expertise-animated-bg" />
        <div className="expertise-visual-content">
          <div className="expertise-flow">
            <div className="expertise-flow-node">Requirements</div>
            <div className="expertise-flow-arrow">&#x2192;</div>
            <div className="expertise-flow-node accent">Analysis</div>
            <div className="expertise-flow-arrow">&#x2192;</div>
            <div className="expertise-flow-node">Strategy</div>
          </div>
          <div className="expertise-flow" style={{ marginTop: '12px' }}>
            <div className="expertise-flow-node">Strategy</div>
            <div className="expertise-flow-arrow">&#x2192;</div>
            <div className="expertise-flow-node accent">Optimization</div>
            <div className="expertise-flow-arrow">&#x2192;</div>
            <div className="expertise-flow-node">Delivery</div>
          </div>
        </div>
        <span>Expert Guidance</span>
      </div>
    ),
  },
  {
    id: 'hardware',
    label: 'Hardware Engineering',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
    content: (
      <>
        <h3>Hardware Engineering</h3>
        <p>Our hardware development team specializes in the meticulous design and development of motor control electronics, specifically inverters, to cater to the unique needs of our clients. Our process begins with clients providing their specific requirements, initiating a collaborative journey where we draw upon our extensive experience to design robust power electronics.</p>
        <p>With a wealth of expertise in handling complex power electronic designs, our team navigates the intricate details of layout and design with precision. We are well-versed in optimizing boards for both performance and cost-effectiveness, ensuring the delivery of efficient solutions.</p>
        <ul className="expertise-list">
          <li>Power electronic designs</li>
          <li>Component selection & microcontroller optimization</li>
          <li>PCB layout & multi-layer board design</li>
          <li>Prototyping & testing</li>
          <li>Product redesign for cost reduction & efficiency</li>
        </ul>
      </>
    ),
    visualCard: (
      <div className="expertise-visual-card expertise-visual-card--image">
        <img src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Close-up of a multi-layer PCB circuit board with components" className="expertise-visual-img" loading="lazy" />
        <span>PCB &amp; Circuit Design</span>
      </div>
    ),
  },
  {
    id: 'software',
    label: 'Software Development',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    content: (
      <>
        <h3>Software Development</h3>
        <p>Our team develops embedded software according to the specifications and the functionality needs provided by the customer. We deliver robust, real-time control solutions across multiple domains.</p>
        <ul className="expertise-list">
          <li>Real-Time Field Oriented Control Embedded Software (FOC, HF-Sensorless, BEMF-Sensorless)</li>
          <li>Test and Measurement Application Software</li>
          <li>Communication Software (UART, SPI, USB, Ethernet, …)</li>
          <li>Internet of Things (IoT)</li>
          <li>Instrumentation, Data Acquisition and Visualization</li>
        </ul>
      </>
    ),
    visualCard: (
      <div className="expertise-visual-card expertise-visual-card--image">
        <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Software development environment with embedded code on screen" className="expertise-visual-img" loading="lazy" />
        <span>Embedded Software</span>
      </div>
    ),
  },
  {
    id: 'mbd',
    label: 'Model-Based Design',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    content: (
      <>
        <h3>Model-Based Design</h3>
        <p>Automation of Model-Based Design processes like automatic code generation, model reusability, continuous testing, and documentation results in faster time to market and lower product cost.</p>
        <p>Our teams use Model-Based Design to provide you with a motor control solution that is tailored to your specific requirements. They can:</p>
        <ul className="expertise-list">
          <li>Provide the expertise to help you migrate to Model-Based Design</li>
          <li>Design from scratch and validate your motor control system in a simulation environment for rapid prototyping</li>
          <li>Evaluate, modify, and maintain your existing motor control models</li>
          <li>Create an interface and integrate automatically generated code from the controller model into your existing software</li>
          <li>Provide a full-range motor control software solution using Model-Based Design</li>
        </ul>
      </>
    ),
    visualCard: (
      <div className="expertise-visual-card expertise-visual-card--image expertise-visual-card--diagram">
        <img src="/images/motor-control-diagram.png" alt="Motor control system architecture and Model-Based Design workflow" className="expertise-visual-img expertise-diagram-img" loading="lazy" />
        <span>Simulation &amp; Validation</span>
      </div>
    ),
  },
  {
    id: 'prototyping',
    label: 'Prototyping',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    content: (
      <>
        <h3>Prototyping</h3>
        <p>We provide an end-to-end service covering PCB, stencil and component sourcing, board assembly, and functional testing, all from a single source.</p>
        <ul className="expertise-list">
          <li>Multi-layer PCB fabrication</li>
          <li>Stencil production & component sourcing</li>
          <li>SMD and THT board assembly</li>
          <li>Functional testing & validation</li>
          <li>Single-source end-to-end service</li>
        </ul>
      </>
    ),
    visualCard: (
      <div className="expertise-visual-card expertise-visual-animated">
        <div className="expertise-animated-bg" />
        <div className="expertise-visual-content">
          <div className="expertise-pipeline">
            <div className="pipeline-step">
              <div className="pipeline-icon">PCB</div>
              <span>Fabrication</span>
            </div>
            <div className="pipeline-connector" />
            <div className="pipeline-step">
              <div className="pipeline-icon">SMD</div>
              <span>Assembly</span>
            </div>
            <div className="pipeline-connector" />
            <div className="pipeline-step">
              <div className="pipeline-icon active">&#x2713;</div>
              <span>Testing</span>
            </div>
          </div>
        </div>
        <span>From Design to Reality</span>
      </div>
    ),
  },
];

export default function Expertise() {
  const [activeTab, setActiveTab] = useState('consulting');
  const tabNavRef = useRef(null);
  const tabNavVisible = useScrollAnimation(tabNavRef);

  return (
    <section className="expertise" id="expertise">
      <div className="container">
        <div className="expertise-tabs">
          <div className={`tab-nav ${tabNavVisible ? 'visible' : ''}`} ref={tabNavRef} data-animate="fade-up">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={`tab-panel ${activeTab === tab.id ? 'active' : ''}`}
                id={`tab-${tab.id}`}
              >
                <div className="tab-panel-grid">
                  <div className="tab-panel-content">{tab.content}</div>
                  <div className="tab-panel-visual">{tab.visualCard}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
