import React, { useState } from 'react'
import { ButtonComponent, InputComponent } from '../components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ERROR_MESSAGE, SUPABASE_KEY, SUPABASE_URL } from '../utils/Constant';
import Swal from 'sweetalert2';
import { createClient } from '@supabase/supabase-js';


export default function CreateNews() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)

    const onChange = (newContent) => {
        setContent(newContent);
    }

    const handleOnChangeIamge = async (event) => {
        const file = event.target.files[0];
        const { data, error } = await supabase.storage.from('images').upload(`${file.name}`, file);

        if (error) {
            throw error;
        }
        console.log(data);
    }

    const uploadImage = async (file) => {
        const { data, error } = await supabase.storage.from('images').upload(`${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
        });

        if (error) {
            throw error;
        }

        return data.Key;
    }

    const store = async (e) => {
        uploadImage(file).then(async imageName => {
            const { error } = await supabase
                .from('news')
                .insert([
                    { title: title, content: content, image: imageName },
                ])

            if (!error) {
                Swal.fire('Berhasil', 'Berita telah ditambahkan', 'success')
            }
            Swal.fire(ERROR_MESSAGE, error, 'error')
        })
    }



    return (
        <div>
            <p>Buat Berita</p>
            <div className='flex flex-col'>
                <InputComponent onChange={e => setTitle(e.target.value)} value={title} name={'title'} placeholder='Judul' />
                <ReactQuill className='h-64 mt-10' value={content} onChange={onChange} />
                <InputComponent className={'mt-20'} type={'file'} onChange={e => handleOnChangeIamge(e)} />
                <ButtonComponent onClick={() => store()} text={'Simpan'} />
            </div>
        </div>
    )
}
