// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Register.css';
import {Link} from "react-router-dom";

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('backend.api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password1 })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            setSuccess(true); // Set success state to true on successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    const passwordsMatch = password1 && password2 && password1 === password2

    return (
        <div className="register-container">
            {error && <p style = {{color : 'red'}}>{error}</p>}
            {success ? (
                <p className={"success-message"}>Registration successful! Redirecting to login...</p>
            ) : (
                <form className={"register-form"} onSubmit={handleSubmit}>
                    <h1 className={"form-mini-title"}>Register</h1>
                    <h2 className={"form-title"}>Welcome!</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="traveller1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password1}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Re-enter Password</label>
                        <input
                            type="password"
                            value={password2}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                            className="input-field"
                        />
                        {!passwordsMatch && password2 && (
                            <p className="error-message">Passwords do not match</p>
                        )}
                    </div>
                    <button type="submit" className={"register-button"} disabled = {!passwordsMatch}>Register</button>
                    <div className={"disclaimer-text"}>
                        Already have an account? <Link to="/login" className="login-link">Log in</Link>
                    </div>
                </form>
            )}
        </div>
    )
}