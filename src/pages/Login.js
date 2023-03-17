import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { ButtonComponent, InputComponent } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { ERROR_MESSAGE, SUPABASE_KEY, SUPABASE_URL } from '../utils/Constant'

export default function Login() {
    const supabaseUrl = SUPABASE_URL
    const supabaseKey = SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    const navigate = useNavigate()

    const signIn = async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            alert(ERROR_MESSAGE)
        } else {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('user', data.user)
            navigate('/dashboard')

        }
    }
    return (
        <div className='h-screen font-primary bg-accentColor p-10 flex justify-center items-center'>
            <div className='p-10 bg-white rounded-3xl shadow-xl md:w-1/4 h-1/2 w-full'>
                <p className='text-center'>Silahkan masuk ke CMS</p>
                <form className='flex flex-col' onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const email = formData.get('email');
                    const password = formData.get('password');
                    signIn(email, password)
                }}>
                    <InputComponent name={'email'} placeholder={'Masukan email'} type={'email'} inputMode={'email'} />
                    <InputComponent name={'password'} placeholder={'Masukan password'} type={'password'} />
                    <ButtonComponent text={'MASUK'} onClick={() => { }} />
                    <p className='text-center'>Belum punya akun? <Link className='text-primary' to={'/register'}>Daftar disini</Link></p>
                </form>
            </div>
        </div>
    )
}
