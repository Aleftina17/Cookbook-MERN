import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useGetUserID } from "./../hooks/useGetUserID";
import useRecipeActions from "../hooks/useRecipeActions";
import useLoadingWithMessages from "../hooks/useLoadingWithMessages";

const SavedRecipes = () => {
    const { saveRecipe, removeSavedRecipe, isRecipeSaved } = useRecipeActions();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(5);
    
    const { loadingMessage, elapsedTime } = useLoadingWithMessages("It may take up to 20 seconds to load recipes...");

    const userID = useGetUserID();

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = savedRecipes.slice(firstRecipeIndex, lastRecipeIndex);
    const totalPages = Math.ceil(savedRecipes.length / recipesPerPage);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const res = await axios.get(`https://cookbook-mern.onrender.com/recipes/saved-recipes/${userID}`);
                setSavedRecipes(res.data.savedRecipes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedRecipes();
    }, [userID]);   

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
            console.error(error);
        }
    };

    return (
        <div className="recipes">
            <div className="container">
                <div className="recipes_top">
                    <span className="recipes_title">Your Saved Recipes</span>
                </div>

                {loading ? (
                    <Loader message={loadingMessage} elapsedTime={elapsedTime}/>
                ) : savedRecipes.length === 0 ? (
                    <div className="recipes_empty">You have not saved any recipes yet</div>
                ) : (
                    <div className="recipes_items">
                        {currentRecipes.map((recipe, _) => (
                            <Link to={`/recipes/details/${recipe._id}`} className="recipes_item" key={recipe._id}>
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
                                <div className="recipes_item__img">
                                    <img src={recipe.imageUrl} alt={recipe.title} />
                                </div>
                                <div className="recipes_item__text">
                                    <div className="recipes_item__title">{recipe.title}</div>
                                    <div className="recipes_item__grid">
                                        <span className="title">Category:</span>
                                        <span>{recipe.categories?.join(", ")}</span>
                                        <span className="title">Ingredients:</span>
                                        <span>{recipe.ingredients?.join(", ")}</span>
                                        <span className="title">Time:</span>
                                        <span>{recipe.cookingTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {savedRecipes.length > recipesPerPage && <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />}
            </div>
        </div>
    );
};

export default SavedRecipes;
