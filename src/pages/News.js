import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonComponent, TableComponent } from '../components';
import NewsProvider, { show, destroy } from '../context/NewsContext';
import Loader from '../utils/Loader';

export default function News() {
    const [refresh, setRefresh] = useState(false)
    const [newsList, setNewsList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const heads = [{ title: 'No.' }, { title: 'Judul Berita' }, { title: 'Tanggal dibuat' }, { title: 'Status' }, { title: 'Aksi' }]

    useEffect(() => {
        async function destroyData(id) {
            Swal.fire({
                title: `Yakin hapus berita ini?`,
                icon: 'question',
                confirmButtonText: 'Hapus',
                confirmButtonColor: 'red',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    const { error } = await destroy(id)
                    if (error) {
                        Swal.showValidationMessage(error.message)
                        throw error
                    }
                    setRefresh(!refresh)
                    return true
                }
            }).then(response => {
                if (response.isConfirmed) {
                    Swal.fire('Berhasil', `Berita telah dihapus`, 'success')
                }
            })
        }
        async function getData() {
            setIsLoading(true)
            const { data: news, error } = await show()
            if (error) Swal.fire(error.details, error.message, 'error')
            if (news)
                setNewsList(news.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td className="p-3 border border-slate-500 text-center">{index + 1}</td>
                            <td className="p-3 border border-slate-500">{item.title}</td>
                            <td className="p-3 border border-slate-500">{item.created_at}</td>
                            <td className="p-3 border border-slate-500">{item.is_show ? <p className='text-green-500'>TAYANNG</p> : <p className='text-redd-500'>TIDAk TAYANNG</p>}</td>
                            <td className="p-3 border border-slate-500 text-center">
                                <Link className={'m-1 hover:text-slate-700 text-orange-500'} onClick={() => { }} >Edit</Link>
                                <Link className={'m-1 hover:text-slate-700 text-red-500'} onClick={() => destroyData(item.id)} >Hapus</Link>
                            </td>
                        </tr>
                    )
                }))
            setIsLoading(false)
        }
        getData()
    }, [refresh])

    return (isLoading ? <Loader loadText={'Mohon tunggu...'} /> :
        <NewsProvider>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <h1 className='text-2xl'>Berita</h1>
                    <div className='flex justify-end'>
                        <ButtonComponent text={'TAMBAH'} className={`md:w-1/4 w-full`} onClick={() => navigate('/news/create')} />
                    </div>
                </div>
                <div className='w-full'>
                    <TableComponent data={newsList} heads={heads} />
                </div>
            </div>
        </NewsProvider>
    )
}
