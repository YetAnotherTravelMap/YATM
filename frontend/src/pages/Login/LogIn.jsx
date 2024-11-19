// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from './../../hooks/UseAuth.jsx'
import './Login.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        login(username, password).then(() => {
            setSuccess(true);
            const storedRedirectUrl = localStorage.getItem('redirectUrl')
            localStorage.removeItem('redirectUrl')
            navigate(state?.path || storedRedirectUrl || "/");

        }).catch(error => setError("Incorrect username or password."));
};

    return (
        <div className="login-container">
            {error && <p style = {{color : 'red'}}>{error}</p>}
            {success ? (
                <p className={"success-message"}>Login successful!</p>
            ) : (
                <form className={"login-form"} onSubmit={handleSubmit}>
                    <h1 className={"form-mini-title"}>Login</h1>
                    <h2 className={"form-title"}>Welcome Back!</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            placeholder={"traveller1"}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className={"login-button"}>Log in</button>
                    <div className={"disclaimer-text"}>
                        Don't have an account? <Link to="/Register" className="register-link">Register</Link>
                    </div>
                </form>
            )}
        </div>
    )
}