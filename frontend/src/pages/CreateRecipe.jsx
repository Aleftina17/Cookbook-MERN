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
import IngredientsField from "../components/IngredientsField";
import CookingStepsField from "../components/CookingStepsField";
import TextInput from "../components/TextField";

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
                    <TextInput
                        id="titleInput"
                        name="title"
                        type="text"
                        placeholder="Enter recipe title"
                        value={recipe.title}
                        onChange={handleChange}
                        error={formErrors.title}
                    />
                    <CategorySelector 
                        selectedCategories={selectedCategories} 
                        onCategoryChange={handleCategoryChange} 
                        isOpen={dropdownStates.categories}
                        toggleDropdown={() => toggleDropdown('categories')}
                    />
                    <CookingTimeSelector 
                        selectedTime={selectedTime}
                        onTimeChange={handleTimeChange}
                        isOpen={dropdownStates.cookingTime}
                        toggleDropdown={() => toggleDropdown('cookingTime')}
                    />
                    <IngredientsField
                        ingredients={recipe.ingredients}
                        handleIngredientChange={handleIngredientChange}
                        removeIngredient={removeIngredient}
                        addIngredient={addIngredient}
                        hasError={formErrors.ingredients}
                    />
                    <CookingStepsField 
                        cookingSteps={recipe.cookingSteps}
                        handleStepChange={handleStepChange}
                        removeStep={removeStep}
                        addStep={addStep}
                        hasError={formErrors.cookingSteps}
                    />
                    <TextInput
                        id="imageInput"
                        name="imageUrl"
                        type="text"
                        placeholder="Provide image URL"
                        value={recipe.imageUrl}
                        onChange={handleChange}
                        error={formErrors.imageUrl}
                    />
                    <TextInput
                        id="sourceInput"
                        name="sourceUrl"
                        type="text"
                        placeholder="Provide video or recipe URL"
                        value={recipe.sourceUrl}
                        onChange={handleChange}
                    />
                    <button className="btn btn_primary" type="submit">
                        {loading ? <Loader /> : <span>Create recipe</span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;