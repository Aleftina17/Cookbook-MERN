import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "./../components/BackButton";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import useRecipeActions from "../hooks/useRecipeActions";

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { saveRecipe, removeSavedRecipe, isRecipeSaved } = useRecipeActions();

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

    // Save or remove recipe
    const toggleSaveRecipe = async (e, recipeID) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (isRecipeSaved(recipeID)) {
                await removeSavedRecipe(recipeID);
            } else {
                await saveRecipe(recipeID);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="recipe-details">
            <div className="container">
                <div className="recipe-details_top">
                    <BackButton />
                    <button onClick={(e) => toggleSaveRecipe(e, recipe._id)} className={`btn btn_like ${isRecipeSaved(recipe._id) ? "liked" : ""}`}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                stroke="#97b04f"
                                clipRule="evenodd"
                                d="M8.96173 19.4687C6.01943 17.2137 2 13.4886 2 9.96653C2 4.08262 7.50016 1.88586 12 6.43111C16.4998 1.88586 22 4.08262 22 9.9665C22 13.4887 17.9806 17.2137 15.0383 19.4687C13.7063 20.4896 13.0403 21 12 21C10.9597 21 10.2937 20.4896 8.96173 19.4687Z"
                                fill="none"
                            />
                        </svg>
                    </button>
                </div>

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
                                    <a target="_blank" href={recipe.sourceUrl}>
                                        {recipe.sourceUrl}
                                    </a>
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
