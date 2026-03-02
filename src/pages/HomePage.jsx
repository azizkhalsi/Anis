import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import WhatWeOffer from '../components/WhatWeOffer';
import Services from '../components/Services';
import TrustBadges from '../components/TrustBadges';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <WhatWeOffer />
      <Services />
      <TrustBadges />
    </>
  );
}
