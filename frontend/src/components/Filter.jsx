import React, { useState } from "react";

const Filter = ({ checkboxOptions, radioOptions, closeFilter }) => {
    const [checkboxes, setCheckboxes] = useState({});

    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = {
            ...checkboxes,
            [id]: !checkboxes[id],
        };
        setCheckboxes(updatedCheckboxes);
        // const selectedCategories = Object.keys(updatedCheckboxes)
        //     .filter((key) => updatedCheckboxes[key])
        //     .map((key) => parseInt(key));
    };

    const [selectedRadio, setSelectedRadio] = useState();

    const handleRadioChange = (id) => {
        setSelectedRadio(id);
        // onChange(id);
    };

    return (
        <div className="filter">
            <button onClick={closeFilter} className="btn_close">
                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.4001 8.6L8.6001 25.4M8.6001 8.6L25.4001 25.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="filter_items">
                <div className="filter_item">
                    <div className="filter_item__title">Category</div>
                    <div className="filter_item__list">
                        {checkboxOptions.map((option) => (
                            <label key={option.id}>
                                <input className="input-checkbox" type="checkbox" checked={!!checkboxes[option.id]} onChange={() => handleCheckboxChange(option.id)} />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="filter_item">
                    <div className="filter_item__title">Cooking time</div>
                    <div className="filter_item__list">
                        {radioOptions.map((option) => (
                            <label key={option.id}>
                                <input className="input-checkbox" type="radio" checked={selectedRadio === option.id} onChange={() => handleRadioChange(option.id)} />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="filter_btns">
                <button className="btn btn_primary"><span>Apply filters</span></button>
                <button className="btn btn_secondary"><span>Reset</span></button>
            </div>
        </div>
    );
};

export default Filter;
