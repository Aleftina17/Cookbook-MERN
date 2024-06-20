import React, { useState } from "react";

const Filter = ({ categoriesOptions, timeOptions, applyFilters, closeFilter }) => {
    const [checkedCategories, setCheckedCategories] = useState({});
    const [checkedTime, setCheckedTime] = useState({});

    const handleCategoriesChange = (id) => {
        setCheckedCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleTimeChange = (id) => {
        setCheckedTime((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const applyFiltersHandler = () => {
        const selectedCategories = Object.keys(checkedCategories)
            .filter(key => checkedCategories[key])
            .map(key => {
                const option = categoriesOptions.find(option => option.id === key);
                return option ? option.label : '';
            });
    
        const selectedTime = Object.keys(checkedTime)
            .filter(key => checkedTime[key])
            .map(key => {
                const option = timeOptions.find(option => option.id === key);
                return option ? option.label : '';
            });
    
        applyFilters(selectedCategories, selectedTime);
    };

    const resetFiltersHandler = () => {
        setCheckedCategories({});
        setCheckedTime({});
        applyFilters([], []);
        closeFilter();
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
                            {categoriesOptions.map((option) => (
                                <label key={option.id}>
                                    <input className="input-checkbox" type="checkbox" checked={!!checkedCategories[option.id]} onChange={() => handleCategoriesChange(option.id)} />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="filter_item">
                        <div className="filter_item__title">Cooking time</div>
                        <div className="filter_item__list">
                            {timeOptions.map((option) => (
                                <label key={option.id}>
                                    <input className="input-checkbox" type="checkbox" checked={!!checkedTime[option.id]} onChange={() => handleTimeChange(option.id)} />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="filter_btns">
                    <button className="btn btn_primary" onClick={applyFiltersHandler}>
                        <span>Apply filters</span>
                    </button>
                    <button className="btn btn_secondary" onClick={resetFiltersHandler}>
                        <span>Reset</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
