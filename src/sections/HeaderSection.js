import moment from 'moment'
import React from 'react'
import 'moment/locale/id';
import { APP_NAME } from '../utils/Constant';
import { InputComponent } from '../components';
moment.locale('id')

export default function HeaderSection() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 p-5'>
            <div className=''>
                <h1 className='text-center'>{moment().format('LL')}</h1>
            </div>
            <div>
                <h1 className='text-center text-5xl font-bold text-primary'>{APP_NAME}</h1>
            </div>
            <div className='flex justify-center'>
                <form>
                    <InputComponent name={'seach'} placeholder={'Pencarian...'} />
                </form>
            </div>
        </div>
    )
}
