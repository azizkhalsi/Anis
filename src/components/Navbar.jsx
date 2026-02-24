import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../contexts/ScrollPositionContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  {
    label: 'Company',
    submenu: [
      { to: '/about', label: 'Who We Are' },
      { to: '/company/mission', label: 'Our Mission' },
      { to: '/company/our-story', label: 'Our Story' },
      { to: '/events', label: 'Industry Events' },
    ],
  },
  {
    label: 'Expertise',
    submenu: [
      { to: '/expertise/consulting', label: 'Technology Consulting' },
      { to: '/expertise/hardware', label: 'Hardware Engineering' },
      { to: '/expertise/software', label: 'Software Development' },
      { to: '/expertise/mbd', label: 'Model-Based Design' },
      { to: '/expertise/prototyping', label: 'Prototyping' },
    ],
  },
  {
    label: 'Products',
    submenu: [
      { to: '/products/dmk', label: 'DMK' },
      { to: '/products/lci', label: 'LCI' },
      { to: '/products/amc', label: 'AMC' },
    ],
  },
  {
    label: 'Industries',
    submenu: [
      { to: '/industries/whitegood', label: 'White Goods' },
      { to: '/industries/powertool', label: 'Power Tools' },
      { to: '/industries/automotive', label: 'Automotive' },
      { to: '/industries/emobility', label: 'E-Mobility' },
    ],
  },
  {
    label: 'Simulator',
    submenu: [
      { to: '/simulator', label: 'Pulse Width Modulation' },
    ],
  },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const location = useLocation();
  const scrollY = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrolled = scrollY > 50;

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

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src="/logo.png" alt="Appcon Technologies" className="logo-img" width="160" height="40" decoding="async" fetchPriority="high" />
        </NavLink>
        <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((item) => {
            if (item.submenu) {
              const isOpen = openDropdown === item.label;
              const active = isSubmenuActive(item.submenu);
              return (
                <div
                  key={item.label}
                  className="nav-item-with-dropdown"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`nav-link nav-link-trigger${isOpen ? ' open' : ''}${active ? ' active' : ''}`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
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
                        {sub.label}
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
                {item.label}
              </NavLink>
            );
          })}
        </div>
        <button
          className={`nav-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
