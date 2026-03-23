import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/',           label: 'Home' },
  { to: '/classes',    label: 'Classes' },
  { to: '/schedule',   label: 'Schedule' },
  { to: '/trainers',   label: 'Trainers' },
  { to: '/membership', label: 'Membership' },
  { to: '/bmi',        label: 'BMI Calc' },
  { to: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleJoin = () => {
    navigate('/membership');
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__logo" onClick={() => navigate('/')}>
        IRON<span>FORGE</span>
      </div>

      <div className="navbar__links">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => 'navbar__link' + (isActive ? ' active' : '')}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <button className="navbar__join" onClick={handleJoin}>Join Now</button>

      <button
        className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {menuOpen && (
        <div className="navbar__drawer">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => 'drawer__link' + (isActive ? ' active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button className="navbar__join drawer__join" onClick={handleJoin}>Join Now</button>
        </div>
      )}
    </nav>
  );
}
