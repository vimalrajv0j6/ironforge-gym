import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Schedule from './pages/Schedule';
import Trainers from './pages/Trainers';
import Membership from './pages/Membership';
import BmiCalculator from './pages/BmiCalculator';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const ToastContext = React.createContext(null);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [toast, setToast] = useState({ msg: '', visible: false });

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/classes"     element={<Classes />} />
          <Route path="/schedule"    element={<Schedule />} />
          <Route path="/trainers"    element={<Trainers />} />
          <Route path="/membership"  element={<Membership />} />
          <Route path="/bmi"         element={<BmiCalculator />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/payment"     element={<Payment />} />
        </Routes>
        <Footer />
        <Toast message={toast.msg} visible={toast.visible} />
      </Router>
    </ToastContext.Provider>
  );
}
