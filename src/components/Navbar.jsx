import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Company' },
  { to: '/expertise', label: 'Expertise' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 50;

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src="/logo.png" alt="Appcon Technologies" className="logo-img" />
        </NavLink>
        <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
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
