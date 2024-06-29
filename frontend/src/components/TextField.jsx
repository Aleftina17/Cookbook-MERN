import React from 'react';

const TextInput = ({ id, name, type, placeholder, value, onChange, error }) => {
    return (
        <div className={`create_form__item ${error ? 'error' : ''}`}>
            <div className="title">
                {error && <b className="required">*</b>}
                <span>{placeholder}</span>
            </div>
            <div className="input">
                <input id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        </div>
    );
};

export default TextInput;