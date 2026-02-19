import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExpertisePage = lazy(() => import('./pages/ExpertisePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

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
          <Route path="/expertise" element={<Suspense fallback={<PageFallback />}><ExpertisePage /></Suspense>} />
          <Route path="/products" element={<Suspense fallback={<PageFallback />}><ProductsPage /></Suspense>} />
          <Route path="/industries" element={<Suspense fallback={<PageFallback />}><IndustriesPage /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageFallback />}><ContactPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
