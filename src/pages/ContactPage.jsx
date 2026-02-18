import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        tag="Get in Touch"
        title="Contact Us"
        description="Have questions about our motor control solutions or want to discuss your project? We're here to help."
      />
      <Contact />
    </>
  );
}
