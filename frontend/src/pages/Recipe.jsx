import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "./../components/BackButton";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://cookbook-mern.onrender.com/recipes/${id}`);
                setRecipe(response.data.recipe);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="recipe-details">
                <div className="container">
                    <BackButton />
                    <Loader />
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return <NotFound />;
    }

    return (
        <div className="recipe-details">
            <div className="container">
                <BackButton />
                <div className="recipe-details_item">
                    <div className="recipe-details_item__title">{recipe.title}</div>
                    <div className="recipe-details_item__img">
                        <img src={recipe.imageUrl} alt={recipe.title} />
                    </div>

                    <div className="recipe-details_item__text">
                        <div className="recipe-details_item__ingredients">
                            <span className="title">Ingredients:</span>
                            <div className="ingredients-list">
                                <ul>
                                    {recipe.ingredients.map((item) => (
                                        <li key={item}>
                                            <label>
                                                <input type="checkbox" />
                                                <div className="checkbox-icon"></div>
                                                <span>{item}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="recipe-details_item__row">
                            <span className="title">Cooking time:</span>
                            <span>{recipe.cookingTime}</span>
                        </div>

                        {recipe.sourceUrl && (
                            <div className="recipe-details_item__row">
                                <span className="title">Video/recipe URL:</span>
                                <span>
                                    <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a>
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="recipe-details_item__steps">
                        <ul className="steps">
                            {recipe.cookingSteps.map((step, index) => (
                                <li className="steps__item" key={index}>
                                    <div className="steps__item_num">Step {index + 1}</div>
                                    <div className="steps__item_text">{step}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipe;