import React, { useState, useEffect } from "react";

const Filter = ({ recipes, applyFilters, selectedCategories, selectedTime, closeFilter }) => {
    const [categories, setCategories] = useState([]);
    const [cookingTimes, setCookingTimes] = useState([]);

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

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (selectedCategories.includes(category)) {
            applyFilters(
                selectedCategories.filter((c) => c !== category),
                selectedTime
            );
        } else {
            applyFilters([...selectedCategories, category], selectedTime);
        }
    };

    const handleTimeChange = (e) => {
        const time = e.target.value;
        if (selectedTime.includes(time)) {
            applyFilters(
                selectedCategories,
                selectedTime.filter((t) => t !== time)
            );
        } else {
            applyFilters(selectedCategories, [...selectedTime, time]);
        }
    };

    const handleClearFilters = () => {
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
                                    <input type="checkbox" className="input-checkbox" id={category} value={category} checked={selectedCategories.includes(category)} onChange={handleCategoryChange} />
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
                                    <input type="checkbox" className="input-checkbox" id={time} value={time} checked={selectedTime.includes(time)} onChange={handleTimeChange} />
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
