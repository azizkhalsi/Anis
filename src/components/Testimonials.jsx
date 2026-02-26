import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Testimonials() {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const headerVisible = useScrollAnimation(headerRef);
  const card1Visible = useScrollAnimation(card1Ref, { delay: 0 });
  const card2Visible = useScrollAnimation(card2Ref, { delay: 100 });

  const items = t('home.testimonials.items', { returnObjects: true });

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className={`section-header ${headerVisible ? 'visible' : ''}`} ref={headerRef} data-animate="fade-up">
          <span className="section-tag">{t('home.testimonials.tag')}</span>
          <h2 className="section-title">{t('home.testimonials.title')}</h2>
          <p className="section-desc">{t('home.testimonials.desc')}</p>
        </div>
        <div className="testimonials-grid">
          {items.map((item, index) => {
            const ref = index === 0 ? card1Ref : card2Ref;
            const visible = index === 0 ? card1Visible : card2Visible;
            return (
              <div
                key={index}
                ref={ref}
                className={`testimonial-card ${visible ? 'visible' : ''}`}
                data-animate="fade-up"
              >
                <blockquote className="testimonial-quote">&quot;{item.quote}&quot;</blockquote>
                <footer className="testimonial-footer">
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-role">{item.role}</span>
                  {item.company && <span className="testimonial-company">{item.company}</span>}
                </footer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
