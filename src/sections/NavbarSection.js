import { Dropdown } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { APP_NAME, ERROR_MESSAGE } from '../utils/Constant'
import { show } from './../context/CategoryContext'

export default function NavbarSection() {
    const [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        async function getCategories() {
            const { data: categories, error } = await show()
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setCategoriesList(categories)
        }
        getCategories()
    }, [])


    return (
        <div>
            <div className='md:hidden w-full p-5 flex justify-center'>
                <Dropdown
                    label="Kategori"
                    inline={true}
                >
                    {categoriesList.map((item, index) => {
                        return (
                            <Dropdown.Item>
                                {item.name}
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown>
            </div>
            <div className='hidden md:flex justify-evenly p-2'>
                <h1 className='text-primary font-bold text-3xl'>{APP_NAME}</h1>
                {categoriesList.map((item, index) => {
                    return (
                        <div className='hover:bg-primary hover:text-slate-100 p-3 transition-all duration-300 rounded-full' key={index}>
                            <Link to={'/'} className=''>{item.name}</Link>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}
