import React from 'react'

export default function InputComponent({ name, value, onChange, autoFocus = false, placeholder, type, inputMode, className }) {
    function handleChange(event) {
        if (onChange) {
            onChange(event);
        }
    }

    return (
        <input
            autoFocus={autoFocus}
            value={value}
            className={`p-3 my-1 rounded-full focus:border-primary border border-slate-500 ${className}`}
            type={type}
            inputMode={inputMode}
            name={name}
            placeholder={placeholder}
            onChange={handleChange} // call handleChange to trigger onChange prop if it exists
        />
    )
}

InputComponent.defaultProps = {
    onChange: undefined, // provide a default value for onChange prop
};

