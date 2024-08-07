import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const logOut = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

    const handleToggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <div className={`header ${isNavOpen ? "open" : ""}`}>
            <div className="header_nav">
                <Link to="/" className="header_nav__item" onClick={closeNav}>
                    Home
                </Link>
                <Link to="/recipes" className="header_nav__item" onClick={closeNav}>
                    Recipes
                </Link>
                <Link to="/recipes/create" className="header_nav__item" onClick={closeNav}>
                    Create recipe
                </Link>
                <Link to="/saved-recipes" className="header_nav__item" onClick={closeNav}>
                    Saved recipes
                </Link>
                {!cookies.access_token ? (
                    <Link to="/auth" className="header_nav__item" onClick={closeNav}>
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={() => {
                            logOut();
                            closeNav();
                        }}
                        className="header_nav__item"
                    >
                        Logout
                    </button>
                )}
            </div>
            <button className="header_burger-btn mobile" onClick={handleToggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    );
};

export default Header;
