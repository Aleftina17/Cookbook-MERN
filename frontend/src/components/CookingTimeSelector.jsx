import React from "react";
import RadioList from "../components/RadioList";
import { radioTimeOptions } from "../data/cookingTime";

const TimeSelector = ({ selectedTime, onTimeChange, isOpen, toggleDropdown }) => {

    const getSelectedTimeLabel = () => {
        const selectedOption = radioTimeOptions.find((option) => option.id === selectedTime);
        return selectedOption ? selectedOption.label : "Select time";
    };

    return (
        <div className={`create_form__item ${selectedTime === null ? "error" : ""}`}>
        <div className="title">
            <b className="required">*</b>
            <span>Choose time</span>
        </div>
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
            <div className="dropdown_top input" onClick={toggleDropdown}>
                <input readOnly type="text" value={getSelectedTimeLabel()} />
                <svg viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 12.087L15 19.9131L22.5 12.087" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="dropdown_content">
                <RadioList radioOptions={radioTimeOptions} onChange={onTimeChange} />
            </div>
        </div>
    </div>
    );
};

export default TimeSelector;
