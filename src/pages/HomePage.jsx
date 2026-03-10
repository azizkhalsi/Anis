import Hero from '../components/Hero';
import { ClientLogosStory, ClientLogosTrack } from '../components/ClientLogos';
import WhatWeOffer from '../components/WhatWeOffer';
import Services from '../components/Services';
import TrustBadges from '../components/TrustBadges';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogosStory />
      <WhatWeOffer />
      <Services />
      <TrustBadges />
      <ClientLogosTrack />
    </>
  );
}
