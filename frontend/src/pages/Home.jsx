import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroSection from "../components/HeroSection";
import PopularSection from "../components/PopularSection";

const Home = () => {
    gsap.registerPlugin(ScrollTrigger);

    useLayoutEffect(() => {
        const tlHero = gsap.timeline({
            scrollTrigger: {
                trigger: ".home_hero .container",
                start: "top center",
                end: "bottom center",
            },
        });

        const tlPopular = gsap.timeline({
            scrollTrigger: {
                trigger: ".home_popular__grid",
                start: "top bottom",
                end: "bottom center",
            },
        });

        tlHero.fromTo(".home_hero__title", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
        tlHero.fromTo(".home_hero__desc", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
        tlHero.fromTo(".home_hero__btns .btn", { y: 50, opacity: 0, scale: 0.6 }, { y: 0, scale: 1, opacity: 1, duration: 1.5 }, "-=0.1");

        tlPopular.from(".popular-card", {
            opacity: 0,
            duration: 1,
            y: 200,
            stagger: 0.3,
        });
    }, []);

    return (
        <div className="home">
            <HeroSection />
            <PopularSection />
        </div>
    );
};

export default Home;
