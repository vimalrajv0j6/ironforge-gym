import React, { useState, useContext } from 'react';
import { ToastContext } from '../App';
import './Contact.css';

const infoItems = [
  {
    icon: '📍',
    label: 'Location',
    lines: ['12, Race Course Road', 'Trichy, Tamil Nadu 641018'],
  },
  {
    icon: '📞',
    label: 'Phone',
    lines: ['+91 63809 79708'],
  },
  {
    icon: '✉️',
    label: 'Email',
    lines: ['vimalrajvj06@gmail.com'],
  },
  {
    icon: '🕐',
    label: 'Hours',
    lines: ['Mon – Fri: 5:00 AM – 11:00 PM', 'Sat – Sun: 6:00 AM – 9:00 PM'],
    extra: 'Elite Members: 24/7 Access',
  },
];

const interests = [
  'General Membership',
  'Personal Training',
  'Group Classes',
  'Nutrition Coaching',
  'Corporate Fitness',
  'Other',
];

export default function Contact() {
  const showToast = useContext(ToastContext);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', interest: interests[0], message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim())  newErrors.lastName  = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.message.trim()) newErrors.message = 'Please enter a message';
    return newErrors;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    try {
      await fetch("https://formsubmit.co/ajax/vimalrajvj06@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      });
      setForm({ firstName:'', lastName:'', email:'', phone:'', interest: interests[0], message:'' });
      setErrors({});
      showToast('Message sent! We\'ll be in touch shortly.');
    } catch(err) {
      showToast('There was an error sending your message. Please try again.');
    }
  };

  return (
    <main style={{ paddingTop: '64px' }}>
      <section className="section">
        <div className="section-tag" data-aos="fade-down">Get in Touch</div>
        <div className="section-title" data-aos="fade-up">CONTACT US</div>
        <div className="section-sub" data-aos="fade-up" data-aos-delay="100">
          Have a question or want to learn more? Reach out to us!
        </div>

        <div className="contact__layout">
          {/* Info */}
          <div className="contact__info" data-aos="fade-right" data-aos-delay="200">
            {infoItems.map(({ icon, label, lines, extra }) => (
              <div className="contact__info-item" key={label}>
                <div className="contact__info-icon">{icon}</div>
                <div>
                  <div className="contact__info-label">{label}</div>
                  {lines.map((line, i) => (
                    <div className="contact__info-value" key={i}>{line}</div>
                  ))}
                  {extra && <div className="contact__info-extra">{extra}</div>}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="contact__map">
              <div className="contact__map-inner">
                <span style={{ fontSize:'2rem' }}>📍</span>
                <div style={{ marginTop:'0.5rem', fontSize:'0.82rem', color:'#555' }}>
                  12, Race Course Road, Trichy
                </div>
                <a
                  href="https://maps.google.com/?q=Race+Course+Road+Trichy"
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop:'0.8rem', display:'inline-block', fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'var(--red)', textDecoration:'none' }}
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact__form-wrap" data-aos="fade-left" data-aos-delay="300">
            <h3 className="contact__form-title">Send us a message</h3>

            <div className="contact__form-row">
              <div className="contact__form-group">
                <label className="form-label">First Name</label>
                <input
                  className={`form-input ${errors.firstName ? 'input--error' : ''}`}
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Raj"
                />
                {errors.firstName && <span className="contact__field-error">{errors.firstName}</span>}
              </div>
              <div className="contact__form-group">
                <label className="form-label">Last Name</label>
                <input
                  className={`form-input ${errors.lastName ? 'input--error' : ''}`}
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Kumar"
                />
                {errors.lastName && <span className="contact__field-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="contact__form-group">
              <label className="form-label">Email</label>
              <input
                className={`form-input ${errors.email ? 'input--error' : ''}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="raj@email.com"
              />
              {errors.email && <span className="contact__field-error">{errors.email}</span>}
            </div>

            <div className="contact__form-row">
              <div className="contact__form-group">
                <label className="form-label">Phone (optional)</label>
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="contact__form-group">
                <label className="form-label">Interested In</label>
                <select className="form-input form-select" name="interest" value={form.interest} onChange={handleChange}>
                  {interests.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>

            <div className="contact__form-group">
              <label className="form-label">Message</label>
              <textarea
                className={`form-input form-textarea ${errors.message ? 'input--error' : ''}`}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your fitness goals..."
              />
              {errors.message && <span className="contact__field-error">{errors.message}</span>}
            </div>

            <button className="btn-primary contact__submit-btn" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
