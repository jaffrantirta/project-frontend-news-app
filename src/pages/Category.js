import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonComponent, TableComponent } from '../components';
import { ERROR_MESSAGE, SUPABASE_KEY, SUPABASE_URL } from '../utils/Constant';
import Loader from '../utils/Loader';

export default function Category() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const [categoriesList, setCategoriesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const heads = [{ title: 'No.' }, { title: 'Nama Kategori' }, { title: 'Aksi' }]

    const createCategory = async () => {
        Swal.fire({
            input: 'text',
            inputLabel: 'Nama kategori',
            inputPlaceholder: 'Masukan nama kategori',
            confirmButtonText: 'Tambah',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                const { error } = await supabase
                    .from('categories')
                    .insert([{ name: value }])

                if (!error) {
                    Swal.hideLoading()
                    return true
                }
                Swal.showValidationMessage(ERROR_MESSAGE)
            }
        }).then(async response => {
            if (response.isConfirmed) {
                Swal.fire('Berhasil', 'Kategori ditambahkan', 'success')
                getCategories()
            }

        })
    }
    const deleteCategory = (id, name) => {
        Swal.fire({
            title: `Yakin hapus kategori ${name}`,
            icon: 'question',
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const { error } = await supabase
                    .from('categories')
                    .delete()
                    .eq('id', id)

                if (!error) {
                    Swal.hideLoading()
                    return true
                }
                Swal.showValidationMessage(ERROR_MESSAGE)
            }
        }).then(response => {
            if (response.isConfirmed) {
                Swal.fire('Berhasil', `Kategori ${name} telah dihapus`, 'success')
                getCategories()
            }
        })
    }
    const getCategories = async () => {
        setIsLoading(true)
        let { data: categories, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            Swal.fire(ERROR_MESSAGE, error, 'error')
        } else {
            setCategoriesList(categories.map((item, index) => {
                return (
                    <tr key={item.id}>
                        <td className="p-3 border border-slate-500 text-center">{index + 1}</td>
                        <td className="p-3 border border-slate-500">{item.name}</td>
                        <td className="p-3 border border-slate-500 text-center">
                            <Link className={'m-1 hover:text-slate-700 text-orange-500'} onClick={() => editCategory(item.id, item.name)} >Edit</Link>
                            <Link className={'m-1 hover:text-slate-700 text-red-500'} onClick={() => deleteCategory(item.id, item.name)} >Hapus</Link>
                        </td>
                    </tr>
                )
            }))
        }
        setIsLoading(false)
    }

    const editCategory = (id, name) => {
        Swal.fire({
            input: 'text',
            inputLabel: 'Nama kategori',
            inputValue: name,
            inputPlaceholder: 'Masukan nama kategori yang baru',
            confirmButtonText: 'Ubah',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                const { error } = await supabase
                    .from('categories')
                    .update({ name: value })
                    .eq('id', id)

                if (!error) {
                    Swal.hideLoading()
                    return true
                }
                Swal.showValidationMessage(ERROR_MESSAGE)
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Berhasil', 'Kategori di ubah', 'success')
                getCategories()
            }
        });

    }
    useEffect(() => {
        getCategories()
    }, [])

    return (isLoading ? <Loader loadText={'Mohon tunggu...'} /> :
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <h1 className='text-2xl'>Kategori</h1>
                <div className='flex justify-end'>
                    <ButtonComponent text={'TAMBAH'} className={`md:w-1/4 w-full`} onClick={() => createCategory()} />
                </div>
            </div>
            <div className='w-full'>
                <TableComponent data={categoriesList} heads={heads} />
            </div>
        </div>
    )
}
