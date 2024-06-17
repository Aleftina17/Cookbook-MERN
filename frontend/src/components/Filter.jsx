import React, {useState} from 'react'

const Filter = ({ checkboxOptions }) => {

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

  return (
    <div className='filter'>
        <div className="filter_item">
            <div className="filter_item__title">Category</div>
            <div className="filter_item__list">
                {checkboxOptions.map((option) => (
                    <label key={option.id}>
                        <input
                            className='input-checkbox'
                            type="checkbox"
                            checked={!!checkboxes[option.id]}
                            onChange={() => handleCheckboxChange(option.id)}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Filter