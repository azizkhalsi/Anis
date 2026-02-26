import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import LocationMap from './LocationMap';

const FORMSPREE_FORM_ID = 'xykdbrwg';
const FORMSPREE_ACTION = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const IFRAME_NAME = 'formspree-frame';
const SUBMIT_TIMEOUT_MS = 12000;

const CONTACT_ITEM_KEYS = [
  { labelKey: 'contact.addressLabel', valueKey: 'contact.addressValue' },
  { labelKey: 'contact.locationLabel', valueKey: 'contact.locationValue', href: 'https://maps.app.goo.gl/DggvrQfHPYFJC2zF6', icon: 'map' },
  { labelKey: 'contact.phoneLabel', valueKey: 'contact.phoneValue', href: 'tel:+21670834890' },
  { labelKey: 'contact.languagesLabel', valueKey: 'contact.languagesValue' },
  { labelKey: 'contact.websiteLabel', valueKey: 'contact.websiteValue', href: 'https://www.appcon-technologies.com' },
  { labelKey: 'contact.linkedInLabel', valueKey: 'contact.linkedInValue', href: 'https://www.linkedin.com/company/appcontechnologies' },
];

export default function Contact() {
  const { t } = useTranslation();
  const leftRef = useRef(null);
  const formRef = useRef(null);
  const formElRef = useRef(null);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false);

  const leftVisible = useScrollAnimation(leftRef);
  const formVisible = useScrollAnimation(formRef, { delay: 100 });
  const subjectOptions = t('contact.subjectOptions', { returnObjects: true });
  const subjectOptionsArray = Array.isArray(subjectOptions) ? subjectOptions : [];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formElRef.current;
    const iframe = iframeRef.current;
    if (!form || !iframe) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const done = (success) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setSubmitting(false);
      if (success) {
        setSubmitMessage(t('contact.submitSuccess'));
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitMessage(t('contact.submitError'));
        setSubmitStatus('error');
        setTimeout(() => { setSubmitMessage(''); setSubmitStatus(null); }, 6000);
      }
    };

    const onIframeLoad = () => {
      iframe.removeEventListener('load', onIframeLoad);
      done(true);
    };

    setSubmitting(true);
    setSubmitMessage('');
    iframe.addEventListener('load', onIframeLoad);
    form.setAttribute('target', IFRAME_NAME);
    form.submit();

    timeoutRef.current = window.setTimeout(() => {
      iframe.removeEventListener('load', onIframeLoad);
      done(false);
    }, SUBMIT_TIMEOUT_MS);
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
            <p className="contact-intro">{t('contact.intro')}</p>
            <div className="contact-items">
              {CONTACT_ITEM_KEYS.map((item) => (
                <div key={item.labelKey} className="contact-item">
                  <strong>{t(item.labelKey)}</strong>
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
                      {t(item.valueKey)}
                    </a>
                  ) : item.href ? (
                    <p><a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{t(item.valueKey)}</a></p>
                  ) : (
                    <p style={{ whiteSpace: 'pre-line' }}>{t(item.valueKey)}</p>
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
            <iframe
              ref={iframeRef}
              name={IFRAME_NAME}
              title="Submit"
              style={{ position: 'absolute', left: -9999, width: 1, height: 1, border: 0 }}
            />
            <form
              ref={formElRef}
              className="contact-form"
              action={FORMSPREE_ACTION}
              method="POST"
              target={IFRAME_NAME}
              onSubmit={handleSubmit}
            >
              {submitStatus === 'success' ? (
                <div className="form-success-block">
                  <span className="form-success-icon" aria-hidden>✓</span>
                  <p className="form-success-title">{submitMessage}</p>
                  <p className="form-success-detail">{t('contact.submitSuccessDetail')}</p>
                  <button type="button" className="btn btn-outline" onClick={() => { setSubmitMessage(''); setSubmitStatus(null); }}>
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">{t('contact.formName')}</label>
                    <input type="text" id="fullName" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('contact.formEmail')}</label>
                    <input type="email" id="email" name="_replyto" placeholder={t('contact.formEmailPlaceholder')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">{t('contact.formSubject')}</label>
                    <select id="subject" name="subject" required>
                      <option value="">{t('contact.formSubjectPlaceholder')}</option>
                      {subjectOptionsArray.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t('contact.formMessage')}</label>
                    <textarea id="message" name="message" rows="5" required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? t('contact.formSending') : t('contact.formSubmit')}
                  </button>
                  {submitMessage && submitStatus === 'error' && (
                    <p className="form-error" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{submitMessage}</p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>

        {/* Interactive Location Map */}
        <LocationMap />
      </div>
    </section>
  );
}
