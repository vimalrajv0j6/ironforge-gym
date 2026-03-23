import React, { useContext, useState } from 'react';
import { ToastContext } from '../App';
import './Schedule.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const schedule = [
  { time:'06:00 AM', name:'HIIT Blast',    trainer:'Arjun Sharma',  duration:'30 min', level:'Beginner',     spots:8,  max:20, days:['Monday','Wednesday','Friday'] },
  { time:'07:30 AM', name:'Yoga Flow',     trainer:'Priya Nair',    duration:'60 min', level:'Beginner',     spots:12, max:15, days:['Monday','Tuesday','Thursday','Saturday'] },
  { time:'09:00 AM', name:'Body Pump',     trainer:'Vikram Reddy',  duration:'60 min', level:'Intermediate', spots:6,  max:18, days:['Monday','Wednesday','Friday'] },
  { time:'11:00 AM', name:'Spin Cycle',    trainer:'Kavya Iyer',    duration:'45 min', level:'Intermediate', spots:3,  max:12, days:['Tuesday','Thursday','Saturday'] },
  { time:'01:00 PM', name:'Boxing',        trainer:'Arjun Sharma',  duration:'60 min', level:'Advanced',     spots:10, max:16, days:['Monday','Wednesday','Friday'] },
  { time:'04:00 PM', name:'Calisthenics',  trainer:'Rohan Mehta',   duration:'75 min', level:'Advanced',     spots:5,  max:10, days:['Tuesday','Thursday'] },
  { time:'05:30 PM', name:'CrossFit WOD',  trainer:'Vikram Reddy',  duration:'60 min', level:'Intermediate', spots:4,  max:15, days:['Monday','Wednesday','Friday','Sunday'] },
  { time:'07:00 PM', name:'Powerlifting',  trainer:'Rohan Mehta',   duration:'90 min', level:'Advanced',     spots:6,  max:10, days:['Tuesday','Thursday','Saturday'] },
  { time:'08:30 PM', name:'HIIT Blast',    trainer:'Kavya Iyer',    duration:'30 min', level:'Beginner',     spots:11, max:20, days:['Monday','Wednesday','Friday'] },
];

const levelClass = { Beginner: 'level--beginner', Intermediate: 'level--intermediate', Advanced: 'level--advanced' };

export default function Schedule() {
  const showToast = useContext(ToastContext);
  const [day, setDay] = useState('Monday');

  const filtered = schedule.filter(s => s.days.includes(day));

  return (
    <main style={{ paddingTop: '64px' }}>
      <section className="section">
        <div className="section-tag" data-aos="fade-down">Weekly Timetable</div>
        <div className="section-title" data-aos="fade-up">CLASS SCHEDULE</div>
        <div className="section-sub" data-aos="fade-up" data-aos-delay="100">Book your spot in advance. Classes fill up fast — reserve yours today.</div>

        <div className="schedule__days">
          {days.map(d => (
            <button
              key={d}
              className={`schedule__day-btn ${day === d ? 'active' : ''}`}
              onClick={() => setDay(d)}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="schedule__title-row">
          <span className="schedule__day-label">{day}</span>
          <span className="schedule__count">{filtered.length} classes</span>
        </div>

        <div className="schedule__table-wrap" data-aos="fade-up" data-aos-delay="200">
          <table className="schedule__table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Class</th>
                <th>Trainer</th>
                <th>Duration</th>
                <th>Level</th>
                <th>Availability</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign:'center', color:'#555', padding:'3rem' }}>No classes scheduled for {day}</td></tr>
              )}
              {filtered.map(({ time, name, trainer, duration, level, spots, max }) => (
                <tr key={time + name}>
                  <td className="schedule__time">{time}</td>
                  <td className="schedule__name">{name}</td>
                  <td className="schedule__trainer">{trainer}</td>
                  <td style={{ color:'#888', fontSize:'0.86rem' }}>{duration}</td>
                  <td><span className={`schedule__level ${levelClass[level]}`}>{level}</span></td>
                  <td>
                    <div className="schedule__spots">
                      <div className="schedule__spots-bar">
                        <div
                          className="schedule__spots-fill"
                          style={{ width: `${(spots / max) * 100}%`, background: spots / max > 0.8 ? 'var(--red)' : '#2a7a2a' }}
                        />
                      </div>
                      <span style={{ fontSize:'0.78rem', color:'#888' }}>{spots}/{max}</span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="schedule__book-btn"
                      onClick={() => showToast(`${name} booked for ${day}!`)}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
