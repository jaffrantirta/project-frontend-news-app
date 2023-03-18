import { createClient } from '@supabase/supabase-js';
import { Modal } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { ButtonComponent, InputComponent, TableComponent } from '../components';
import { ERROR_MESSAGE, SUPABASE_KEY, SUPABASE_URL } from '../utils/Constant';
import Loader from '../utils/Loader';

export default function Category() {
    const supabaseUrl = SUPABASE_URL
    const supabaseKey = SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const formRef = useRef(null)
    const heads = [{ title: 'No.' }, { title: 'Nama Kategori' }, { title: 'Aksi' }]

    const addCategory = async (name) => {
        setIsLoading(true)
        const { error } = await supabase
            .from('categories')
            .insert([
                { name: name },
            ])

        if (error) {
            Swal.fire(ERROR_MESSAGE, error, 'error')
        } else {
            setModalShow(false)
            getCategories()
            Swal.fire('Berhasil', 'Kategori ditambahkan', 'success')
        }
        setIsLoading(false)
    }
    const getCategories = async () => {
        setIsLoading(true)
        let { data: categories, error } = await supabase
            .from('categories')
            .select('*')

        if (error) {
            Swal.fire(ERROR_MESSAGE, error, 'error')
        } else {
            setData(categories.map((item, index) => {
                return (
                    <tr key={item.id}>
                        <td className="p-3 border border-slate-500 text-center">{index + 1}</td>
                        <td className="p-3 border border-slate-500">{item.name}</td>
                        <td className="p-3 border border-slate-500 text-center"><span>edit</span></td>
                    </tr>
                )
            }))
        }
        setIsLoading(false)
    }
    // eslint-disable-next-line
    useEffect(() => {
        getCategories()
    }, [])

    return (isLoading ? <Loader loadText={'Mohon tunggu...'} /> :
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <h1>Kategori</h1>
                <div className='flex justify-end'>
                    <ButtonComponent text={'TAMBAH'} className={`md:w-1/4 w-full`} onClick={() => setModalShow(true)} />
                </div>
            </div>
            <div className='w-full'>
                <TableComponent data={data} heads={heads} />
            </div>
            <Modal
                show={modalShow}
                size="md"
                popup={true}
                onClose={() => setModalShow(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Masukan data kategori
                        </h3>
                        <form ref={formRef} onSubmit={e => {
                            e.preventDefault()
                            let formData = new FormData(e.target)
                            let name = formData.get('name')
                            addCategory(name)
                            formRef.current.reset()
                        }}>
                            <div className='w-full'>
                                <InputComponent autoFocus={true} className={`w-full`} name={`name`} placeholder={`Masukan nama kategori`} />
                            </div>
                            <div className="w-full">
                                <ButtonComponent className={'w-full'} text={`TAMBAH`} onClick={() => { }} />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
