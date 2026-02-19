import { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { TABS } from './Expertise';

const VALID_TOPICS = ['consulting', 'hardware', 'software', 'mbd', 'prototyping'];

export default function ExpertiseSingle() {
  const { topicId } = useParams();
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const contentVisible = useScrollAnimation(contentRef, { threshold: 0.1 });
  const visualVisible = useScrollAnimation(visualRef, { threshold: 0.1 });

  if (!topicId || !VALID_TOPICS.includes(topicId)) {
    return <Navigate to="/expertise/consulting" replace />;
  }

  const tab = TABS.find((t) => t.id === topicId);
  if (!tab) return <Navigate to="/expertise/consulting" replace />;

  return (
    <section className="expertise-single" id="expertise-single">
      <div className="container container--wide">
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
      </div>
    </section>
  );
}
