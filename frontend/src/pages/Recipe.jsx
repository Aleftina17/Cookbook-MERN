import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "./../components/BackButton";
import Loader from "../components/Loader";

const Recipe = () => {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/recipes/${id}`)
            .then((res) => {
                setRecipe(res.data.recipe);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (!recipe || !recipe.title) {
        return <div>No recipe found</div>;
    }

    return (
        <div className="recipe-details">
            <div className="container">
                <BackButton />
                {loading ? (
                    <Loader />
                ) : (
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
                                            <li>
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
                                    <li className="steps__item" key={step.step}>
                                        <div className="steps__item_num">Step {index + 1}</div>
                                        <div className="steps__item_text">{step.description}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipe;
