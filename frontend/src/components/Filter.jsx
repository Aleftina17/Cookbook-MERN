import React, { useState, useEffect } from "react";
import { checkboxCategoriesOptions } from './../data/categories';
import { radioTimeOptions } from './../data/cookingTime';

const Filter = ({ applyFilters, closeFilter }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

    const handleTimeChange = (time) => {
        setSelectedTime([time]);
    };

    const handleApplyFilters = () => {
        applyFilters(selectedCategories, selectedTime);
        closeFilter();
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedTime([]);
        applyFilters([], []);
        closeFilter();
    };

    return (
        <div className="filter">
            <div className="filter_item">
                <div className="filter_item__title">Category</div>
                <div className="filter_item__list">
                    {checkboxCategoriesOptions.map((option) => (
                        <label key={option.id}>
                            <input
                                type="checkbox"
                                value={option.label}
                                checked={selectedCategories.includes(option.label)}
                                onChange={() => handleCategoryChange(option.label)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="filter_item">
                <div className="filter_item__title">Cooking time</div>
                <div className="filter_item__list">
                    {radioTimeOptions.map((option) => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                value={option.label}
                                checked={selectedTime.includes(option.label)}
                                onChange={() => handleTimeChange(option.label)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="filter_btns">
                <button className="btn btn_primary" onClick={handleApplyFilters}>
                    <span>Apply Filters</span>
                </button>
                <button className="btn btn_secondary" onClick={handleClearFilters}>
                    <span>Clear Filters</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;
