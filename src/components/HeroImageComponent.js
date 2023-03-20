import React from 'react'

export default function HeroImageComponent({ img, category, title, date }) {
    return (
        <div className='relative '>
            <img src={img} alt={title} className="w-full h-full object-cover object-center aspect-video" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="bg-primary w-fit p-2 text-sm rounded-full text-white font-bold">{category}</p>
                <p className="text-md md:text-3xl font-bold line-clamp-2 hover:text-primary">{title}</p>
                <p className='text-sm'>{date}</p>
            </div>
        </div>
    )
}
