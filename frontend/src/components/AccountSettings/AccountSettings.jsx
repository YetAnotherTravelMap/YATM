import React, {useEffect, useState} from "react";
import classes from "./AccountSettings.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AccountSettings({ toggleSettingsPanel, logout, user }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [pwerror, setError] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const navigate = useNavigate();

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        if (password === reenterPassword) {
            try {
                const response = await axios.post('/api/user/change-password', { user, password }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                    },
                });

                if (response.status === 200) {
                    setPasswordChanged(true);
                }
            } catch (error) {
                console.error("Error changing password:", error);
            }
        } else {
            alert("Passwords do not match");
        }
    };

    const handleAccountDelete = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/delete-account', { user, currentPassword }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
            });

            if (response.status === 200) { logout(); }
        } catch (error) {
            console.error("Error changing password:", error.body);
        }

    };

    const passwordsMatch = password && reenterPassword && password === reenterPassword;

    return (
        <div className={classes.settings}>
            <div className={classes["settings-content"]}>
                <button className={classes["close-settings-button"]} onClick={toggleSettingsPanel}>
                    &times;
                </button>
                <h2>Account Settings</h2>

                {/* Change Profile Picture */}
                <div className={classes["settings-section"]}>
                    <h3>Change Profile Picture</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                    <p>{profilePicture ? `Selected: ${profilePicture.name}` : "No file selected"}</p>
                    <button
                        onClick={async () => {
                            if (profilePicture) {
                                const formData = new FormData();
                                formData.append("userId", user.userId);
                                formData.append("profilePicture", profilePicture);

                                try {
                                    const response = await axios.post(
                                        '/api/user/change-profile-picture',
                                        formData,
                                        {
                                            headers: {
                                                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                                                'Content-Type': 'multipart/form-data',
                                            },
                                        }
                                    );

                                    if (response.status === 200) {
                                        window.location.reload();
                                    }
                                } catch (error) {
                                    console.error("Error uploading profile picture:", error);
                                }
                            } else {
                                alert("Please select a file to upload.");
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>

                {/* Change Password */}
                <div className={classes["settings-section"]}>
                    <h3>Change Password</h3>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordChanged(false);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Re-enter New Password"
                        value={reenterPassword}
                        onChange={(e) => {
                            setReenterPassword(e.target.value);
                            setPasswordChanged(false);
                        }}
                    />
                    {!passwordsMatch && reenterPassword && (
                        <p className={classes["password-change-error"]}>Passwords do not match</p>
                    )}
                    {passwordChanged && (
                        <p className={classes["password-change-success"]}>Password Changed</p>
                    )}
                    <button onClick={handlePasswordChange}>Update Password</button>
                </div>

                {/* Logout Button */}
                <button className={`${classes["logout-button"]} ${classes.button}`} onClick={logout}>
                    Logout
                </button>

                <div className={classes["account-deletion"]}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={currentPassword}
                        onChange={(p) => {
                            setCurrentPassword(p.target.value);
                        }}
                    />
                    {/* Delete Account button*/}
                    <button className={`${classes["account-deletion-button"]} ${classes.button}`} onClick={handleAccountDelete}>
                        Delete Account
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AccountSettings;
