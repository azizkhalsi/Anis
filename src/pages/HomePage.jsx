import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Services from '../components/Services';
import Leadership from '../components/Leadership';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Services />
      <Leadership />
      <Testimonials />
      <TrustBadges />
    </>
  );
}
