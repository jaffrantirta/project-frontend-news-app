import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent } from '../components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import Loader from '../utils/Loader';
import { store } from '../context/NewsContext';
import { show } from '../context/CategoryContext';
import { upload } from '../context/StorageContext';


export default function CreateNews() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState(0)
    const [tags, setTags] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (newContent) => {
        setContent(newContent);
    }

    const storeData = async (e) => {
        if (file === null) {
            Swal.fire('', 'Masukan gambar!', 'error')
            throw new Error('File is empty')
        }
        if (categorySelected === 0) {
            Swal.fire('', 'Pilih kategori!', 'error')
            throw new Error('category not selected yet')
        }
        setIsLoading(true)
        const { data, error } = await upload({
            bucket_name: 'images',
            path: Date.now() + file.name,
            file: file
        })
        if (error) {
            Swal.fire(error.name, error.message, 'error')
            throw error
        }
        const { error: errorNews } = await store({
            title: title,
            tags: tags,
            content: content,
            category_id: categorySelected,
            image: data.path,
            is_show: true
        })
        if (errorNews) {
            Swal.fire(errorNews.message, errorNews.details, 'error')
            throw errorNews
        }
        clear()
        Swal.fire('Berhasil', 'Berita telah ditambahkan', 'success')
        setIsLoading(false)
    }

    useEffect(() => {
        async function getCategories() {
            setIsLoading(true)
            const { data, error } = await show()
            if (error) {
                Swal.fire(error.message, error.details, 'error')
                throw error
            }
            setCategories(data)
            setIsLoading(false)
        }
        getCategories()
    }, [])

    const clear = () => {
        setContent('')
        setTitle('')
        setTags('')
        setFile(null)
    }


    return (isLoading ? <Loader loadText={'Mohon tunggu...'} /> :
        <div>
            <p>Buat Berita</p>
            <div className='flex flex-col'>
                <select className='my-5' onChange={e => setCategorySelected(e.target.value)}>
                    <option>- Pilih kategori -</option>
                    {categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                </select>
                <InputComponent onChange={e => setTitle(e.target.value)} value={title} name={'title'} placeholder='Judul' />
                <ReactQuill className='h-64 mt-10' value={content} onChange={onChange} />
                <InputComponent className={'mt-20'} type={'file'} onChange={e => setFile(e.target.files[0])} />
                <InputComponent onChange={e => setTags(e.target.value)} value={tags} name={'tags'} placeholder='Tags' />
                <ButtonComponent onClick={() => storeData()} text={'Simpan'} />
            </div>
        </div>
    )
}
