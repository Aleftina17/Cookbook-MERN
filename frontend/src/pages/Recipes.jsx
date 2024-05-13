import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/recipes")
            .then((res) => {
                setRecipes(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="recipes">
            <div className="container">
                <div className="recipes_top">
                    <div className="recipes_search">
                        <input 
                        type="search" 
                        placeholder="Search for recipes"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                         />
                        <button>
                            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="25" cy="25" r="25" fill="#97B04F" />
                                <path
                                    d="M22.5718 13C17.2801 13 13 17.1819 13 22.3524C13 27.5229 17.2801 31.7049 22.5718 31.7049C24.4611 31.7049 26.2097 31.1633 27.6921 30.2436L34.607 37L37 34.6619L30.173 28.0086C31.4003 26.4355 32.1437 24.4864 32.1437 22.3524C32.1437 17.1819 27.8636 13 22.5718 13ZM22.5718 15.2006C26.6254 15.2006 29.8915 18.3918 29.8915 22.3524C29.8915 26.313 26.6254 29.5043 22.5718 29.5043C18.5183 29.5043 15.2522 26.313 15.2522 22.3524C15.2522 18.3918 18.5183 15.2006 22.5718 15.2006Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="recipes_filters-btn">
                        <button className="btn btn_primary">
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
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="recipes_items">
                        {filteredRecipes.map((recipe, index) => (
                            <Link to={`/recipes/details/${recipe._id}`} className="recipes_item" key={recipe._id}>
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

                <div className="recipes_pagination">
                    <button className="pagination-btn pagination-btn-prev">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="#525252" />
                        </svg>
                    </button>

                    <button className="pagination-btn pagination-btn-num active">1</button>
                    <button className="pagination-btn pagination-btn-num">2</button>
                    <button className="pagination-btn pagination-btn-num">3</button>

                    <button className="pagination-btn pagination-btn-next">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="#525252" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Recipes;


