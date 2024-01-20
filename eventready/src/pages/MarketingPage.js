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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F0E68C', padding: '20px' }}>
      <h1 style={{ color: '#800000' }}>Event Ready!</h1>
 
      <div style={{ display: 'flex', width: '80%', backgroundColor: '#FFFACD', padding: '20px', borderRadius: '10px' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#98FB98', borderRadius: '10px' }}>
          <h2 style={{ color: '#2E8B57' }}>Reminders</h2>
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
            <button style={{ backgroundColor: '#008B8B', color: '#FFFFFF' }} onClick={addReminder}>
              Add Reminder
            </button>
          </div>
          <ul>
            {reminders.map((reminder, index) => (
              <li key={index}>
                {reminder.name} at {reminder.time}
              </li>
            ))}
          </ul>
        </div>
 
        <div style={{ flex: 1, padding: '20px', textAlign: 'center', backgroundColor: '#87CEEB', borderRadius: '10px' }}>
          <h2 style={{ color: '#191970' }}>Image Upload</h2>
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} />}
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={handleCaptionChange}
          ></textarea>
        </div>
 
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#FFD700', borderRadius: '10px' }}>
          <h2 style={{ color: '#8B4513' }}>Helpful Section</h2>
          <div>
            <h3 style={{ fontSize: '14px', color: '#FF6347' }}>Graphical Creation Sites</h3>
            {/* Add content for graphical creation sites */}
          </div>
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '14px', color: '#6A5ACD' }}>Share</h3>
            {/* Add content for sharing */}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default EventPage;