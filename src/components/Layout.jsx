import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollPositionProvider } from '../contexts/ScrollPositionContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import StickyCTA from './StickyCTA';

export default function Layout() {
  const location = useLocation();
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7374/ingest/3b192536-1e54-4b21-8ca0-89e6554bb50d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'455fe2'},body:JSON.stringify({sessionId:'455fe2',location:'Layout.jsx:pathname',message:'Layout pathname',data:{pathname:location.pathname},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
  }, [location.pathname]);
  // #endregion

  return (
    <ScrollPositionProvider>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <div key={location.pathname} className="page-transition-wrap">
          <Outlet />
        </div>
      </main>
      <StickyCTA />
      <Footer />
    </ScrollPositionProvider>
  );
}
