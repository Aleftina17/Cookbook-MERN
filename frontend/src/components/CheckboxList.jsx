import React, { useState } from 'react';

function CheckboxList({ checkboxOptions, onChange }) {
    const [checkboxes, setCheckboxes] = useState({
        1: true, // Main meal
        2: true, // Asian
    });

    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = {
            ...checkboxes,
            [id]: !checkboxes[id],
        };
        setCheckboxes(updatedCheckboxes);
        const selectedCategories = Object.keys(updatedCheckboxes)
            .filter((key) => updatedCheckboxes[key])
            .map((key) => parseInt(key));
        
        onChange(selectedCategories);
    };

    return (  
        <div className='dropdown_list'>
            {checkboxOptions.map((option) => (
                <label key={option.id}>
                    <input
                        className='input-checkbox'
                        type="checkbox"
                        checked={!!checkboxes[option.id]} // !! converts value to boolean
                        onChange={() => handleCheckboxChange(option.id)}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export default CheckboxList;

