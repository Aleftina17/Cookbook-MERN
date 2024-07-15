import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="home_hero">
            <div className="container">
                <div className="home_hero__title">Best food for your taste</div>
                <div className="home_hero__desc">Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</div>
                <div className="home_hero__btns">
                    <Link to="/recipes" className="btn btn_primary">
                        <span>Go to cookbook</span>
                    </Link>
                    <Link to="/recipes/create" className="btn btn_secondary">
                        <span>Add a recipe</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
