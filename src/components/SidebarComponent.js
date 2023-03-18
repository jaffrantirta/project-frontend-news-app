import { createClient } from '@supabase/supabase-js'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { APP_NAME, ERROR_MESSAGE, SUPABASE_KEY, SUPABASE_URL } from '../utils/Constant'
import { MENUS } from '../utils/Menus'

export default function SidebarComponent({ toggle }) {
    const currentPath = useLocation().pathname
    const supabaseUrl = SUPABASE_URL
    const supabaseKey = SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    const navigate = useNavigate()
    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) {
            Swal.fire(ERROR_MESSAGE, error, 'error')
            return null
        }
        localStorage.removeItem('access_token');
        navigate('/login')
    }

    return (
        <div className={`flex flex-col h-screen p-5 bg-primary dark:bg-dark-primary mr-5 sticky left-0 top-0 font-primary`}>
            <div className="space-y-3">
                <div className="flex items-center text-secondary">
                    <h2 className="text-xl font-bold">{APP_NAME}</h2>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        {MENUS.home.map((item, index) => {
                            return (
                                <li key={index} className={`text-secondary hover:bg-secondary hover:text-primary rounded-full px-2 py-1 ${(currentPath === item.link) ? 'bg-secondary text-slate-500' : ''}`}>
                                    <Link onClick={(e) => toggle(e)} to={item.link} className="flex items-center p-2 space-x-3 rounded-md text-sm sm:text-base">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <li className={`text-secondary hover:bg-secondary hover:text-primary rounded-full px-2 py-1`}>
                            <Link onClick={() => Swal.fire({
                                title: 'Yakin keluar?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Logout',
                                confirmButtonColor: 'red'
                            }).then(response => {
                                if (response.isConfirmed) {
                                    console.log('keluar');
                                    handleLogout()
                                }
                            })} className="flex items-center p-2 space-x-3 rounded-md text-sm sm:text-base">
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}