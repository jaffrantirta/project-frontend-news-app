import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonComponent, TableComponent } from '../components';
import CategoryProvider, { show } from '../context/CategoryContext';
import { ERROR_MESSAGE } from '../utils/Constant';
import Loader from '../utils/Loader';

export default function Category() {
    const [loading, setLoading] = useState(true)
    const [categoriesList, setCategoriesList] = useState([])
    const heads = [{ title: 'No.' }, { title: 'Nama Kategori' }, { title: 'Aksi' }]

    const getData = async () => {
        setLoading(true)
        const { data: categories, error } = await show()
        if (error) Swal.fire(ERROR_MESSAGE, error.message, 'error')
        if (categories) setCategoriesList(categories.map((item, index) => {
            return (
                <tr key={item.id}>
                    <td className="p-3 border border-slate-500 text-center">{index + 1}</td>
                    <td className="p-3 border border-slate-500">{item.name}</td>
                    <td className="p-3 border border-slate-500 text-center">
                        <Link className={'m-1 hover:text-slate-700 text-orange-500'} onClick={() => updateData(item.id, item.name)} >Edit</Link>
                        <Link className={'m-1 hover:text-slate-700 text-red-500'} onClick={() => destroyData(item.id, item.name)} >Hapus</Link>
                    </td>
                </tr>
            )
        }))
        setLoading(false)
    }

    const updateData = (id, naame) => {

    }
    const destroyData = (id, naame) => {

    }

    useEffect(() => {
        getData()
    }, [])

    return (loading ? <Loader loadText={'Memuat...'} /> :
        <CategoryProvider>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <h1 className='text-2xl'>Kategori</h1>
                    <div className='flex justify-end'>
                        <ButtonComponent text={'TAMBAH'} className={`md:w-1/4 w-full`} onClick={() => { }} />
                    </div>
                </div>
                <div className='w-full'>
                    <TableComponent data={categoriesList} heads={heads} />
                </div>
            </div>
        </CategoryProvider>
    )
}
