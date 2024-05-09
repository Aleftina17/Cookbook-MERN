import React, { useState } from 'react';

function CheckboxExample({ checkboxOptions }) {
  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }));
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

export default CheckboxExample;