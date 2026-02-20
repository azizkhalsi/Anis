import { useRef, useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import LocationMap from './LocationMap';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Product Information',
  'Technical Support',
  'Partnership',
  'Careers',
  'DMK / LCI / AMC',
  'Other',
];

const CONTACT_ITEMS = [
  {
    label: 'Address',
    value: 'Parc Technologique BP 130\nAriana, 2088\nTunisia',
  },
  {
    label: 'Location',
    value: 'View on Google Maps',
    href: 'https://maps.app.goo.gl/DggvrQfHPYFJC2zF6',
    icon: 'map',
  },
  {
    label: 'Phone',
    value: '+216 70 834 890',
    href: 'tel:+21670834890',
  },
  {
    label: 'Languages',
    value: 'German, English, French',
  },
  {
    label: 'Website',
    value: 'www.appcon-technologies.com',
    href: 'https://www.appcon-technologies.com',
  },
  {
    label: 'LinkedIn',
    value: 'Appcon Technologies',
    href: 'https://www.linkedin.com/company/appcontechnologies',
  },
];

export default function Contact() {
  const leftRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const leftVisible = useScrollAnimation(leftRef);
  const formVisible = useScrollAnimation(formRef, { delay: 100 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('Message Sent!');
    setFormData({ fullName: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        {/* Interactive Location Map */}
        <LocationMap />

        <div className="contact-grid">
          <div
            className={`contact-info ${leftVisible ? 'visible' : ''}`}
            ref={leftRef}
            data-animate="fade-right"
          >
            <p className="contact-intro">
              Reach out to us and our team will get back to you as soon as possible.
            </p>
            <div className="contact-items">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="contact-item">
                  <strong>{item.label}</strong>
                  {item.icon === 'map' ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-map-link"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {item.value}
                    </a>
                  ) : item.href ? (
                    <p><a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{item.value}</a></p>
                  ) : (
                    <p style={{ whiteSpace: 'pre-line' }}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`contact-form-wrapper ${formVisible ? 'visible' : ''}`}
            ref={formRef}
            data-animate="fade-left"
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {submitMessage && (
                <p className="form-success">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
