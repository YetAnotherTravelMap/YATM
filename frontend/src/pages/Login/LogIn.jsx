// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from './../../hooks/UseAuth.jsx'
import classes from './Login.module.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { login, authed } = useAuth();
    const { state } = useLocation();

    useEffect(() => {
        if (authed) {
            navigate('/');
        }
    }, [authed, navigate]);

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
        <div className={classes["login-container"]}>
            {error && <p className={classes["login-error-message"]}>{error}</p>}
            {success ? (
                <p className={classes["success-message"]}>Login successful!</p>
            ) : (
                <form className={classes["login-form"]} onSubmit={handleSubmit}>
                    <h1 className={classes["form-mini-title"]}>Login</h1>
                    <h2 className={classes["form-title"]}>Welcome Back!</h2>
                    <div className={classes["form-group"]}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            placeholder={"traveller1"}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={classes["input-field"]}
                        />
                    </div>
                    <div className={classes["form-group"]}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={classes["input-field"]}
                        />
                    </div>
                    <button type="submit" className={classes["login-button"]}>Log in</button>
                    <div className={classes["disclaimer-text"]}>
                        Don&apos;t have an account? <Link to="/Register" className={classes["register-link"]}>Register</Link>
                    </div>
                </form>
            )}
        </div>
    )
}