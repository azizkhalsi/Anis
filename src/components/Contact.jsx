import { useRef, useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

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
                  {item.href ? (
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
