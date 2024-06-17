import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useGetUserID } from "./../hooks/useGetUserID";
import { useSnackbar } from "notistack";
import Filter from "../components/Filter";
import { checkboxCategoriesOptions } from "../data/categories";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(5);
    const userID = useGetUserID();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://cookbook-mern.onrender.com/recipes")
            .then((res) => {
                setRecipes(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                enqueueSnackbar("Server error.", { variant: "error" });
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://cookbook-mern.onrender.com/recipes/saved-recipes/ids/${userID}`)
            .then((res) => {
                setSavedRecipes(res.data.savedRecipes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userID]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(firstRecipeIndex, lastRecipeIndex);
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    // Save or remove recipe
    const isRecipeSaved = (id) => savedRecipes.includes(id);

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

    const saveRecipe = async (recipeID) => {
        if (!userID) {
            enqueueSnackbar("Log in to save recipes.", { variant: "error" });
            return;
        }
        try {
            const response = await axios.put("https://cookbook-mern.onrender.com/recipes/save", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error("Save Recipe Error: ", error.response.data);
            enqueueSnackbar("Failed to save the recipe.", { variant: "error" });
        }
    };

    const removeSavedRecipe = async (recipeID) => {
        try {
            const response = await axios.put("https://cookbook-mern.onrender.com/recipes/remove", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error("Remove Recipe Error: ", error.response.data);
            enqueueSnackbar("Failed to remove the recipe from saved.", { variant: "error" });
        }
    };

    //filter
    const handleFilterOpen = (e) => {
    }

    return (
        <div className="recipes">
            <div className="container">
                <div className="recipes_top">
                    <div className="recipes_search">
                        <input type="search" placeholder="Search for recipes" value={searchQuery} onChange={handleSearchInputChange} />
                        <button>
                            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="25" cy="25" r="25" fill="#97B04F" />
                                <path
                                    d="M22.5718 13C17.2801 13 13 17.1819 13 22.3524C13 27.5229 17.2801 31.7049 22.5718 31.7049C24.4611 31.7049 26.2097 31.1633 27.6921 30.2436L34.607 37L37 34.6619L30.173 28.0086C31.4003 26.4355 32.1437 24.4864 32.1437 22.3524C32.1437 17.1819 27.8636 13 22.5718 13ZM22.5718 15.2006C26.6254 15.2006 29.8915 18.3918 29.8915 22.3524C29.8915 26.313 26.6254 29.5043 22.5718 29.5043C18.5183 29.5043 15.2522 26.313 15.2522 22.3524C15.2522 18.3918 18.5183 15.2006 22.5718 15.2006Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                        {/* <Filter checkboxOptions={checkboxCategoriesOptions}/> */}
                    </div>
                        <button className="recipes_filters-btn btn btn_primary" onClick={handleFilterOpen}>
                            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.23237 7.08359C3.28694 6.02694 2.81423 5.49861 2.7964 5.0496C2.78091 4.65955 2.94853 4.28465 3.24954 4.03611C3.59605 3.75 4.30498 3.75 5.72285 3.75H24.2765C25.6944 3.75 26.4033 3.75 26.7498 4.03611C27.0508 4.28465 27.2185 4.65955 27.203 5.0496C27.1851 5.49861 26.7124 6.02694 25.767 7.08359L18.6342 15.0555C18.4457 15.2662 18.3515 15.3715 18.2843 15.4913C18.2247 15.5976 18.181 15.7121 18.1545 15.8311C18.1247 15.9652 18.1247 16.1065 18.1247 16.3891V23.073C18.1247 23.3174 18.1247 23.4396 18.0853 23.5453C18.0504 23.6387 17.9938 23.7224 17.92 23.7894C17.8365 23.8653 17.723 23.9107 17.4961 24.0014L13.2461 25.7014C12.7866 25.8852 12.5569 25.9771 12.3725 25.9388C12.2113 25.9053 12.0698 25.8095 11.9787 25.6722C11.8747 25.5152 11.8747 25.2678 11.8747 24.773V16.3891C11.8747 16.1065 11.8747 15.9652 11.8448 15.8311C11.8184 15.7121 11.7746 15.5976 11.715 15.4913C11.6479 15.3715 11.5536 15.2662 11.3652 15.0555L4.23237 7.08359Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Filters</span>
                        </button>
                </div>
                {loading ? (
                    <Loader />
                ) : filteredRecipes.length === 0 ? (
                    <div className="recipes_empty">No recipes found</div>
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
                                        <span>{recipe.categories.join(", ")}</span>
                                        <span className="title">Ingredients:</span>
                                        <span>{recipe.ingredients.join(", ")}</span>
                                        <span className="title">Time:</span>
                                        <span>{recipe.cookingTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {filteredRecipes.length > recipesPerPage && <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />}
            </div>
        </div>
    );
};

export default Recipes;
