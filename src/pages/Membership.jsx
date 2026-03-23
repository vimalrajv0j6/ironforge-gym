import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../App';
import './Membership.css';
import qrImage from '../image/QR.jpeg';

const plans = [
  {
    tag: 'Starter',
    name: 'Basic',
    price: '999',
    featured: false,
    badge: null,
    features: [
      { text: 'Gym floor access (6 AM – 10 PM)', included: true },
      { text: 'Locker room access',               included: true },
      { text: '2 group classes / week',           included: true },
      { text: 'Fitness assessment (monthly)',     included: true },
      { text: 'Personal trainer sessions',        included: false },
      { text: 'Nutrition plan',                   included: false },
      { text: '24/7 access',                      included: false },
      { text: 'Sauna & steam room',               included: false },
    ],
  },
  {
    tag: 'Best Value',
    name: 'Pro',
    price: '1,999',
    featured: true,
    badge: 'Most Popular',
    features: [
      { text: 'Gym floor access (5 AM – 11 PM)', included: true },
      { text: 'Locker room & sauna',              included: true },
      { text: 'Unlimited group classes',          included: true },
      { text: 'Fitness assessment (monthly)',     included: true },
      { text: '4 PT sessions / month',            included: true },
      { text: 'Basic nutrition plan',             included: true },
      { text: '24/7 access',                      included: false },
      { text: 'Priority class booking',           included: false },
    ],
  },
  {
    tag: 'Premium',
    name: 'Elite',
    price: '3,499',
    featured: false,
    badge: null,
    features: [
      { text: 'Gym floor — 24/7 access',          included: true },
      { text: 'Locker, sauna & spa',              included: true },
      { text: 'Unlimited group classes',          included: true },
      { text: 'Fitness assessment (weekly)',       included: true },
      { text: 'Unlimited PT sessions',            included: true },
      { text: 'Full nutrition coaching',          included: true },
      { text: 'Priority class booking',           included: true },
      { text: 'Guest passes (2/month)',            included: true },
    ],
  },
];

const faqs = [
  { q: 'Is there a joining fee?', a: 'No joining fee during our current launch offer. You only pay the monthly subscription.' },
  { q: 'Can I freeze my membership?', a: 'Yes. Pro and Elite members can freeze their membership for up to 2 months per year at no charge.' },
  { q: 'How does the free trial work?', a: 'All plans include a 7-day free trial with full access. No credit card required to start.' },
  { q: 'Can I upgrade my plan?', a: 'Absolutely. You can upgrade at any time and we will pro-rate the difference for the remaining days in your cycle.' },
  { q: 'What is the cancellation policy?', a: 'Cancel anytime with 30 days notice. No hidden charges or penalties.' },
];

export default function Membership() {
  const navigate = useNavigate();
  const showToast = useContext(ToastContext);
  const [openFaq, setOpenFaq] = useState(null);
  const [billing, setBilling] = useState('monthly');

  const getPrice = (price, plan) => {
    if (billing === 'annual') {
      const num = parseInt(price.replace(',', ''));
      return Math.round(num * 0.8).toLocaleString('en-IN');
    }
    return price;
  };

  return (
    <main style={{ paddingTop: '64px' }}>
      {/* Plans */}
      <section className="section">
        <div className="section-tag" data-aos="fade-down">Pricing Plans</div>
        <div className="section-title" data-aos="fade-up">CHOOSE YOUR PLAN</div>
        <div className="section-sub">
          No hidden fees. Cancel anytime. Start with a 7-day free trial on any plan.
        </div>

        {/* Billing toggle */}
        <div className="membership__billing-toggle">
          <button
            className={`billing-btn ${billing === 'monthly' ? 'active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`billing-btn ${billing === 'annual' ? 'active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annual <span className="billing-save">Save 20%</span>
          </button>
        </div>

        <div className="plans__grid">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}
              data-aos="fade-up" 
              data-aos-delay={idx * 150}
            >
              {plan.badge && <div className="plan-card__badge">{plan.badge}</div>}
              <div className="plan-card__tag">{plan.tag}</div>
              <div className="plan-card__name">{plan.name}</div>
              <div className="plan-card__price">
                <span className="plan-card__currency">₹</span>
                <span className="plan-card__amount">{getPrice(plan.price, plan.name)}</span>
                <span className="plan-card__period">/ month</span>
              </div>
              {billing === 'annual' && (
                <div className="plan-card__annual-note">billed annually</div>
              )}

              <ul className="plan-card__features">
                {plan.features.map(({ text, included }) => (
                  <li key={text} className={included ? '' : 'excluded'}>
                    <span className={`plan-card__check ${included ? 'yes' : 'no'}`}>
                      {included ? '✓' : '×'}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <button
                className={`plan-card__btn ${plan.featured ? 'plan-card__btn--solid' : 'plan-card__btn--outline'}`}
                onClick={() => {
                  const amt = getPrice(plan.price, plan.name).replace(/,/g, '');
                  const upiString = `upi://pay?pa=vimlarajv0r6@okaxis&pn=IronForge&am=${amt}&cu=INR`;
                  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  
                  if (isMobile) {
                    window.location.href = upiString;
                  } else {
                    navigate('/payment', { state: { planName: plan.name, amount: getPrice(plan.price, plan.name), upiString } });
                  }
                }}
              >
                Pay ₹{getPrice(plan.price, plan.name)} via GPay
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section membership__faq" style={{ background: '#0d0d0d' }}>
        <div className="section-tag" data-aos="fade-down">FAQs</div>
        <div className="section-title" data-aos="fade-up">COMMON QUESTIONS</div>
        <div className="faq__list">
          {faqs.map(({ q, a }, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div
                className={`faq__item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq__question">
                  <span>{q}</span>
                  <span className="faq__icon">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <div className="faq__answer">{a}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
