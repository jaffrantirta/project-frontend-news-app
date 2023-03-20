import React from 'react'
import { HeaderSection, NavbarSection } from '../sections'

export default function NewsRead() {
    return (
        <div>
            <HeaderSection />
            <hr></hr>
            <NavbarSection />
            <div className='bg-primary p-10 grid grid-cols-4'>
                <div className='col-span-3'>
                    <p className='font-bold text-6xl'>asasasassa</p>
                    <div className='flex gap-5'>
                        <p>19 maret 2023</p>
                        <p>20:40 WITA</p>
                        <p>Berita Utama</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <button className='bg-blue-900 text-white p-3 font-bold'>FACEBOOK</button>
                        <button className='bg-sky-400 text-white p-3 font-bold'>TWITTER</button>
                        <button className='bg-green-500 text-white p-3 font-bold'>WHATSAPP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
