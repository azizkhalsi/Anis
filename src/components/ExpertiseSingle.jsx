import { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { TABS } from './Expertise';
import PrototypingJourney from './PrototypingJourney';

const VALID_TOPICS = ['consulting', 'hardware', 'software', 'mbd', 'prototyping'];
const MBD_DIAGRAM_SRC = '/images/mbd-diagram.png';
const MBD_DIAGRAM_SRC_2X = '/images/mbd-diagram@2x.png';

export default function ExpertiseSingle() {
  const { topicId } = useParams();
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const mbdDiagramRef = useRef(null);
  const contentVisible = useScrollAnimation(contentRef, { threshold: 0.1 });
  const visualVisible = useScrollAnimation(visualRef, { threshold: 0.1 });
  const mbdDiagramVisible = useScrollAnimation(mbdDiagramRef, { threshold: 0.08 });

  if (!topicId || !VALID_TOPICS.includes(topicId)) {
    return <Navigate to="/expertise/consulting" replace />;
  }

  const tab = TABS.find((t) => t.id === topicId);
  if (!tab) return <Navigate to="/expertise/consulting" replace />;

  const isMbd = topicId === 'mbd';
  const isPrototyping = topicId === 'prototyping';

  return (
    <>
    <section className={`expertise-single ${isMbd ? 'expertise-single--mbd' : ''} ${isPrototyping ? 'expertise-single--prototyping' : ''}`} id="expertise-single">
      <div className="container container--wide">
        {isMbd ? (
          <>
            <div
              className={`expertise-single-mbd-diagram ${mbdDiagramVisible ? 'visible' : ''}`}
              ref={mbdDiagramRef}
              data-animate="fade-up"
            >
              <div className="expertise-mbd-diagram-frame">
                <img
                  src={MBD_DIAGRAM_SRC}
                  srcSet={`${MBD_DIAGRAM_SRC} 1x, ${MBD_DIAGRAM_SRC_2X} 2x`}
                  sizes="(max-width: 968px) 100vw, 1100px"
                  alt="Model-Based Design: from simulation models to auto-generated code in motor control system"
                  className="expertise-mbd-diagram-img"
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div
              className={`expertise-single-content expertise-single-content--lead ${contentVisible ? 'visible' : ''}`}
              ref={contentRef}
              data-animate="fade-right"
            >
              <div className="expertise-single-label">Expertise</div>
              <h1 className="expertise-single-title">{tab.label}</h1>
              <div className="expertise-single-body">{tab.content}</div>
            </div>
          </>
        ) : isPrototyping ? (
          <div className="expertise-single-content--solo expertise-single-content--with-journey">
            <div
              className={`expertise-single-content expertise-single-content--header-only ${contentVisible ? 'visible' : ''}`}
              ref={contentRef}
              data-animate="fade-right"
            >
              <div className="expertise-single-label">Expertise</div>
              <h1 className="expertise-single-title">{tab.label}</h1>
            </div>
            <PrototypingJourney />
            <div className={`expertise-single-content expertise-single-content--body ${contentVisible ? 'visible' : ''}`} data-animate="fade-right">
              <div className="expertise-single-body">{tab.content}</div>
            </div>
          </div>
        ) : (
          <div className="expertise-single-grid">
            <div
              className={`expertise-single-content ${contentVisible ? 'visible' : ''}`}
              ref={contentRef}
              data-animate="fade-right"
            >
              <div className="expertise-single-label">Expertise</div>
              <h1 className="expertise-single-title">{tab.label}</h1>
              <div className="expertise-single-body">{tab.content}</div>
            </div>
            <div
              className={`expertise-single-visual ${visualVisible ? 'visible' : ''}`}
              ref={visualRef}
              data-animate="fade-left"
            >
              {tab.visualCard}
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
