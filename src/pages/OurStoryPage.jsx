import { useRef } from 'react';
import PageHeader from '../components/PageHeader';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function OurStoryPage() {
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const block3Ref = useRef(null);
  const visible1 = useScrollAnimation(block1Ref, { threshold: 0.1 });
  const visible2 = useScrollAnimation(block2Ref, { threshold: 0.1 });
  const visible3 = useScrollAnimation(block3Ref, { threshold: 0.1 });

  return (
    <>
      <PageHeader
        tag="Our Story"
        title="From Research to Industry"
        description="Two decades of turning academic research into practical solutions for sensorless motor control and power electronics."
      />
      <section className="our-story-page" id="our-story">
        <div className="container our-story-container">
          <div className={`our-story-block ${visible1 ? 'visible' : ''}`} ref={block1Ref} data-animate="fade-up">
            <span className="our-story-label">Origins</span>
            <h2 className="our-story-heading">Founded in 2004</h2>
            <p className="our-story-lead">
              Appcon Technologies was founded by Dr.-Ing. Hafedh Sammoud with a clear mission: to bridge the gap between advanced research in sensorless motor control and the needs of industry. What began as a small R&D team has grown into a trusted partner for companies worldwide in white goods, power tools, automotive, and e-mobility.
            </p>
            <p className="our-story-text">
              From the start, we focused on turning theoretical advances into reliable, cost-effective solutions. Our work in field-oriented control (FOC), high-frequency injection, and sensorless algorithms has enabled energy-efficient drives in applications where precision and cost matter most.
            </p>
          </div>

          <div className={`our-story-block ${visible2 ? 'visible' : ''}`} ref={block2Ref} data-animate="fade-up">
            <span className="our-story-label">Journey</span>
            <h2 className="our-story-heading">Growth and Impact</h2>
            <p className="our-story-lead">
              Over the years we have expanded our capabilities across technology consulting, hardware engineering, software development, model-based design, and prototyping. We collaborate with clients from concept through to production, delivering solutions that combine academic rigor with real-world applicability.
            </p>
            <p className="our-story-text">
              Our commitment to energy efficiency and innovation has remained at the core of everything we do. We continue to invest in R&D and to share our work at leading conferences and trade shows such as PCIM Europe, where we connect with experts and showcase new developments in motor control and power electronics.
            </p>
          </div>

          <div className={`our-story-block our-story-block--accent ${visible3 ? 'visible' : ''}`} ref={block3Ref} data-animate="fade-up">
            <span className="our-story-label">Today</span>
            <h2 className="our-story-heading">Dedicated to the Future</h2>
            <p className="our-story-lead">
              Today, Appcon Technologies remains dedicated to advancing the state-of-the-art in sensorless control. We enable energy-efficient drives in high-volume products where they were once underutilized due to cost constraints, and we believe our efforts contribute to optimizing energy consumption and reducing global CO₂ emissions.
            </p>
            <p className="our-story-text">
              We are proud to work with partners who produce systems in millions annually—from household appliances and power tools to automotive and e-mobility. Our story is one of continuous innovation, collaboration, and a steadfast focus on turning research into solutions that matter.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
