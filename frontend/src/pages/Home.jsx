import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { popularRecipes } from "../data/popularRecipes";
import PopularCard from "../components/PopularCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
        tlHero.fromTo(".home_hero__btns .btn", { y: 50, opacity: 0, scale: 0.6 }, { y: 0, scale: 1, opacity: 1, duration: 1.5 }, "-=0.1");
        tlHero.fromTo(".home_hero__desc", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });

        tlPopular.from(".popular-card", {
            opacity: 0,
            duration: 1,
            y: 200,
            stagger: 0.5,
        });
    }, []);

    return (
        <div className="home">
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
            <div className="home_popular">
                <div className="container">
                    <div className="home_popular__title">Recommended recipes</div>
                    <div className="home_popular__grid">
                        {popularRecipes.map((recipe) => {
                            return <PopularCard key={recipe.title} title={recipe.title} description={recipe.description} link={recipe.link} img={recipe.img} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
