import { useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: 'Appcon delivered a robust sensorless drive solution that exceeded our requirements. Their expertise in motor control and power electronics made the integration seamless.',
    name: 'Engineering Director',
    role: 'Industrial Automation',
    company: 'Manufacturing Partner',
  },
  {
    id: 2,
    quote: 'Working with Appcon Technologies gave us confidence from concept to production. Their prototyping and validation process ensured we had a reliable product from day one.',
    name: 'Head of R&D',
    role: 'Power Electronics',
    company: 'Technology Client',
  },
];

export default function Testimonials() {
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const headerVisible = useScrollAnimation(headerRef);
  const card1Visible = useScrollAnimation(card1Ref, { delay: 0 });
  const card2Visible = useScrollAnimation(card2Ref, { delay: 100 });

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className={`section-header ${headerVisible ? 'visible' : ''}`} ref={headerRef} data-animate="fade-up">
          <span className="section-tag">What Clients Say</span>
          <h2 className="section-title">Trusted by Industry Professionals</h2>
          <p className="section-desc">Hear from partners who have worked with us on motor control and power electronics projects.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((item, index) => {
            const ref = index === 0 ? card1Ref : card2Ref;
            const visible = index === 0 ? card1Visible : card2Visible;
            return (
              <div
                key={item.id}
                ref={ref}
                className={`testimonial-card ${visible ? 'visible' : ''}`}
                data-animate="fade-up"
              >
                <blockquote className="testimonial-quote">"{item.quote}"</blockquote>
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
