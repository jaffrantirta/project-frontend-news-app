import React from 'react'

export default function InputComponent({ name, value, autoFocus = false, placeholder, type, inputMode, className }) {
    return (
        <input autoFocus={autoFocus} value={value} className={`p-3 my-1 rounded-full focus:border-primary border border-slate-500 ${className}`} type={type} inputMode={inputMode} name={name} placeholder={placeholder} />
    )
}
