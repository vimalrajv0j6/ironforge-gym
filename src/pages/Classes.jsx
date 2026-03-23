import React, { useState } from 'react';
import './Classes.css';

const classes = [
  { icon:'🥊', title:'Boxing',        badge:'High Intensity', category:'cardio',    desc:'Full-body conditioning through punch combos, footwork, and pad work. Burn up to 800 cal/hr.' },
  { icon:'🧘', title:'Yoga Flow',     badge:'All Levels',     category:'recovery',  desc:'Restore flexibility, balance, and mental clarity through mindful movement and breathwork.' },
  { icon:'⚡', title:'HIIT',          badge:'Cardio',         category:'cardio',    desc:'High-Intensity Interval Training — maximum fat burn in minimum time. 30-min circuit.' },
  { icon:'🏋️', title:'Powerlifting',  badge:'Strength',       category:'strength',  desc:'Deadlifts, squats, and bench press under expert supervision. Build raw strength.' },
  { icon:'🚴', title:'Spin Cycle',    badge:'Cardio',         category:'cardio',    desc:'High-energy indoor cycling to pump-up music. Burn calories and build leg endurance.' },
  { icon:'🤸', title:'CrossFit',      badge:'Functional',     category:'functional',desc:'Functional movements at high intensity. Varied workouts build all-round athletic fitness.' },
  { icon:'💪', title:'Body Pump',     badge:'Strength',       category:'strength',  desc:'Barbell-based group workout targeting every major muscle group. 60-min full body burn.' },
  { icon:'🧗', title:'Calisthenics',  badge:'Body Weight',    category:'functional',desc:'Master your body weight — pull-ups, dips, muscle-ups, and advanced skill work.' },
  { icon:'🏃', title:'Zumba',         badge:'Dance Cardio',   category:'cardio',    desc:'High-energy dance fitness combining Latin rhythms with easy cardio movements.' },
  { icon:'🧊', title:'Recovery',      badge:'Low Impact',     category:'recovery',  desc:'Foam rolling, stretching, and mobility work to speed up recovery between sessions.' },
  { icon:'🤼', title:'MMA Basics',    badge:'Combat',         category:'cardio',    desc:'Learn fundamental striking, grappling and footwork from certified combat sports coaches.' },
  { icon:'🏊', title:'Aqua Fit',      badge:'Low Impact',     category:'recovery',  desc:'Pool-based resistance training — gentle on joints, effective for strength and cardio.' },
];

const filters = ['all', 'cardio', 'strength', 'functional', 'recovery'];

export default function Classes() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? classes
    : classes.filter(c => c.category === active);

  return (
    <main style={{ paddingTop: '64px' }}>
      <section className="section">
        <div className="section-tag" data-aos="fade-down">What We Offer</div>
        <div className="section-title" data-aos="fade-up">OUR CLASSES</div>
        <div className="section-sub" data-aos="fade-up" data-aos-delay="100">
          From high-intensity cardio to strength building — find a class that matches your goals.
        </div>

        {/* Filter tabs */}
        <div className="classes__filters">
          {filters.map(f => (
            <button
              key={f}
              className={`classes__filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f === 'all' ? 'All Classes' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="classes__grid">
          {filtered.map(({ icon, title, badge, desc }, idx) => (
            <div className="class-card" key={title} data-aos="fade-up" data-aos-delay={idx * 50}>
              <div className="class-card__icon">{icon}</div>
              <h3 className="class-card__title">{title}</h3>
              <p className="class-card__desc">{desc}</p>
              <span className="class-card__badge">{badge}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
