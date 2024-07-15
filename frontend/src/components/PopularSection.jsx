import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { popularRecipes } from "../data/popularRecipes";
import PopularCard from "../components/PopularCard";
import panImg from "./../assets/home/pan-cut.png";
import vegBlurredImg from "./../assets/home/blurred-veg.png";

gsap.registerPlugin(ScrollTrigger);

const PopularSection = () => {
    const gridRef = useRef(null);
    const imgRef = useRef(null);
    const img2Ref = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const tlPopular = gsap.timeline({
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top bottom",
                end: "bottom center",
            },
        });

        tlPopular.from(".popular-card", {
            opacity: 0,
            duration: 1,
            y: 200,
            stagger: 0.3,
        });

        gsap.to(imgRef.current, {
            scrollTrigger: {
                scrub: 1,
            },
            y: -250,
        });

        gsap.to(containerRef.current, {
            scrollTrigger: {
                scrub: 1,
            },
            y: -50,
        });
    }, []);

    return (
        <div className="home_popular">
            <div className="container" ref={containerRef}>
                <div className="home_popular__title">Recommended recipes</div>
                <div className="home_popular__grid" ref={gridRef}>
                    {popularRecipes.map((recipe) => (
                        <PopularCard key={recipe.title} title={recipe.title} description={recipe.description} link={recipe.link} img={recipe.img} />
                    ))}
                </div>
            </div>
            <div className="home_popular__img" ref={imgRef}>
                <img src={panImg} alt="Pan with cutlery" />
            </div>

            <div className="home_popular__img--2" ref={img2Ref}>
                <img src={vegBlurredImg} alt="Vegetables" />
            </div>
        </div>
    );
};

export default PopularSection;
