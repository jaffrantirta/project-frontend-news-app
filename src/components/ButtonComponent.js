import React from 'react'

export default function ButtonComponent({ text, onClick }) {
    return (
        <button onClick={e => onClick(e)} className='bg-primary my-2 rounded-full p-3 text-slate-100'>{text}</button>
    )
}
