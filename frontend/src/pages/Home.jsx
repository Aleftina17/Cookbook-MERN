import React from "react";
import HeroSection from "../components/HeroSection";
import PopularSection from "../components/PopularSection";

const Home = () => {
    return (
        <div className="home">
            <HeroSection />
            <PopularSection />
        </div>
    );
};

export default Home;
