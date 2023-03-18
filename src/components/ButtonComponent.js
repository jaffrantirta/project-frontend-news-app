import React from 'react'

export default function ButtonComponent({ text, onClick, className }) {
    return (
        <button onClick={e => onClick(e)} className={`bg-primary hover:bg-slate-500 transition-all duration-700 my-2 rounded-full p-3 text-slate-100 ${className}`}>{text}</button>
    )
}
