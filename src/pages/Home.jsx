import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../App';
import './Home.css';

const stats = [
  { num: '12K+', label: 'Members' },
  { num: '48',   label: 'Classes / Week' },
  { num: '15+',  label: 'Pro Trainers' },
  { num: '5★',   label: 'Rating' },
];

const features = [
  { icon: '🏋️', title: 'Premium Equipment', desc: 'Latest machines from leading brands. Over 500 pieces of equipment across 3 training zones.' },
  { icon: '👨‍🏫', title: 'Expert Trainers',   desc: 'All certified trainers with 5+ years of experience. Personalised plans for every fitness goal.' },
  { icon: '🕐', title: 'Open 24 / 7',       desc: 'Train on your own schedule. Full facility access any hour of any day, 365 days a year.' },
  { icon: '🥗', title: 'Nutrition Plans',   desc: 'Personalised diet and nutrition coaching to complement every workout program.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Monthly fitness assessments with detailed metrics so you can see your transformation.' },
  { icon: '🚿', title: 'Premium Amenities', desc: 'Luxury locker rooms, sauna, steam room, and juice bar available to all members.' },
];

const testimonials = [
  { name: 'Karthik R.', plan: 'Elite Member', text: 'IronForge transformed my life. Lost 18 kg in 5 months with the nutrition + training combo. The trainers are genuinely world-class.' },
  { name: 'Divya S.',   plan: 'Pro Member',   text: 'Best gym in Trichy, no contest. The HIIT classes are intense but the results speak for themselves. Joined 8 months ago and never looked back.' },
  { name: 'Arun M.',    plan: 'Pro Member',   text: 'The 24/7 access was the game changer for me. I train at 5 AM before work. Clean facility, great equipment, amazing community.' },
];

export default function Home() {
  const navigate = useNavigate();
  const showToast = useContext(ToastContext);

  return (
    <main className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid" />
        <div className="hero__accent" />
        <div className="hero__content" data-aos="fade-up" data-aos-duration="1000">
          <div className="hero__tag">Elite Training Facility — Trichy</div>
          <h1 className="hero__heading">
            FORGE YOUR<br />
            <span className="red">STRONGEST</span><br />
            SELF
          </h1>
          <p className="hero__sub">
            State-of-the-art equipment, world-class trainers, and a community
            that pushes you beyond your limits. Your transformation starts today.
          </p>
          <div className="hero__btns">
            <button className="btn-primary" onClick={() => navigate('/membership')}>
              Start Free Trial
            </button>
            <button className="btn-outline" onClick={() => navigate('/classes')}>
              Explore Classes
            </button>
          </div>
          <div className="hero__stats">
            {stats.map(({ num, label }, idx) => (
              <div key={label} className="hero__stat" data-aos="fade-up" data-aos-delay={idx * 150 + 400}>
                <div className="hero__stat-num">{num}</div>
                <div className="hero__stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="home__features section">
        <div className="section-tag" data-aos="fade-down">Why IronForge</div>
        <div className="section-title" data-aos="fade-up">BUILT FOR CHAMPIONS</div>
        <div className="features__grid">
          {features.map(({ icon, title, desc }, idx) => (
            <div className="feature-card" key={title} data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="feature-card__icon">{icon}</div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="home__cta" data-aos="zoom-in" data-aos-duration="1000">
        <div className="home__cta-content">
          <div className="section-tag" style={{ justifyContent: 'center' }}>Limited Time</div>
          <h2 className="home__cta-heading">7-DAY FREE TRIAL</h2>
          <p className="home__cta-sub">No credit card required. Full access to all facilities and classes.</p>
          <button className="btn-primary" onClick={() => navigate('/membership')}>
            Claim Your Free Trial
          </button>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="home__testimonials section">
        <div className="section-tag" data-aos="fade-down">Member Stories</div>
        <div className="section-title" data-aos="fade-up">REAL RESULTS</div>
        <div className="testimonials__grid">
          {testimonials.map(({ name, plan, text }, idx) => (
            <div className="testimonial-card" key={name} data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__text">"{text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {name.charAt(0)}
                </div>
                <div>
                  <div className="testimonial-card__name">{name}</div>
                  <div className="testimonial-card__plan">{plan}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
