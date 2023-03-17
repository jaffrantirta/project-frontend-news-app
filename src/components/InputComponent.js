import React from 'react'

export default function InputComponent({ name, placeholder, type, inputMode }) {
    return (
        <input className='p-3 my-1 rounded-full focus:border-primary border border-slate-500' type={type} inputMode={inputMode} name={name} placeholder={placeholder} />
    )
}
