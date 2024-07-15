import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import pizzaImg from "./../assets/home/pizza.png";
import vegBlurredImg from "./../assets/home/blurred-veg.png";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const titleRef = useRef(null);
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const img2Ref = useRef(null);

    useEffect(() => {
        if (titleRef.current) {
            const e = titleRef.current;

            e.innerHTML = e.textContent
                .replace(/(-|#|@){1}/g, (s) => s[1] + s[0])
                .replace(/(\S*)/g, (m) => {
                    return m.replace(/\S(-|#|@)?/g, '<span class="letter">$&</span>');
                });

            const letters = e.querySelectorAll(".letter");
            const lettersCount = letters.length;
            letters.forEach((l, i) => {
                l.setAttribute("style", `z-index: ${lettersCount - i};`);
            });

            const tlLetters = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                },
            });

            tlLetters.from(letters, {
                opacity: 0,
                duration: 1,
                y: -200,
                stagger: 0.2,
            });

            gsap.to(containerRef.current, {
                scrollTrigger: {
                    scrub: 1,
                },
                y: -200,
            });

            gsap.to(imgRef.current, {
                scrollTrigger: {
                    scrub: 1,
                },
                y: -50,
            });

            gsap.to(img2Ref.current, {
                scrollTrigger: {
                    scrub: 1,
                },
                y: -10,
            });
        }
    }, []);

    return (
        <div className="home_hero">
            <div className="container" ref={containerRef}>
                <div className="home_hero__title" ref={titleRef}>
                    Cookbook
                </div>
                <div className="home_hero__desc">Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven</div>
                <div className="home_hero__btns">
                    <Link to="/recipes" className="btn btn_primary">
                        <span>Go to cookbook</span>
                    </Link>
                    <Link to="/recipes/create" className="btn btn_secondary">
                        <span>Add a recipe</span>
                    </Link>
                </div>
            </div>
            <div className="home_hero__img" ref={imgRef}>
                <img src={pizzaImg} alt="Pizza" />
            </div>
            <div className="home_hero__img--2" ref={img2Ref}>
                <img src={vegBlurredImg} alt="Vegetables" />
            </div>
        </div>
    );
};

export default HeroSection;
