import React from "react";
import { Link } from 'react-router-dom'
import { popularRecipes } from "../data/popularRecipes";
import PopularCard from "../components/PopularCard";

const Home = () => {
    return (
        <div className="home">
            <div className="home_hero">
                <div className="container">
                    <div className="home_hero__title">Best food for your taste</div>
                    <div className="home_hero__desc">Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</div>
                    <div className="home_hero__btns">
                        <Link to="/recipes" className="btn btn_primary"><span>Go to cookbook</span></Link>
                        <Link to='/recipes/create' className="btn btn_secondary"><span>Add a recipe</span></Link>
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