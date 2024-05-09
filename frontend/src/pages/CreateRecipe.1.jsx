import React, { useState } from "react";
import BackButton from "./../components/BackButton";
import CheckboxExample from "../components/CheckboxExample";

export const CreateRecipe = () => {
    // const [title, setTitle] = useState("");
    // const [categories, setCategories] = useState([""]);
    // const [ingredients, setIngredients] = useState([""]);
    // const [cookingTime, setCookingTime] = useState("");
    // const [imageUrl, setImageUrl] = useState("");
    // const [sourceUrl, setSourceUrl] = useState("");
    // const [cookingSteps, setCookingSteps] = useState([""]);
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleDropdown = (dropdownId) => {
        setDropdownOpen((prevOpen) => {
            const updatedOpenState = Object.fromEntries(
                Object.entries(prevOpen).map(([key, value]) => [key, key === dropdownId ? !value : false])
            );
            return updatedOpenState;
        });
    };

    const checkboxCategoriesOptions = [
        { id: 1, label: "Main meal" },
        { id: 2, label: "Asian" },
        { id: 3, label: "Italian" },
        { id: 4, label: "Soup" },
        { id: 5, label: "Dessert" },
        { id: 6, label: "Salad" },
        { id: 7, label: "Pastry" },
        { id: 8, label: "Mexican" },
    ];

    const checkboxTimeOptions = [
        { id: 1, label: "less than 30 min" },
        { id: 2, label: "30 - 60 min" },
        { id: 3, label: "60 - 120 min" },
        { id: 4, label: "more than 120 min" },
    ];

    return (
        <div className="create">
            <div className="container">
                <div className="create_top">
                    <BackButton />
                    <div className="create_title">Add Your Recipe</div>
                </div>

                <form className="create_form">
                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Title</span>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Enter recipe title" />
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Choose categories</span>
                        </div>
                        <div className={`dropdown ${dropdownOpen['categories'] ? 'open' : ''}`}>
                            <div className='dropdown_top input' onClick={() => toggleDropdown('categories')}>
                                <span>Main meal, Asian</span>
                                <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <CheckboxExample checkboxOptions={checkboxCategoriesOptions} />
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Choose time</span>
                        </div>
                        <div className={`dropdown ${dropdownOpen['time'] ? 'open' : ''}`}>
                            <div className='dropdown_top input' onClick={() => toggleDropdown('time')}>
                                <span>30 - 60 min</span>
                                <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <CheckboxExample checkboxOptions={checkboxTimeOptions} />
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
                            <span>Image URL</span>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Provide image URL" />
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
                            <span>Video/recipe URL</span>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Provide video or recipe URL" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
