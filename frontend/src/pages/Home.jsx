import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { popularRecipes } from "../data/popularRecipes";
import PopularCard from "../components/PopularCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Home = () => {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);
    // const container = useRef();

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".home_hero .container",
            },
        });
        tl.from(".home_hero .container", {
            opacity: 0,
            scale: 0.8,
            duration: 2,
        }).to(".home_hero .container", {
            opacity: 1,
            scale: 1,
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
