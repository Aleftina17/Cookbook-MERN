import React from "react";
import { popularRecipes } from "../data/popularRecipes";
import PopularCard from "../components/PopularCard";

const PopularSection = () => {
    return (
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
    );
};

export default PopularSection;
