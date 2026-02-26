import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScrollPositionProvider } from '../contexts/ScrollPositionContext';
import { ToastProvider } from '../contexts/ToastContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import StickyCTA from './StickyCTA';
import Toast from './Toast';
import Breadcrumbs from './Breadcrumbs';

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <ScrollPositionProvider>
      <ToastProvider>
        <ScrollToTop />
        <a href="#main-content" className="skip-link">{t('common.skipToContent')}</a>
        <Navbar />
<main id="main-content">
        <div key={location.pathname} className="page-transition-wrap">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
        <StickyCTA />
        <Toast />
        <Footer />
      </ToastProvider>
    </ScrollPositionProvider>
  );
}
