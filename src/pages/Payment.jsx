import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import qrImage from '../image/QR.jpeg';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { planName, amount, upiString } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!planName) {
    return (
      <main className="payment-page" style={{ paddingTop: '64px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>No plan selected.</h2>
          <button onClick={() => navigate('/membership')} className="btn-primary" style={{ marginTop: '2rem' }}>
            Back to Plans
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="payment-page" style={{ paddingTop: '64px', paddingBottom: '4rem' }}>
      <section className="section" style={{ width: '100%', padding: '2rem 1.4rem' }}>
        <div className="section-tag" style={{ justifyContent: 'center' }} data-aos="fade-down">Secure Checkout</div>
        <div className="section-title" style={{ textAlign: 'center' }} data-aos="fade-up">COMPLETE YOUR PAYMENT</div>
        <div className="section-sub" style={{ textAlign: 'center', margin: '0 auto 3rem' }} data-aos="fade-up" data-aos-delay="100">
          Scan the QR code below to pay securely via any UPI app.
        </div>

        <div className="payment__card" data-aos="flip-up" data-aos-delay="200">
          <div className="payment__summary">
            <h3>Order Summary</h3>
            <div className="payment__detail">
              <span>Plan:</span> 
              <span style={{ color: 'white', fontWeight: 'bold' }}>{planName}</span>
            </div>
            <div className="payment__detail">
              <span>Total Amount:</span> 
              <span className="payment__amount">₹{amount}</span>
            </div>
          </div>

          <div className="payment__qr-box">
             <img src={qrImage} alt="Payment QR" className="payment__qr-img" />
             <p className="payment__qr-note">Open GPay, PhonePe, or Paytm and scan to pay.</p>
          </div>
          
          <div className="payment__actions">
             <a href={upiString} className="btn-primary">
               Tap to Pay (If on Mobile)
             </a>
             <button className="btn-outline" onClick={() => navigate('/membership')} style={{ width: '100%' }}>
               Cancel & Go Back
             </button>
          </div>
        </div>
      </section>
    </main>
  );
}
