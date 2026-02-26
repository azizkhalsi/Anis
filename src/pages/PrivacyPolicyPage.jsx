import PageHeader from '../components/PageHeader';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your information when you use our website and contact form."
      />
      <section className="privacy-policy page-content">
        <div className="container">
          <div className="privacy-policy-content">
            <p className="privacy-policy-updated">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <h2>1. Who we are</h2>
            <p>
              Appcon Technologies (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates this website. We are an R&D engineering firm specializing in sensorless motor control and power electronics. This Privacy Policy explains how we handle your personal data when you use our site or contact us.
            </p>

            <h2>2. What data we collect</h2>
            <p>When you use our <strong>contact form</strong>, we collect only what you choose to send:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Subject and message content</li>
            </ul>
            <p>We do not use a database to store form submissions. Your message is sent to us via a third‑party form service (e.g. Formspree) and/or by email. We do not collect personal data for any purpose other than responding to your inquiry.</p>

            <h2>3. How we use your data</h2>
            <p>We use the data you provide only to:</p>
            <ul>
              <li>Respond to your contact request</li>
              <li>Manage our business relationship with you if you are or become a client or partner</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with third parties for marketing. We do not use your email or message content for any purpose other than as described above.</p>

            <h2>4. Where your data goes</h2>
            <p>Contact form submissions are processed by a form provider (e.g. Formspree) and delivered to our team by email. We may retain correspondence in our email systems for as long as needed to fulfil your request and for legitimate business and legal purposes. We do not store your data in a separate database on this website.</p>

            <h2>5. Security and confidentiality</h2>
            <p>We treat your data as confidential. Our website uses HTTPS so data in transit is encrypted. We take reasonable steps to keep the data we receive (e.g. via email) secure and to limit access to those who need it to respond to you. No system is 100% secure; we do not guarantee absolute security but we work to protect your information.</p>

            <h2>6. Your rights</h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>Ask what personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p>To exercise these rights or ask questions about this policy, contact us using the contact form or the details on our Contact page.</p>

            <h2>7. Cookies and similar technologies</h2>
            <p>We may use essential cookies (e.g. for language preference) and, if applicable, analytics cookies to understand how visitors use our site. We will not use non‑essential cookies without your consent where required by law. You can change your cookie preferences in your browser settings.</p>

            <h2>8. Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will be revised when we do. We encourage you to check this page occasionally for changes.</p>

            <h2>9. Contact</h2>
            <p>For any questions about this Privacy Policy or our use of your data, please contact us via the contact form or the details provided on our Contact page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
