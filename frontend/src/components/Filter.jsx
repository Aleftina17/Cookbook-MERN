import React, { useState, useEffect } from "react";

const Filter = ({ recipes, applyFilters, closeFilter }) => {
    const [categories, setCategories] = useState([]);
    const [cookingTimes, setCookingTimes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);

    useEffect(() => {
        const allCategories = recipes.reduce((acc, recipe) => {
            recipe.categories.forEach((category) => {
                if (!acc.includes(category)) {
                    acc.push(category);
                }
            });
            return acc;
        }, []);
        setCategories(allCategories.sort());

        const allCookingTimes = recipes.reduce((acc, recipe) => {
            if (!acc.includes(recipe.cookingTime)) {
                acc.push(recipe.cookingTime);
            }
            return acc;
        }, []);
        setCookingTimes(allCookingTimes.sort());
    }, [recipes]);

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category) ? selectedCategories.filter((c) => c !== category) : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        applyFilters(updatedCategories, selectedTime);
    };

    const handleTimeChange = (time) => {
        const updatedTime = selectedTime.includes(time) ? selectedTime.filter((t) => t !== time) : [...selectedTime, time];

        setSelectedTime(updatedTime);
        applyFilters(selectedCategories, updatedTime);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedTime([]);
        applyFilters([], []);
    };

    return (
        <div className="filter">
            <button onClick={closeFilter} className="btn_close" aria-label="Close filter">
                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.4001 8.6L8.6001 25.4M8.6001 8.6L25.4001 25.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="filter_content">
                <div className="filter_items">
                    <div className="filter_item">
                        <div className="filter_item__title">Category</div>
                        <div className="filter_item__list">
                            {categories.map((category) => (
                                <label key={category}>
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        id={category}
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter_item">
                        <div className="filter_item__title">Cooking time</div>
                        <div className="filter_item__list">
                            {cookingTimes.map((time) => (
                                <label key={time}>
                                    <input type="checkbox" className="input-checkbox" id={time} value={time} checked={selectedTime.includes(time)} onChange={() => handleTimeChange(time)} />
                                    <span>{time}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="filter_btns">
                    <button className="btn btn_secondary" onClick={handleClearFilters}>
                        <span>Clear Filters</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
