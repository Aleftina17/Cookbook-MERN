import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import CheckboxList from "../components/CheckboxList";
import RadioList from "../components/RadioList";

export const CreateRecipe = () => {
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([1, 2]);
    const [selectedTime, setSelectedTime] = useState(2);

    const checkboxCategoriesOptions = [
        { id: 1, label: "Main meal" },
        { id: 2, label: "Asian" },
        { id: 3, label: "Italian" },
        { id: 4, label: "Soup" },
        { id: 5, label: "Dessert" },
        { id: 6, label: "Salad" },
        { id: 7, label: "Pastry" },
        { id: 8, label: "Mexican" },
        { id: 9, label: "Indian" },
    ];

    const radioTimeOptions = [
        { id: 1, label: "less than 30 min" },
        { id: 2, label: "30 - 60 min" },
        { id: 3, label: "60 - 120 min" },
        { id: 4, label: "more than 120 min" },
    ];

    const toggleDropdown = (dropdownId) => {
        setDropdownOpen((prevOpen) => {
            const updatedOpen = { ...prevOpen };
            Object.keys(prevOpen).forEach((id) => {
                if (id !== dropdownId) {
                    updatedOpen[id] = false;
                }
            });
            updatedOpen[dropdownId] = !prevOpen[dropdownId];
            return updatedOpen;
        });
    };

    const handleCategoryChange = (categories) => {
        const updatedCategories = categories.map((categoryId) => checkboxCategoriesOptions.find((option) => option.id === categoryId)?.label);
        setSelectedCategories(categories);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            categories: updatedCategories,
        }));
    };

    const getSelectedCategoryLabels = () => {
        return selectedCategories
            .map((categoryId) => checkboxCategoriesOptions.find((option) => option.id === categoryId)?.label)
            .filter((label) => label)
            .join(", ");
    };

    const handleTimeChange = (id) => {
        const selectedOption = radioTimeOptions.find((option) => option.id === id);
        setSelectedTime(id);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            cookingTime: selectedOption ? selectedOption.label : "",
        }));
    };

    const getSelectedTimeLabel = () => {
        const selectedOption = radioTimeOptions.find((option) => option.id === selectedTime);
        return selectedOption ? selectedOption.label : "Select time";
    };

    //creating recipe
    const [recipe, setRecipe] = useState({
        title: "",
        categories: ["Main Meal", "Asian"],
        ingredients: [''],
        cookingTime: "60 - 120 min",
        imageUrl: "",
        sourceUrl: "",
        cookingSteps: [''],
        userOwner: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value,
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
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
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
        const cookingSteps = recipe.cookingSteps;
        cookingSteps[index] = value;
        setRecipe({ ...recipe, cookingSteps });
    };

    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    return (
        <div className="create">
            <div className="container">
                <div className="create_top">
                    <BackButton />
                    <div className="create_title">Add Your Recipe</div>
                </div>

                <form className="create_form">
                    {/* title */}
                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Title</span>
                        </div>
                        <div className="input">
                            <input id="titleInput" name="title" type="text" placeholder="Enter recipe title" onChange={handleChange} />
                        </div>
                    </div>

                    {/* categories */}
                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Choose categories</span>
                        </div>
                        <div className={`dropdown ${dropdownOpen["categories"] ? "open" : ""}`}>
                            <div className="dropdown_top input" onClick={() => toggleDropdown("categories")}>
                                <input readOnly id="categoriesInput" name="categories" type="text" value={getSelectedCategoryLabels()} placeholder="Select at least one category" />
                                <svg viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="dropdown_content">
                                <CheckboxList checkboxOptions={checkboxCategoriesOptions} onChange={handleCategoryChange} />
                            </div>
                        </div>
                    </div>

                    {/* cooking time */}
                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Choose time</span>
                        </div>
                        <div className={`dropdown ${dropdownOpen["time"] ? "open" : ""}`}>
                            <div className="dropdown_top input" onClick={() => toggleDropdown("time")}>
                                <input id="timeInput" name="cookingTime" readOnly type="text" value={getSelectedTimeLabel()} />
                                <svg viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="dropdown_content">
                                <RadioList radioOptions={radioTimeOptions} onChange={handleTimeChange} />
                            </div>
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
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

                    {/* ingredients */}

                    <div className="create_form__item">
                        <div className="title">
                            <b class="required">*</b>
                            <span>Ingredients</span>
                        </div>
                        {recipe.ingredients.map((ingredient, index) => (
                            <input
                                placeholder="Enter ingredient (e.g. 'Milk, 100ml')"
                                className="input"
                                key={index}
                                type="text"
                                name="ingredients"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
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

                    <div className="create_form__item">
                        <div className="title">
                            <b class="required">*</b>
                            <span>Cooking steps</span>
                        </div>
                        {recipe.cookingSteps.map((cookingStep, index) => (
                            <div className="textarea-wrapper">
                                <span>Step {index + 1}</span>
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

                    <button className="btn btn_primary" type="submit">
                        Save recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;
