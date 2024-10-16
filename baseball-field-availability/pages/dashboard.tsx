import { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationSettings from '../components/NotificationSettings';

const Dashboard = () => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState('');
  const [ground, setGround] = useState('');

  useEffect(() => {
    if (date && ground) {
      axios.get(`/api/data?date=${date}&ground=${ground}`)
        .then(response => {
          setAvailability(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [date, ground]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Ground:
          <input type="text" value={ground} onChange={e => setGround(e.target.value)} />
        </label>
      </div>
      <div>
        <h2>Availability</h2>
        <ul>
          {availability.map((item, index) => (
            <li key={index}>{item.time}: {item.status}</li>
          ))}
        </ul>
      </div>
      <NotificationSettings />
    </div>
  );
};

export default Dashboard;
