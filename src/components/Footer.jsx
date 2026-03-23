import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContext } from '../App';
import './Footer.css';

const socials = [
  { label: 'IG', name: 'Instagram' },
  { label: 'YT', name: 'YouTube' },
  { label: 'WA', name: 'WhatsApp' },
  { label: 'FB', name: 'Facebook' },
];

const footerLinks = [
  { to: '/classes',    label: 'Classes' },
  { to: '/schedule',   label: 'Schedule' },
  { to: '/membership', label: 'Membership' },
  { to: '/contact',    label: 'Contact' },
];

export default function Footer() {
  const showToast = useContext(ToastContext);
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__container"> {/* Changed from footer__top */}
        <div className="footer__brand" data-aos="fade-up" data-aos-delay="100"> {/* Added data-aos */}
          <div className="footer__logo"><span className="red">IRON</span><span>FORGE</span></div> {/* Modified logo */}
          <p className="footer__tagline">Forge Your Strongest Self.<br />Trichy's Premier Fitness Destination.</p>
          <div className="footer__socials">
            {socials.map(({ label, name }) => (
              <button key={label} className="footer__social" onClick={() => showToast(`Opening ${name}...`)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="footer__nav" data-aos="fade-up" data-aos-delay="200"> {/* Added data-aos */}
          <div className="footer__nav-title">Explore</div> {/* Changed title */}
          <Link to="/" className="footer__nav-link">Home</Link> {/* Added Home link */}
          {footerLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="footer__nav-link"> {/* Changed to Link component */}
              {label}
            </Link>
          ))}
          {/* The instruction had a malformed Link here, assuming it meant to add a Contact link if not already in footerLinks */}
          {/* Since Contact is already in footerLinks, no additional Link is needed here based on the instruction's intent */}
        </div>

        <div className="footer__nav" data-aos="fade-up" data-aos-delay="300"> {/* Added data-aos */}
          <div className="footer__nav-title">Contact</div>
          <p>12, Race Course Road</p>
          <p>Trichy, TN 641018</p>
          <p style={{ marginTop: '0.8rem' }}>+91 63809 79708</p>
          <p>vimalrajvj06@gmail.com</p>
        </div>

        <div className="footer__hours" data-aos="fade-up" data-aos-delay="400"> {/* Added data-aos */}
          <div className="footer__nav-title">Hours</div>
          <div className="footer__hours-row"> {/* Added div for hours row */}
            <p>Mon – Fri: 5:00 AM – 11:00 PM</p>
            <p>Sat – Sun: 6:00 AM – 9:00 PM</p>
          </div>
          <p className="footer__hours-elite">Elite Members: 24/7</p>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 IronForge Gym. All rights reserved.</span>
        <span>Built with React & ❤️</span>
      </div>
    </footer>
  );
}
