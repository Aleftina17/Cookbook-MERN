import React, { useState } from "react";
import BackButton from "../components/BackButton";
import CheckboxList from "../components/CheckboxList";
import RadioList from "../components/RadioList";

export const CreateRecipe = () => {
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([1, 2]);
    const [selectedTime, setSelectedTime] = useState(2);

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
        setSelectedCategories(categories);
    };

    const handleTimeChange = (id) => {
        setSelectedTime(id);
    };

    const getSelectedCategoryLabels = () => {
        return selectedCategories
            .map((categoryId) => checkboxCategoriesOptions.find((option) => option.id === categoryId)?.label)
            .filter((label) => label)
            .join(", ");
    };

    const getSelectedTimeLabel = () => {
        const selectedOption = radioTimeOptions.find((option) => option.id === selectedTime);
        return selectedOption ? selectedOption.label : "Select time";
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
        { id: 9, label: "Indian" },
    ];

    const radioTimeOptions = [
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
                            <input id="title" type="text" placeholder="Enter recipe title" />
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Choose categories</span>
                        </div>
                        <div className={`dropdown ${dropdownOpen["categories"] ? "open" : ""}`}>
                            <div className="dropdown_top input" onClick={() => toggleDropdown("categories")}>
                                <span>{getSelectedCategoryLabels() || "Select at least one category"}</span>
                                <svg viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="dropdown_content">
                                <CheckboxList checkboxOptions={checkboxCategoriesOptions} onChange={handleCategoryChange} />
                            </div>
                        </div>
                    </div>

                    <div className="create_form__item">
                        <div className="title">
                            <b className="required">*</b>
                            <span>Choose time</span>
                        </div>
                        <div className={`dropdown ${dropdownOpen["time"] ? "open" : ""}`}>
                            <div className="dropdown_top input" onClick={() => toggleDropdown("time")}>
                                <span>{getSelectedTimeLabel()}</span>
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

export default CreateRecipe;
