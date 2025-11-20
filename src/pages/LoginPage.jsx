import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const demoUsers = {
    "MLfinance@corp.kz": "secret",
    "user@smartcredit.kz": "password"
};


export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (demoUsers[email] === pass) {
            setError("");
            // Редирект на dashboard:
            navigate("/dashboard");
            // Успешный вход (например, вызвать onLogin или перейти на DashboardPage)
            if (onLogin) onLogin({ email });
        } else {
            setError("Incorrect email or password");
        }
    }


    return (
        <div className="login-bg">
            <div className="login-centered">
                <div className="login-card">
                    <div className="login-logo">
                        <span role="img" aria-label="logo" className="login-card-icon">💳</span>
                        <span className="login-card-title">Smart Credit</span>
                        <div className="login-card-desc">Credit clarity for small businesses</div>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3 className="login-form-title">Sign in to Smart Credit</h3>
                        <div className="login-label-input">
                            <label htmlFor="login-email">Business email</label>
                            <input
                                id="login-email"
                                className="login-input"
                                type="email"
                                autoComplete="username"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="your@email.kz"
                            />
                        </div>
                        <div className="login-label-input">
                            <label htmlFor="login-pass">Password</label>
                            <input
                                id="login-pass"
                                className="login-input"
                                type="password"
                                autoComplete="current-password"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="login-form-footer">
                            <label className="login-remember"><input type="checkbox"/> Remember me</label>
                            <a href="#" className="login-link">Forgot password?</a>
                        </div>
                        {error && <div className="login-error">{error}</div>}
                        <button type="submit" className="login-btn">Sign in</button>
                        <button type="button" className="login-btn login-btn-bank" disabled>
                            <span role="img" aria-label="bank" className="bank-icon">🏦</span> Sign in with Bank
                        </button>
                        <div className="login-bottom-text">New user? <span className="login-link">Create account</span></div>
                        <div className="login-secure-text">Your data is encrypted and stored securely</div>
                    </form>
                </div>
            </div>
        </div>
    );
}
