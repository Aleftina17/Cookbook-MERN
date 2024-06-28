import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import axios from "axios";
import { useGetUserID } from "./../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { checkboxCategoriesOptions } from "../data/categories";
import { radioTimeOptions } from "../data/cookingTime";
import CategorySelector from "../components/CategorySelector";
import CookingTimeSelector from '../components/CookingTimeSelector'

export const CreateRecipe = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([1, 2]);
    const [selectedTime, setSelectedTime] = useState(2);
    const [formErrors, setFormErrors] = useState({});
    const userID = useGetUserID();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [dropdownStates, setDropdownStates] = useState({
        categories: false,
        cookingTime: false,
    });

    const toggleDropdown = (dropdown) => {
        setDropdownStates((prevState) => ({
            ...Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === dropdown ? !prevState[key] : false;
                return acc;
            }, {})
        }));
    };

    const handleCategoryChange = (categories) => {
        const updatedCategories = categories
            .map((categoryId) => {
                const option = checkboxCategoriesOptions.find((option) => option.id === categoryId);
                return option ? option.label : "";
            })
            .filter((label) => label !== "");

        setSelectedCategories(categories);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            categories: updatedCategories,
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            categories: categories.length > 0 ? false : true,
        }));
    };

    const handleTimeChange = (id) => {
        const selectedOption = radioTimeOptions.find((option) => option.id === id);
        setSelectedTime(id);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            cookingTime: selectedOption ? selectedOption.label : "",
        }));
    };

    //creating recipe
    const [recipe, setRecipe] = useState({
        title: "",
        categories: ["Main Meal", "Asian"],
        ingredients: [""],
        cookingTime: "60 - 120 min",
        imageUrl: "",
        sourceUrl: "",
        cookingSteps: [""],
        userOwner: userID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value,
        });

        setFormErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (value.trim()) {
                delete updatedErrors[name];
            } else {
                updatedErrors[name] = true;
            }
            return updatedErrors;
        });
    };

    const addIngredient = (e) => {
        e.preventDefault();
        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, ""],
        });
    };

    const handleIngredientChange = (e, index) => {
        const { value } = e.target;

        setRecipe((prevRecipe) => {
            const updatedIngredients = [...prevRecipe.ingredients];
            updatedIngredients[index] = value;
            const allIngredientsEmpty = updatedIngredients.every((ingredient) => ingredient.trim() === "");

            setFormErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                if (allIngredientsEmpty) {
                    updatedErrors.ingredients = true;
                } else {
                    delete updatedErrors.ingredients;
                }

                return updatedErrors;
            });

            return { ...prevRecipe, ingredients: updatedIngredients };
        });
    };

    const removeIngredient = (index) => {
        const ingredients = recipe.ingredients.filter((_, i) => {
            return i !== index;
        });
        setRecipe({ ...recipe, ingredients });
    };

    const addStep = (e) => {
        e.preventDefault();
        setRecipe({
            ...recipe,
            cookingSteps: [...recipe.cookingSteps, ""],
        });
    };

    const handleStepChange = (e, index) => {
        const { value } = e.target;

        setRecipe((prevRecipe) => {
            const updatedCookingSteps = [...prevRecipe.cookingSteps];
            updatedCookingSteps[index] = value;
            const allStepsEmpty = updatedCookingSteps.every((step) => step.trim() === "");

            setFormErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                if (allStepsEmpty) {
                    updatedErrors.cookingSteps = true;
                } else {
                    delete updatedErrors.cookingSteps;
                }
                return updatedErrors;
            });

            return { ...prevRecipe, cookingSteps: updatedCookingSteps };
        });
    };

    const removeStep = (index) => {
        const cookingSteps = recipe.cookingSteps.filter((_, i) => {
            return i !== index;
        });
        setRecipe({ ...recipe, cookingSteps });
    };

    const validateForm = () => {
        const errors = {};

        if (!recipe.title.trim()) errors.title = true;
        if (recipe.categories.length === 0) errors.categories = true;
        if (recipe.ingredients.every((ingredient) => ingredient.trim() === "")) errors.ingredients = true;
        if (recipe.cookingSteps.every((step) => step.trim() === "")) errors.cookingSteps = true;
        if (!recipe.imageUrl.trim()) errors.imageUrl = true;

        setFormErrors(errors);
        return errors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const filteredIngredients = recipe.ingredients.filter((ingredient) => ingredient.trim() !== "");
        const filteredSteps = recipe.cookingSteps.filter((step) => step.trim() !== "");

        const filteredRecipe = {
            ...recipe,
            ingredients: filteredIngredients,
            cookingSteps: filteredSteps,
        };

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            enqueueSnackbar("Fill all required fields", { variant: "error" });
            return;
        }
        if (!userID) {
            enqueueSnackbar("Log in to create recipe.", { variant: "error" });
            return;
        }
        try {
            await axios.post("https://cookbook-mern.onrender.com/recipes", filteredRecipe);
            enqueueSnackbar("Recipe successfully created!", { variant: "success" });
            navigate("/recipes");
        } catch (err) {
            console.error(err);
            enqueueSnackbar("Error occured. Check browser console for more information", { variant: "error" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create">
            <div className="container">
                <div className="create_top">
                    <BackButton />
                    <div className="create_title">Add Your Recipe</div>
                </div>
                <form onSubmit={handleSubmit} className="create_form">
                    {/* title */}
                    <div className={`create_form__item ${formErrors.title ? "error" : ""}`}>
                        <div className="title">
                            <b className="required">*</b>
                            <span>Title</span>
                        </div>
                        <div className="input">
                            <input id="titleInput" name="title" type="text" placeholder="Enter recipe title" onChange={handleChange} />
                        </div>
                    </div>
                    {/* categories */}
                    <CategorySelector 
                        selectedCategories={selectedCategories} 
                        onCategoryChange={handleCategoryChange} 
                        isOpen={dropdownStates.categories}
                        toggleDropdown={() => toggleDropdown('categories')}
                    />
                    {/* cooking time */}
                    <CookingTimeSelector 
                        selectedTime={selectedTime}
                        onTimeChange={handleTimeChange}
                        isOpen={dropdownStates.cookingTime}
                        toggleDropdown={() => toggleDropdown('cookingTime')}
                    />
                    {/* ingredients */}
                    <div className={`create_form__item ${formErrors.ingredients ? "error" : ""}`}>
                        <div className="title">
                            <b class="required">*</b>
                            <span>Ingredients</span>
                        </div>
                        <div className="desc">Your recipe should contain at least one required ingredient</div>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div className="input-wrapper">
                                <button className="btn btn_delete" type="button" onClick={() => removeIngredient(index)}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                            stroke="#474747"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <input
                                    placeholder="Enter ingredient (e.g. 'Milk, 100ml')"
                                    className="input"
                                    key={index}
                                    type="text"
                                    name="ingredients"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(e, index)}
                                />
                            </div>
                        ))}
                        <button className="btn btn_add" onClick={addIngredient}>
                            <span>Add ingredient</span>
                            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 10V20M10 15H20M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
                                    stroke="#474747"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* steps */}
                    <div className={`create_form__item ${formErrors.cookingSteps ? "error" : ""}`}>
                        <div className="title">
                            <b class="required">*</b>
                            <span>Cooking steps</span>
                        </div>
                        <div className="desc">Provide a description of at least one cooking step</div>
                        {recipe.cookingSteps.map((cookingStep, index) => (
                            <div className="textarea-wrapper">
                                <div className="textarea-wrapper_top">
                                    <button className="btn btn_delete" type="button" onClick={() => removeStep(index)}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                                stroke="#474747"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    <span>Step {index + 1}</span>
                                </div>
                                <textarea
                                    placeholder="Describe step"
                                    className="textarea"
                                    key={index}
                                    type="text"
                                    name="cookingSteps"
                                    value={cookingStep}
                                    onChange={(e) => handleStepChange(e, index)}
                                />
                            </div>
                        ))}
                        <button className="btn btn_add" onClick={addStep}>
                            <span>Add step</span>
                            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 10V20M10 15H20M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
                                    stroke="#474747"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={`create_form__item ${formErrors.imageUrl ? "error" : ""}`}>
                        <div className="title">
                            <b className="required">*</b>
                            <span>Image URL</span>
                        </div>
                        <div className="input">
                            <input id="imageInput" name="imageUrl" type="text" placeholder="Provide image URL" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="create_form__item">
                        <div className="title">
                            <span>Video/recipe URL</span>
                        </div>
                        <div className="input">
                            <input id="sourceInput" name="sourceUrl" type="text" placeholder="Provide video or recipe URL" onChange={handleChange} />
                        </div>
                    </div>
                    <button className="btn btn_primary" type="submit">
                        {loading ? <Loader /> : <span>Create recipe</span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;