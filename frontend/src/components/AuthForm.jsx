import React, { useState } from "react";
import Loader from "./../components/Loader";

const AuthForm = ({ username, setUsername, password, setPassword, repeatPassword, setRepeatPassword, passwordError, label, onSubmit, id, description }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form className="auth_form" id={id} onSubmit={handleSubmit}>
            <div className="auth_form__desc">{description}</div>
            <div className="auth_form__inputs">
                <div className="auth_form__input">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter your username" value={username} className="input" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="auth_form__input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" value={password} className="input" onChange={setPassword} />
                </div>
                {repeatPassword !== undefined && setRepeatPassword && (
                    <div className={`auth_form__input ${passwordError ? "error" : ""}`}>
                        <label htmlFor="repeatPassword">Repeat Password:</label>
                        <input type="password" id="repeatPassword" placeholder="Repeat your password" value={repeatPassword} className="input" onChange={setRepeatPassword} />
                        {passwordError && <span className="error_message">Passwords do not coincide. Try again.</span>}
                    </div>
                )}
            </div>
            <button className="btn btn_primary" type="submit" disabled={loading}>
                {loading ? <Loader /> : <span>{label}</span>}
            </button>
        </form>
    );
};

export default AuthForm;
