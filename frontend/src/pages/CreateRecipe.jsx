import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import CheckboxList from "../components/CheckboxList";
import RadioList from "../components/RadioList";
import axios from "axios";
import { useGetUserID } from "./../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([1, 2]);
    const [selectedTime, setSelectedTime] = useState(2);
    const [formErrors, setFormErrors] = useState({})
    const userID = useGetUserID()
    const navigate = useNavigate()

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
        const updatedCategories = categories.map((categoryId) => {
            const option = checkboxCategoriesOptions.find((option) => option.id === categoryId);
            return option ? option.label : '';
        }).filter(label => label !== '');
    
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
        setRecipe(prevRecipe => {
            const updatedIngredients = [...prevRecipe.ingredients];
            updatedIngredients[index] = value;
            return { ...prevRecipe, ingredients: updatedIngredients };
        });
    
        setFormErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (value.trim()) {
                delete updatedErrors.ingredients;
            } else {
                updatedErrors.ingredients = true;
            }
            return updatedErrors;
        });
    };

    const removeIngredient = (index) => {
        const ingredients = recipe.ingredients.filter((_, i) => {
            return i !== index
        })
        setRecipe({...recipe, ingredients})
    }

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

        setFormErrors(prevErrors => {
            const updatedErrors = {...prevErrors}
            if(value.trim()){
                delete updatedErrors.cookingSteps
            } else {
                updatedErrors.cookingSteps = true
            }

            return updatedErrors
        })
    };

    const removeStep = (index) => {
        const cookingSteps = recipe.cookingSteps.filter((_, i) => {
            return i !== index
        })
        setRecipe({...recipe, cookingSteps})
    }

    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    const validateForm = () => {
        const errors = {}
        if (!recipe.title.trim()) errors.title = true;
        if (recipe.categories.length === 0) errors.categories = true;
        if (recipe.ingredients.filter(ingredient => ingredient.trim() !== '').length === 0) errors.ingredients = true;
        if (recipe.cookingSteps.filter(step => step.trim() !== '').length === 0) errors.cookingSteps = true;
        if (!recipe.imageUrl.trim()) errors.imageUrl = true;
        setFormErrors(errors);
        return errors;
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const filteredIngredients = recipe.ingredients.filter(ingredient => ingredient.trim() !== '')
        const filteredSteps = recipe.cookingSteps.filter(step => step.trim() !== '')

        const filteredRecipe = {
            ...recipe,
            ingredients: filteredIngredients,
            cookingSteps: filteredSteps
        }

        const errors = validateForm()
        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
            alert('Fill all required fields')
            return
        }

        try {
            await axios.post("http://localhost:5555/recipes", filteredRecipe);
            alert("Recipe successfully created!");
            navigate('/recipes')
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create">
            <div className="container">
                <div className="create_top">
                    <BackButton />
                    <div className="create_title">Add Your Recipe</div>
                </div>

                <form onSubmit={onSubmit} className="create_form">
                    {/* title */}
                    <div className={`create_form__item ${formErrors.title ? 'error' : ''}`}>
                        <div className="title">
                            <b className="required">*</b>
                            <span>Title</span>
                        </div>
                        <div className="input">
                            <input id="titleInput" name="title" type="text" placeholder="Enter recipe title" onChange={handleChange} />
                        </div>
                    </div>

                    {/* categories */}
                    <div className={`create_form__item ${formErrors.categories ? 'error' : ''}`}>
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
                    <div className={`create_form__item ${formErrors.cookingTime ? 'error' : ''}`}>
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

                    {/* ingredients */}
                    <div className={`create_form__item ${formErrors.ingredients ? 'error' : ''}`}>
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
                    <div className={`create_form__item ${formErrors.cookingSteps ? 'error' : ''}`}>
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

                    <div className={`create_form__item ${formErrors.imageUrl ? 'error' : ''}`}>
                        <div className="title">
                        <b className="required">*</b>
                            <span>Image URL</span>
                        </div>
                        <div className="input">
                            <input id="imageInput" name="imageUrl" type="text" placeholder="Provide image URL" onChange={handleChange} />
                        </div>
                    </div>

                    <div className='create_form__item'>
                        <div className="title">
                            <span>Video/recipe URL</span>
                        </div>
                        <div className="input">
                            <input id="sourceInput" name="sourceUrl" type="text" placeholder="Provide video or recipe URL" onChange={handleChange} />
                        </div>
                    </div>

                    <button className="btn btn_primary" type="submit">
                        <span>Create recipe</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;