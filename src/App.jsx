import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const MissionPage = lazy(() => import('./pages/MissionPage'));
const OurStoryPage = lazy(() => import('./pages/OurStoryPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ExpertisePage = lazy(() => import('./pages/ExpertisePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SimulatorPage = lazy(() => import('./pages/SimulatorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="container" style={{ padding: '4rem 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<PageFallback />}><HomePage /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageFallback />}><AboutPage /></Suspense>} />
          <Route path="/company/mission" element={<Suspense fallback={<PageFallback />}><MissionPage /></Suspense>} />
          <Route path="/company/our-story" element={<Suspense fallback={<PageFallback />}><OurStoryPage /></Suspense>} />
          <Route path="/events" element={<Suspense fallback={<PageFallback />}><EventsPage /></Suspense>} />
          <Route path="/expertise" element={<Navigate to="/expertise/consulting" replace />} />
          <Route path="/expertise/:topicId" element={<Suspense fallback={<PageFallback />}><ExpertisePage /></Suspense>} />
          <Route path="/products" element={<Navigate to="/products/dmk" replace />} />
          <Route path="/products/:productId" element={<Suspense fallback={<PageFallback />}><ProductsPage /></Suspense>} />
          <Route path="/industries" element={<Navigate to="/industries/whitegood" replace />} />
          <Route path="/industries/:industryId" element={<Suspense fallback={<PageFallback />}><IndustriesPage /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageFallback />}><ContactPage /></Suspense>} />
          <Route path="/simulator" element={<Suspense fallback={<PageFallback />}><SimulatorPage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
