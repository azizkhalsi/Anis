import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import StickyCTA from './StickyCTA';

export default function Layout() {
  const location = useLocation();

  return (
    <>
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
    </>
  );
}
