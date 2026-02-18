import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function PageHeader({ tag, title, description }) {
  const ref = useRef(null);
  const visible = useScrollAnimation(ref, { threshold: 0.1 });

  return (
    <section className="page-header">
      <div className="container">
        <div className={`page-header-content ${visible ? 'visible' : ''}`} ref={ref} data-animate="fade-up">
          {tag && <span className="section-tag">{tag}</span>}
          <h1 className="page-header-title">{title}</h1>
          {description && <p className="page-header-desc">{description}</p>}
        </div>
      </div>
    </section>
  );
}
