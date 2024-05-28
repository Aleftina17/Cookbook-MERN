import React from "react";
import { Link } from 'react-router-dom'

import BurritoImg from "./../assets/food-icons/burrito.png";
import ChickenImg from "./../assets/food-icons/fried-chicken.png";
import BurgersImg from "./../assets/food-icons/burgers.png";
// import PieImg from './../assets/food-icons/apple-pie.png'
import PopularCard from "../components/PopularCard";

const Home = () => {
    const popularRecipes = [
        {
            title: "Burrito",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurritoImg,
        },
        {
            title: "Sweet and Sour Chicken",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: ChickenImg,
        },
        {
            title: "Burgers",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurgersImg,
        },
        {
            title: "Apple Pie",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurritoImg,
        },
        {
            title: "Ramen",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurritoImg,
        },
        {
            title: "Chicken Cream Soup",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurritoImg,
        },
        {
            title: "Bowl",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurritoImg,
        },
        {
            title: "Lasagna",
            description: "In the new era of technology we look in the future with certainty and pride for our life",
            link: "http://localhost:5173/recipes/details/6613ef0e97e85e00dec0f71b",
            img: BurritoImg,
        },
    ];

    return (
        <div className="home">
            <div className="home_hero">
                <div className="container">
                    <div className="home_hero__title">Best food for your taste</div>
                    <div className="home_hero__desc">Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</div>
                    <div className="home_hero__btns">
                        <Link to="/recipes" className="btn btn_primary">Go to cookbook</Link>
                        <Link to='/recipes/create' className="btn btn_secondary">Add a recipe</Link>
                    </div>
                </div>
            </div>

            <div className="home_popular">
                <div className="container">
                    <div className="home_popular__title">Popular recipes</div>
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
