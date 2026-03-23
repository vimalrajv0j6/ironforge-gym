import React, { useState, useContext } from 'react';
import { ToastContext } from '../App';
import './Trainers.css';

const trainers = [
  {
    initials: 'AS', name: 'Arjun Sharma', specialty: 'Boxing & HIIT',
    exp: '8 Years', rating: '4.9', clients: '120+',
    bio: 'Former national-level boxer with 8 years of coaching experience. Specialises in explosive power training, pad work, and high-intensity conditioning circuits.',
    certifications: ['Boxing Coach Level 3', 'HIIT Specialist', 'CPR Certified'],
    color: 'linear-gradient(135deg,#1a0000,#2a0505)',
    accent: '#e8000d',
  },
  {
    initials: 'PN', name: 'Priya Nair', specialty: 'Yoga & Mobility',
    exp: '6 Years', rating: '5.0', clients: '90+',
    bio: 'RYT-500 certified yoga instructor with expertise in recovery, flexibility, and mindfulness-based training programs. Former competitive gymnast.',
    certifications: ['RYT-500 Yoga', 'Mobility Specialist', 'Meditation Coach'],
    color: 'linear-gradient(135deg,#000a1a,#05102a)',
    accent: '#3a8ee6',
  },
  {
    initials: 'VR', name: 'Vikram Reddy', specialty: 'CrossFit & Strength',
    exp: '7 Years', rating: '4.8', clients: '105+',
    bio: 'CrossFit Level 2 certified coach. Competed in 3 national CrossFit opens. Expert in functional fitness programming and strength & conditioning.',
    certifications: ['CrossFit L2', 'CSCS Certified', 'Olympic Lifting Coach'],
    color: 'linear-gradient(135deg,#001a0a,#052a10)',
    accent: '#2a9e5a',
  },
  {
    initials: 'RM', name: 'Rohan Mehta', specialty: 'Powerlifting & Calisthenics',
    exp: '9 Years', rating: '4.9', clients: '80+',
    bio: 'State powerlifting champion. Coaches athletes on deadlift, squat, and bench mechanics with precision technique focus. Holds state records in 3 weight classes.',
    certifications: ['NSCA-CPT', 'Powerlifting Coach', 'Calisthenics Specialist'],
    color: 'linear-gradient(135deg,#1a0a00,#2a1505)',
    accent: '#e87c00',
  },
  {
    initials: 'KI', name: 'Kavya Iyer', specialty: 'Spin & Cardio',
    exp: '5 Years', rating: '4.9', clients: '150+',
    bio: 'Certified spin instructor and cardio specialist. Brings infectious energy to every class. Expert in heart rate zone training and endurance programming.',
    certifications: ['Spinning Certified', 'ACE Personal Trainer', 'Nutrition Advisor'],
    color: 'linear-gradient(135deg,#0d001a,#160528)',
    accent: '#9b5de5',
  },
  {
    initials: 'SM', name: 'Sneha Murugan', specialty: 'Nutrition & Wellness',
    exp: '6 Years', rating: '5.0', clients: '200+',
    bio: 'Registered dietitian and wellness coach. Creates science-backed nutrition plans tailored to individual goals — weight loss, muscle gain, or athletic performance.',
    certifications: ['Registered Dietitian', 'Sports Nutritionist', 'Wellness Coach'],
    color: 'linear-gradient(135deg,#001515,#022525)',
    accent: '#0dcfa0',
  },
];

export default function Trainers() {
  const [selected, setSelected] = useState(null);
  const showToast = useContext(ToastContext);

  return (
    <main style={{ paddingTop: '64px' }}>
      <section className="section">
        <div className="section-tag" data-aos="fade-down">Our Team</div>
        <div className="section-title" data-aos="fade-up">MEET THE TRAINERS</div>
        <div className="section-sub" data-aos="fade-up" data-aos-delay="100">
          Certified professionals dedicated to pushing you beyond your perceived limits.
        </div>

        <div className="trainers__grid">
          {trainers.map((t, idx) => (
            <div key={t.name} data-aos="fade-up" data-aos-delay={idx * 100} style={{ display: 'flex' }}>
              <div
                className={`trainer-card ${selected?.name === t.name ? 'active' : ''}`}
                onClick={() => setSelected(selected?.name === t.name ? null : t)}
                style={{ width: '100%' }}
              >
                <div className="trainer-card__avatar" style={{ background: t.color }}>
                <span className="trainer-card__initials">{t.initials}</span>
              </div>
              <div className="trainer-card__info">
                <h3 className="trainer-card__name">{t.name}</h3>
                <div className="trainer-card__specialty" style={{ color: t.accent }}>
                  {t.specialty}
                </div>
                <div className="trainer-card__meta">
                  <span>⭐ {t.rating}</span>
                  <span>📅 {t.exp}</span>
                  <span>👥 {t.clients}</span>
                </div>
              </div>

              {/* Expanded detail */}
              {selected?.name === t.name && (
                <div className="trainer-card__detail">
                  <p className="trainer-card__bio">{t.bio}</p>
                  <div className="trainer-card__certs-label">Certifications</div>
                  <ul className="trainer-card__certs">
                    {t.certifications.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <button
                    className="trainer-card__book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(`Session booked with ${t.name}!`);
                    }}
                  >
                    Book a Session
                  </button>
                </div>
              )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
