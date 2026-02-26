import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollPosition } from '../hooks/useScrollPositionContext';
import { useToast } from '../contexts/ToastContext';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home' },
  {
    labelKey: 'nav.company',
    submenu: [
      { to: '/about', labelKey: 'nav.whoWeAre' },
      { to: '/company/mission', labelKey: 'nav.ourMission' },
      { to: '/company/our-story', labelKey: 'nav.ourStory' },
      { to: '/events', labelKey: 'nav.industryEvents' },
    ],
  },
  {
    labelKey: 'nav.expertise',
    submenu: [
      { to: '/expertise/consulting', labelKey: 'nav.technologyConsulting' },
      { to: '/expertise/hardware', labelKey: 'nav.hardwareEngineering' },
      { to: '/expertise/software', labelKey: 'nav.softwareDevelopment' },
      { to: '/expertise/mbd', labelKey: 'nav.modelBasedDesign' },
      { to: '/expertise/prototyping', labelKey: 'nav.prototyping' },
    ],
  },
  {
    labelKey: 'nav.products',
    submenu: [
      { to: '/products/dmk', labelKey: 'nav.dmk' },
      { to: '/products/lci', labelKey: 'nav.lci' },
      { to: '/products/amc', labelKey: 'nav.amc' },
    ],
  },
  {
    labelKey: 'nav.industries',
    submenu: [
      { to: '/industries/whitegood', labelKey: 'nav.whiteGoods' },
      { to: '/industries/powertool', labelKey: 'nav.powerTools' },
      { to: '/industries/automotive', labelKey: 'nav.automotive' },
    ],
  },
  {
    labelKey: 'nav.simulator',
    submenu: [
      { to: '/simulator', labelKey: 'nav.pulseWidthModulation' },
    ],
  },
  { to: '/contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const scrollY = useScrollPosition();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrolled = scrollY > 50;

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('nav-drawer-open');
    } else {
      document.body.classList.remove('nav-drawer-open');
    }
    return () => document.body.classList.remove('nav-drawer-open');
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);
  const closeDropdown = () => {
    setOpenDropdown(null);
    setMenuOpen(false);
  };

  const isSubmenuActive = (submenu) =>
    submenu.some((sub) => {
      if (sub.to === location.pathname) return true;
      if (sub.to !== '/' && location.pathname.startsWith(sub.to + '/')) return true;
      if (sub.to !== '/' && location.pathname === sub.to) return true;
      return false;
    });

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      const label = lng === 'de' ? t('common.langNameDe') : t('common.langNameEn');
      toast.show(`${t('common.languageSetTo')} ${label}`);
    });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src="/logo.png" alt="Appcon Technologies" className="logo-img" width="160" height="40" decoding="async" fetchPriority="high" />
        </NavLink>
        <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((item) => {
            if (item.submenu) {
              const label = t(item.labelKey);
              const isOpen = openDropdown === item.labelKey;
              const active = isSubmenuActive(item.submenu);
              return (
                <div
                  key={item.labelKey}
                  className="nav-item-with-dropdown"
                  onMouseEnter={() => setOpenDropdown(item.labelKey)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`nav-link nav-link-trigger${isOpen ? ' open' : ''}${active ? ' active' : ''}`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.labelKey)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {label}
                    <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3.5L5 6.5L8 3.5" />
                    </svg>
                  </button>
                  <div className={`nav-dropdown${isOpen ? ' open' : ''}`}>
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        end={sub.to === '/'}
                        className={({ isActive }) => `nav-dropdown-item${isActive ? ' active' : ''}`}
                        onClick={closeDropdown}
                      >
                        {t(sub.labelKey)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={handleNavClick}
              >
                {t(item.labelKey)}
              </NavLink>
            );
          })}
        </div>
        <div
          className="nav-lang-switcher"
          role="group"
          aria-label={t('common.language')}
          onMouseEnter={() => setOpenDropdown('lang')}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="nav-lang-dropdown">
            <button
              type="button"
              className={`nav-lang-trigger ${openDropdown === 'lang' ? ' open' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'lang' ? null : 'lang')}
              aria-expanded={openDropdown === 'lang'}
              aria-haspopup="true"
            >
              {t('common.language')}
              <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3.5L5 6.5L8 3.5" />
              </svg>
            </button>
            <div className={`nav-lang-menu ${openDropdown === 'lang' ? ' open' : ''}`}>
              <button
                type="button"
                className={`nav-lang-option ${(i18n.language || '').startsWith('en') ? ' active' : ''}`}
                onClick={() => {
                  handleLanguageChange('en');
                  setOpenDropdown(null);
                }}
                aria-pressed={(i18n.language || '').startsWith('en')}
              >
                <span className="nav-lang-option-flag" aria-hidden>
                  <svg viewBox="0 0 60 30" width="20" height="10" className="nav-flag-svg" preserveAspectRatio="xMidYMid slice">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                  </svg>
                </span>
                <span>{t('common.langNameEn')}</span>
              </button>
              <button
                type="button"
                className={`nav-lang-option ${(i18n.language || '').startsWith('de') ? ' active' : ''}`}
                onClick={() => {
                  handleLanguageChange('de');
                  setOpenDropdown(null);
                }}
                aria-pressed={(i18n.language || '').startsWith('de')}
              >
                <span className="nav-lang-option-flag" aria-hidden>
                  <svg viewBox="0 0 5 3" width="20" height="12" className="nav-flag-svg" preserveAspectRatio="xMidYMid slice">
                    <rect width="5" height="1" y="0" fill="#000"/>
                    <rect width="5" height="1" y="1" fill="#D00"/>
                    <rect width="5" height="1" y="2" fill="#FFCE00"/>
                  </svg>
                </span>
                <span>{t('common.langNameDe')}</span>
              </button>
            </div>
          </div>
        </div>
        <button
          className={`nav-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setOpenDropdown(null);
          }}
          aria-label={t('nav.toggleMenu')}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
