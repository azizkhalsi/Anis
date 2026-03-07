import { useEffect, useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScrollPositionProvider } from '../contexts/ScrollPositionContext';
import { ToastProvider } from '../contexts/ToastContext';
import usePageVisible from '../hooks/usePageVisible';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import StickyCTA from './StickyCTA';
import Toast from './Toast';
import Breadcrumbs from './Breadcrumbs';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) { setProgress(0); return; }
    setProgress(Math.min(scrollTop / docHeight, 1));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="global-scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

export default function Layout() {
  const { t } = useTranslation();
  const pageVisible = usePageVisible();

  useEffect(() => {
    const el = document.documentElement;
    if (pageVisible) el.removeAttribute('data-page-hidden');
    else el.setAttribute('data-page-hidden', '');
  }, [pageVisible]);

  return (
    <ScrollPositionProvider>
      <ToastProvider>
        <ScrollToTop />
        <ScrollProgressBar />
        <a href="#main-content" className="skip-link">{t('common.skipToContent')}</a>
        <Navbar />
        <main id="main-content">
          <div className="page-transition-wrap">
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
