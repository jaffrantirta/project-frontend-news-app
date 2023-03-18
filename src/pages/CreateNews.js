import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent } from '../components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ERROR_MESSAGE, SUPABASE_KEY, SUPABASE_URL } from '../utils/Constant';
import Swal from 'sweetalert2';
import { createClient } from '@supabase/supabase-js';
import Loader from '../utils/Loader';


export default function CreateNews() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
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

    const store = async (e) => {
        if (file === null) {
            Swal.fire('', 'Masukan gambar!', 'error')
            throw null
        }
        if (categorySelected === 0) {
            Swal.fire('', 'Pilih kategori!', 'error')
            throw null
        }
        setIsLoading(true)
        const { data, error } = await supabase.storage.from('images').upload(`${Date.now()}${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
        })
        if (error !== null) {
            Swal.fire(ERROR_MESSAGE, error.message, 'error')
            throw error
        }
        const { error: errorNews } = await supabase
            .from('news')
            .insert([
                { title: title, tags: tags, content: content, category_id: categorySelected, image: data.path },
            ])

        if (errorNews !== null) {
            Swal.fire(ERROR_MESSAGE, errorNews.message, 'error')
            throw errorNews
        }
        clear()
        Swal.fire('Berhasil', 'Berita telah ditambahkan', 'success')
        setIsLoading(false)
    }

    const getCategories = async () => {
        setIsLoading(true)
        let { data: categoriesList, error } = await supabase
            .from('categories')
            .select('*')
            .order('name')

        if (error) {
            Swal.fire(ERROR_MESSAGE, error.message, 'error')
            throw error
        }

        setCategories(categoriesList)
        setIsLoading(false)

    }

    useEffect(() => {
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
                    <option disabled>- Pilih kategori -</option>
                    {categories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                </select>
                <InputComponent onChange={e => setTitle(e.target.value)} value={title} name={'title'} placeholder='Judul' />
                <ReactQuill className='h-64 mt-10' value={content} onChange={onChange} />
                <InputComponent className={'mt-20'} type={'file'} onChange={e => setFile(e.target.files[0])} />
                <InputComponent onChange={e => setTags(e.target.value)} value={tags} name={'tags'} placeholder='Tags' />
                <ButtonComponent onClick={() => store()} text={'Simpan'} />
            </div>
        </div>
    )
}
