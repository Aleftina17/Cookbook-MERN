import React from "react";

const CookingStepsField = ({ cookingSteps, handleStepChange, removeStep, addStep, hasError }) => {
    return (
        <div className={`create_form__item ${hasError ? "error" : ""}`}>
            <div className="title">
                <b class="required">*</b>
                <span>Cooking steps</span>
            </div>
            <div className="desc">Provide a description of at least one cooking step</div>
            {cookingSteps.map((cookingStep, index) => (
                <div className="textarea-wrapper">
                    <div className="textarea-wrapper_top">
                        <button className="btn btn_delete" type="button" onClick={() => removeStep(index)}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                    stroke="#474747"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <span>Step {index + 1}</span>
                    </div>
                    <textarea placeholder="Describe step" className="textarea" key={index} type="text" name="cookingSteps" value={cookingStep} onChange={(e) => handleStepChange(e, index)} />
                </div>
            ))}
            <button className="btn btn_add" onClick={addStep}>
                <span>Add step</span>
                <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15 10V20M10 15H20M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
                        stroke="#474747"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CookingStepsField;
