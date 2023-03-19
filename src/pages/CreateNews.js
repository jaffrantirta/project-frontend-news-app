import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent } from '../components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import Loader from '../utils/Loader';
import { store, selectSingleById, update } from '../context/NewsContext';
import { show } from '../context/CategoryContext';
import { remove, upload } from '../context/StorageContext';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { ERROR_MESSAGE } from '../utils/Constant';

export default function CreateNews() {
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState(0)
    const [tags, setTags] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [path, setPath] = useState('')
    const [isShow, setIsShow] = useState(true)

    const onChange = (newContent) => {
        setContent(newContent);
    }

    const storeData = async (e) => {
        if (!queryParams.has('id') && file === null) {
            Swal.fire('', 'Masukan gambar!', 'error')
            return new Error('File is empty')
        }

        if (categorySelected === 0) {
            Swal.fire('', 'Pilih kategori!', 'error')
            return new Error('category not selected yet')
        }
        console.log(categorySelected);
        setIsLoading(true)
        let v_path = path
        let new_path = null
        if (file) {
            const { data, error } = await upload({
                bucket_name: 'images',
                path: `news/${uuidv4()}`,
                file: file
            })
            if (error) {
                Swal.fire(error.name, ERROR_MESSAGE, 'error')
                throw error
            }
            v_path = data.path
            new_path = data.path
        }

        if (queryParams.has('id')) {
            const { error: errorNews } = await update({
                title: title,
                tags: tags,
                content: content,
                category_id: categorySelected,
                image: v_path,
                is_show: isShow,
                id: queryParams.get('id')
            })
            if (errorNews) {
                Swal.fire(ERROR_MESSAGE, errorNews.message, 'error')
                setIsLoading(false)
                throw errorNews
            }
        } else {
            console.log('create');
            const { error: errorNews } = await store({
                title: title,
                tags: tags,
                content: content,
                category_id: categorySelected,
                image: v_path,
                is_show: isShow
            })
            console.log(errorNews);
            if (errorNews) {
                setIsLoading(false)
                console.log(new_path);
                if (new_path !== null) {
                    const { e } = await remove({ bucket_name: 'images', path: new_path })
                    console.log(e);
                }
                Swal.fire(ERROR_MESSAGE, errorNews.message, 'error')
                throw errorNews
            }
        }
        clear()
        Swal.fire('Berhasil', queryParams.has('id') ? 'Berita telah diedit' : 'Berita telah ditambahkan', 'success')
        setIsLoading(false)
    }
    useEffect(() => {
        const queryParams = new URLSearchParams(search)
        async function getNews() {
            setIsLoading(true)
            const { data, error } = await selectSingleById(32)
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                setIsLoading(false)
                throw error
            }
            console.log(data);
            setTitle(data.title)
            setContent(data.content)
            setTags(data.tags)
            setPath(data.image)
            setCategorySelected(data.category_id)
            setIsShow(data.is_show)
            setIsLoading(false)
        }
        async function getCategories() {
            setIsLoading(true)
            const { data, error } = await show()
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                setIsLoading(false)
                throw error
            }
            setCategories(data)
            setIsLoading(false)
        }
        if (queryParams.has('id')) getNews(queryParams.get('id'))
        getCategories()
    }, [search])

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
