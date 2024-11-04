// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Register.css';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('backend.api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            setSuccess(true); // Set success state to true on successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            {error && <p style = {{color : 'red'}}>{error}</p>}
            {success ? (
                <p className={"success-message"}>Registration successful! Redirecting to login...</p>
            ) : (
                <form className={"register-form"} onSubmit={handleSubmit}>
                    <h1 className={"form-title"}>Register</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className={"register-button"}>Register</button>
                    <h2 className={"disclaimer-text"}>Already have an account?</h2>
                </form>
            )}
        </div>
    )
}