import React from 'react'

export default function NewsListComponent({ category, title, date, img, withImage = true, classNameTitle, withCategory = true }) {
    return (
        <div className='flex gap-3'>
            {withImage ? <img src={img} alt={title} className='bg-primary w-1/3 object-cover object-center aspect-video h-fit' /> : <></>}
            <div>
                <p className={`hover:text-primary font-bold ${classNameTitle}`}>{title}</p>
                <div className='grid md:flex justify-between'>
                    {withCategory ? <p className={`bg-primary p-1 px-2 rounded-full text-white line-clamp-1`}>{category}</p> : <></>}
                    <p className='text-sm'>{date}</p>
                </div>
            </div>
        </div>
    )
}
