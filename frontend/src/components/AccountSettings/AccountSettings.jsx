import React, { useState } from "react";
import "./AccountSettings.css";

function AccountSettings({ toggleSettingsPanel, logout, user}) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    // Handle profile picture upload
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
        console.log("Selected file:", file);
    };


    // Handle password change (does not work due to authAxios I think)
    const handlePasswordChange = async () => {
        if (password === reenterPassword) {
            try {
                const response = await fetch('/api/user/change-password', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({user, password})
                })
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Passwords do not match!");
        }
    };

    return (
        <div className="settings">
            <div className="settings-content">
                <button className="close-button" onClick={toggleSettingsPanel}>
                    &times;
                </button>
                <h2>Account Settings</h2>

                {/* Change Profile Picture */}
                <div className="settings-section">
                    <h3>Change Profile Picture</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                    />
                    <p>{profilePicture ? `Selected: ${profilePicture.name}` : "No file selected"}</p>
                </div>

                {/* Change Password */}
                <div className="settings-section">
                    <h3>Change Password</h3>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Re-enter New Password"
                        value={reenterPassword}
                        onChange={(e) => setReenterPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordChange}>Update Password</button>
                </div>

                {/* Logout Button */}
                <button className="logout-button" onClick={logout}>
                        Logout
                </button>
            </div>
        </div>
    );
}

export default AccountSettings;
