import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { NewsListComponent } from '../components'
import { show } from '../context/CategoryContext'
import { ERROR_MESSAGE } from '../utils/Constant'

export default function CategorySection() {
    useEffect(() => {
        async function getCategoriesWithNews() {
            const { data, error } = await show().select('name, news(*)')
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            console.log(data);
        }
        getCategoriesWithNews()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 p-10 gap-5'>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withCategory={false} classNameTitle={'text-sm'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
        </div>
    )
}
