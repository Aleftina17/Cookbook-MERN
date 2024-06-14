import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const Auth = () => {
    const [activeForm, setActiveForm] = useState("login");

    const switchToLogin = () => {
        setActiveForm("login");
    };

    const switchToRegister = () => {
        setActiveForm("register");
    };

    return (
        <div className="auth">
            <div className="container">
                <div className="auth_switcher">
                    <button className={`auth_switcher__item ${activeForm === "login" ? "active" : ""}`} id="loginSwitcher" onClick={switchToLogin}>
                        Login
                    </button>
                    <button className={`auth_switcher__item ${activeForm === "register" ? "active" : ""}`} id="registerSwitcher" onClick={switchToRegister}>
                        Register
                    </button>
                </div>
                {activeForm === "login" && <Login />}
                {activeForm === "register" && <Register switchToLogin={switchToLogin} />}
            </div>
        </div>
    );
};

export default Auth;
