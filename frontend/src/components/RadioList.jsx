import React, { useState } from 'react';

function RadioList({ radioOptions, onChange }) {
    const [selectedRadio, setSelectedRadio] = useState(2);

    const handleRadioChange = (id) => {
      setSelectedRadio(id);
      onChange(id);
    };

    return (
        <div className='dropdown_list'>
            {radioOptions.map((option) => (
                <label key={option.id}>
                    <input
                        className='input-checkbox'
                        type='radio'
                        checked={selectedRadio === option.id}
                        onChange={() => handleRadioChange(option.id)}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export default RadioList;
