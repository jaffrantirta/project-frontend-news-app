import React from 'react'
import { Navigate } from 'react-router-dom'
import { AdminLayout } from '../layouts'
import { IS_LOGIN } from '../utils/Constant'

export default function ProtectedRoute({ children }) {
    if (IS_LOGIN) {
        return <AdminLayout>{children}</AdminLayout>
    }
    return <Navigate to={'/login'} />
}
