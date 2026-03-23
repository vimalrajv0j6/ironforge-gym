import React, { useState } from 'react';
import './BmiCalculator.css';

const bmiRanges = [
  { label: 'Severely Underweight', min: 0,    max: 16,   color: '#4a90d9', tip: 'Please consult a doctor. Our nutrition team can help you build healthy mass safely.' },
  { label: 'Underweight',          min: 16,   max: 18.5, color: '#5bb8f5', tip: 'Focus on strength training and a calorie-surplus nutrition plan. Our trainers can help you build healthy mass.' },
  { label: 'Normal Weight',        min: 18.5, max: 25,   color: '#2a9e5a', tip: 'Great foundation! Maintain your fitness with consistent training. Consider our Pro plan to optimise performance.' },
  { label: 'Overweight',           min: 25,   max: 30,   color: '#f5a623', tip: 'Our HIIT and cardio classes combined with a personalised nutrition plan can help you reach your target weight.' },
  { label: 'Obese Class I',        min: 30,   max: 35,   color: '#e87c00', tip: 'Start with low-impact classes like Yoga and Aqua Fit, then progress to HIIT. We recommend a trainer consultation.' },
  { label: 'Obese Class II+',      min: 35,   max: 999,  color: '#e8000d', tip: 'A consultation with our trainer is recommended. Your journey starts with one step — we are here to support you.' },
];

function getBmiInfo(bmi) {
  return bmiRanges.find(r => bmi >= r.min && bmi < r.max);
}

export default function BmiCalculator() {
  const [form, setForm] = useState({ height: '', weight: '', age: '', gender: 'male' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const h = parseFloat(form.height);
    const w = parseFloat(form.weight);
    if (!h || !w || h < 100 || h > 250 || w < 30 || w > 300) {
      setResult({ error: 'Please enter valid height (100–250 cm) and weight (30–300 kg).' });
      return;
    }
    const bmi = w / ((h / 100) ** 2);
    const bmiRounded = Math.round(bmi * 10) / 10;
    const info = getBmiInfo(bmiRounded);
    const idealMin = Math.round(18.5 * ((h / 100) ** 2));
    const idealMax = Math.round(24.9 * ((h / 100) ** 2));
    setResult({ bmi: bmiRounded, info, idealMin, idealMax });
  };

  const barPercent = result && !result.error
    ? Math.min(100, Math.max(0, ((result.bmi - 10) / (45 - 10)) * 100))
    : 0;

  return (
    <main style={{ paddingTop: '64px' }}>
      <section className="section">
        <div className="section-tag" data-aos="fade-down">Fitness Metrics</div>
        <div className="section-title" data-aos="fade-up">BMI CALCULATOR</div>
        <div className="section-sub" data-aos="fade-up" data-aos-delay="100">
          Calculate your Body Mass Index to understand your current fitness baseline.
        </div>

        <div className="bmi__layout">
          {/* Form */}
          <div className="bmi__form-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="bmi__form-grid">
              <div>
                <label className="form-label">Height (cm)</label>
                <input
                  className="form-input"
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="e.g. 170"
                  min="100" max="250"
                />
              </div>
              <div>
                <label className="form-label">Weight (kg)</label>
                <input
                  className="form-input"
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g. 70"
                  min="30" max="300"
                />
              </div>
              <div>
                <label className="form-label">Age</label>
                <input
                  className="form-input"
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  min="10" max="100"
                />
              </div>
              <div>
                <label className="form-label">Gender</label>
                <select className="form-input form-select" name="gender" value={form.gender} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button className="btn-primary bmi__calc-btn" onClick={calculate}>
              Calculate BMI
            </button>

            {result?.error && (
              <div className="bmi__error">{result.error}</div>
            )}

            {result && !result.error && (
              <div className="bmi__result">
                <div className="bmi__result-top">
                  <div>
                    <div className="bmi__num" style={{ color: result.info.color }}>
                      {result.bmi}
                    </div>
                    <div className="bmi__label">{result.info.label}</div>
                  </div>
                  <div className="bmi__ideal">
                    <div className="bmi__ideal-label">Ideal Weight Range</div>
                    <div className="bmi__ideal-value">{result.idealMin} – {result.idealMax} kg</div>
                  </div>
                </div>

                {/* Bar */}
                <div className="bmi__bar-wrap">
                  <div className="bmi__bar-track">
                    <div
                      className="bmi__bar-fill"
                      style={{ width: `${barPercent}%`, background: result.info.color }}
                    />
                    <div className="bmi__bar-marker" style={{ left: `${barPercent}%` }} />
                  </div>
                  <div className="bmi__bar-labels">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>

                <p className="bmi__tip">{result.info.tip}</p>
              </div>
            )}
          </div>

          {/* Reference table */}
          <div className="bmi__ref-card">
            <div className="bmi__ref-title">BMI Reference Table</div>
            <table className="bmi__ref-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>BMI Range</th>
                </tr>
              </thead>
              <tbody>
                {bmiRanges.map(({ label, min, max, color }) => (
                  <tr key={label}>
                    <td>
                      <span className="bmi__ref-dot" style={{ background: color }} />
                      {label}
                    </td>
                    <td style={{ color: '#888' }}>
                      {max === 999 ? `${min}+` : `${min} – ${max}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bmi__ref-note">
              BMI is a screening tool, not a diagnostic measure. Consult a healthcare professional for a complete health assessment.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
