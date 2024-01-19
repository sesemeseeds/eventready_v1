import React, { useState } from 'react';
import Header from "../components/Header"
const ReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    name: '',
    time: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({
      ...newReminder,
      [name]: value
    });
  };

  const handleAddReminder = () => {
    if (newReminder.name && newReminder.time) {
      setReminders([...reminders, newReminder]);
      setNewReminder({
        name: '',
        time: ''
      });
    }
  };

  return (

    <div className="reminder-app">
      {/* Side Section */}
      <div className="side-section">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Reminder Name"
            value={newReminder.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="time"
            placeholder="Reminding Time"
            value={newReminder.time}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button onClick={handleAddReminder}>+</button>
        </div>
      </div>

      {/* Displaying Reminders */}
      <div className="reminders">
        <h2>Reminders</h2>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index}>
              <strong>{reminder.name}</strong> - {reminder.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReminderApp;

