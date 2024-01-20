import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
    const [name, setName] = useState('');
    const [userList, setUserList] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Update the user list with the new name
        setUserList((prevList) => [...prevList, name]);
        // Clear the input field
        setName('');
    };

    return (
        <div>
            <h1>QR Code</h1>

            {/* QR Code for the external form */}
            <QRCode value="URL_TO_EXTERNAL_FORM" />

            {/* User Input Form */}
            <form onSubmit={handleFormSubmit}>
                <label>
                    Enter your name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <button type="submit">Submit</button>
            </form>

            {/* User List Display */}
            <h2>User List</h2>
            <ul>
                {userList.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    );
};

export default QRCodeGenerator;

