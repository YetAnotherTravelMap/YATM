// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import classes from './Register.module.css';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/UseAuth.jsx";

export function Register() {
    const [firstName, setFirstName] = useState('firstname');
    const [lastName, setLastName] = useState('lastname');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [hash, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { authed } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authed) {
            navigate('/');
        }
    }, [authed, navigate]);

    useEffect(() => {
        if (success) {
            // Redirect to login page after 2 seconds
            const timer = setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

            // Cleanup timeout if component unmounts before 2 seconds
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({firstName, lastName, hash, username, email })
            });

            if (!response.ok) {
                if(response.status === 409) {
                    const tempErrorMessage = await response.text();
                    throw new Error(tempErrorMessage);
                }
                throw new Error('Registration failed');
            }

            setErrorMessage('');
            setSuccess(true); // Set success state to true on successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    const passwordsMatch = hash && password2 && hash === password2

    return (
        <div className={classes["register-container"]}>
            {success ? (
                <p className={classes["success-message"]}>Registration successful! Redirecting to login...</p>
            ) : (
                <form className={classes["register-form"]} onSubmit={handleSubmit}>
                    <h1 className={classes["form-mini-title"]}>Register</h1>
                    <h2 className={classes["form-title"]}>Welcome!</h2>
                    <div className={classes["form-group"]}>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="traveller1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={classes["input-field"]}
                        />
                    </div>
                    <div className={classes["form-group"]}>
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={classes["input-field"]}
                        />
                    </div>
                    <div className={classes["form-group"]}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={hash}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                            className={classes["input-field"]}
                        />
                    </div>
                    <div className={classes["form-group"]}>
                        <label>Re-enter Password</label>
                        <input
                            type="password"
                            value={password2}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                            className={classes["input-field"]}
                        />
                        {error && <p style = {{color : 'red'}}>{error}</p>}
                        {!passwordsMatch && password2 && (
                            <p className={classes["error-message"]}>Passwords do not match</p>
                        )}
                    </div>
                    <button type="submit" className={classes["register-button"]} disabled = {!passwordsMatch}>Register</button>
                    <div className={classes["disclaimer-text"]}>
                        Already have an account? <Link to="/login" className={classes["login-link"]}>Log in</Link>
                    </div>
                </form>
            )}
        </div>
    )
}