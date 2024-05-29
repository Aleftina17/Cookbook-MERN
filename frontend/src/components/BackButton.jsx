import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/recipes" }) => {
    return (
        <Link to={destination} className="btn_back">
            <div className="btn-icon">
            <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 9.58333L15 19.1667L25 28.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </div>
            <span>Back to Cookbook</span>
        </Link>
    );
};

export default BackButton;
