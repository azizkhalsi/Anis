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
      <div className="expertise-visual-card">
        <div className="visual-icon-large">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <path d="M25 55V35L40 25L55 35V55L40 45L25 55Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="40" cy="25" r="3" fill="currentColor" />
            <circle cx="25" cy="55" r="3" fill="currentColor" />
            <circle cx="55" cy="55" r="3" fill="currentColor" />
            <circle cx="40" cy="45" r="3" fill="currentColor" opacity="0.5" />
          </svg>
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
        <img src="/expertise-pcb.png" alt="PCB circuit board design" className="expertise-visual-img" />
        <span>PCB & Circuit Design</span>
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
      <div className="expertise-visual-card">
        <div className="visual-icon-large">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="15" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <path d="M25 32L35 40L25 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="40" y1="48" x2="55" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span>Embedded Systems</span>
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
      <div className="expertise-visual-card">
        <div className="visual-icon-large">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 60L30 35L45 45L65 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="30" cy="35" r="3" fill="currentColor" />
            <circle cx="45" cy="45" r="3" fill="currentColor" />
            <circle cx="65" cy="20" r="3" fill="currentColor" />
            <path d="M15 20V60H65" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
        <span>Simulation & Validation</span>
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
      <div className="expertise-visual-card">
        <div className="visual-icon-large">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 15L55 25V45L40 55L25 45V25L40 15Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M40 25L48 30V40L40 45L32 40V30L40 25Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" />
            <circle cx="40" cy="35" r="4" fill="currentColor" opacity="0.4" />
            <path d="M40 55V65M25 45L18 50M55 45L62 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
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
