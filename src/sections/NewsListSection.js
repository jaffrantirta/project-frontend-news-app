import React from 'react'
import { NewsListComponent } from '../components'

export default function NewsListSection() {
    const img = 'https://redaksi9.com/uploads/berita/berita_JelangNyepidanRamadhanBIdanPerbankanTutuppada2123Maret2023.jpg'
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-10 md:px-44 h-fit md:h-screen overflow-hidden'>
            <div className='flex flex-col gap-5 overflow-y-auto'>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                <NewsListComponent withImage={false} classNameTitle={'text-blue-900'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withImage={false} classNameTitle={'text-blue-900'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withImage={false} classNameTitle={'text-blue-900'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withImage={false} classNameTitle={'text-blue-900'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent withImage={false} classNameTitle={'text-blue-900'} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} category={'beruta'} />
            </div>
            <div className='col-span-2 flex flex-col gap-5 overflow-y-auto'>
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} classNameTitle={'md:text-2xl'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb ahsjabsjbajsbajbsajbsab'} date={'20 maret 2023'} classNameTitle={'md:text-2xl'} category={'beruta manca negara wowow'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj '} date={'20 maret 2023'} classNameTitle={'md:text-2xl'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} classNameTitle={'md:text-2xl'} category={'beruta'} />
            </div>
            <div className='flex flex-col gap-5 overflow-y-auto'>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA TERPOPULER</p>
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
                <NewsListComponent img={img} title={'sajsajbsjabsjbajsbjabsjbasj ajsabsabsjbasbababsajb '} date={'20 maret 2023'} category={'beruta'} />
            </div>
        </div>
    )
}
