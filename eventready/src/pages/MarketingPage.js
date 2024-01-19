import React, { useState } from 'react';

const EventPage = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderName, setReminderName] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const addReminder = () => {
    if (reminderName && reminderTime) {
      setReminders([...reminders, { name: reminderName, time: reminderTime }]);
      setReminderName('');
      setReminderTime('');
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Event Ready!</h1>

      <div style={{ display: 'flex', width: '80%' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Reminders</h2>
          <div>
            <input
              type="text"
              placeholder="Reminder Name"
              value={reminderName}
              onChange={(e) => setReminderName(e.target.value)}
            />
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
            <button onClick={addReminder}>Add Reminder</button>
          </div>
          <ul>
            {reminders.map((reminder, index) => (
              <li key={index}>
                {reminder.name} at {reminder.time}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
          <h2>Image Upload</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={handleCaptionChange}
          ></textarea>
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Helpful Section</h2>
          <div>
            <h3 style={{ fontSize: '14px' }}>Graphical Creation Sites</h3>
            {/* Add content for graphical creation sites */}
          </div>
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '14px' }}>Share</h3>
            {/* Add content for sharing */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
