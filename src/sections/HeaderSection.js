import moment from 'moment'
import React from 'react'
import 'moment/locale/id';
import { APP_NAME } from '../utils/Constant';
import { InputComponent } from '../components';
import { useNavigate } from 'react-router-dom';
moment.locale('id')

export default function HeaderSection() {
    const navigate = useNavigate()
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 p-5 bg-primary'>
            <div className='flex items-center justify-center'>
                <h1 className='text-center font-bold text-white text-xl'>{moment().format('LL')}</h1>
            </div>
            <div>
                <h1 className='text-center text-5xl font-bold text-white'>{APP_NAME}</h1>
            </div>
            <div className='flex justify-center'>
                <form onSubmit={e => {
                    e.preventDefault()
                    let formData = new FormData(e.target)
                    let search = formData.get('search')
                    navigate(`/search?keyword=${search}`)
                }}>
                    <InputComponent type={'search'} name={'search'} placeholder={'Pencarian...'} />
                </form>
            </div>
        </div>
    )
}
