import moment from 'moment'
import React from 'react'
import { HeroImageComponent } from '../components'

export default function HeroSection() {
    const aa = 'https://redaksi9.com/uploads/berita/berita_JelangNyepidanRamadhanBIdanPerbankanTutuppada2123Maret2023.jpg'
    return (
        <div className='p-10 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0'>
            <HeroImageComponent
                img={aa}
                category={'Berita Utama'}
                title={'Jelang Nyepi dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada'}
                date={moment().format('ll')} />

            <div className='grid grid-cols-1 gap-3 md:gap-0'>
                <HeroImageComponent
                    img={aa}
                    category={'Berita Utama'}
                    title={'Jelang Nyepi dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada dan Ramadhan, BI dan Perbankan Tutup pada'}
                    date={moment().format('ll')} />
                <HeroImageComponent
                    img={aa}
                    category={'Berita Utama'}
                    title={'Jelang Nyepi dan Ramadhan, BI dan Perbankan Tutup pada'}
                    date={moment().format('ll')} />
            </div>
            <div className='grid grid-cols-1 gap-3 md:gap-0'>
                <HeroImageComponent
                    img={aa}
                    category={'Berita Utama'}
                    title={'Jelang Nyepi dan Ramadhan, BI dan Perbankan Tutup pada'}
                    date={moment().format('ll')} />
                <HeroImageComponent
                    img={aa}
                    category={'Berita Utama'}
                    title={'Jelang Nyepi dan Ramadhan, BI dan Perbankan Tutup pada'}
                    date={moment().format('ll')} />
            </div>
        </div >
    )
}
