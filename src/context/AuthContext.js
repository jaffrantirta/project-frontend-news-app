import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../auth/Client"
import Loader from "../utils/Loader"

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

const login = (email, password) => supabase.auth.signInWithPassword({ email, password })

const signOut = () => supabase.auth.signOut()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        setLoading(true)
        const { data: session } = await supabase.auth.getSession()
        if (session) {
            setAuth(true)
            setUser(session.user)
        } else {
        }
        setLoading(false)
    }

    useEffect(() => {
        checkSession()
    }, [])

    if (loading) {
        return <Loader loadText={'Mohon tunggu...'} />
    }

    return (
        <AuthContext.Provider value={{ user, auth, login, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
