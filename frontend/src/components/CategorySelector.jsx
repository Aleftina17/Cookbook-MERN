import React, { useState } from "react";
import CheckboxList from "../components/CheckboxList";
import { checkboxCategoriesOptions } from "../data/categories";

const CategorySelector = ({ selectedCategories, onCategoryChange, isOpen, toggleDropdown }) => {

    const getSelectedCategoryLabels = () => {
        return selectedCategories
            .map((categoryId) => checkboxCategoriesOptions.find((option) => option.id === categoryId)?.label)
            .filter((label) => label)
            .join(", ");
    };

    return (
        <div className={`create_form__item ${selectedCategories.length === 0 ? "error" : ""}`}>
        <div className="title">
            <b className="required">*</b>
            <span>Choose categories</span>
        </div>
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
            <div className="dropdown_top input" onClick={toggleDropdown}>
                <input readOnly type="text" value={getSelectedCategoryLabels()} placeholder="Select at least one category" />
                <svg viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="dropdown_content">
                <CheckboxList checkboxOptions={checkboxCategoriesOptions} onChange={onCategoryChange} />
            </div>
        </div>
    </div>
    );
};

export default CategorySelector;
