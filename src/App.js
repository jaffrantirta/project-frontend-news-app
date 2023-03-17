import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, Home, Login, Register } from './pages';
import ProtectedRoute from './auth/ProtectedRoute';
import { IS_LOGIN } from './utils/Constant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={IS_LOGIN ? <Navigate to={'/'} /> : <Login />} />
        <Route path='/register' element={IS_LOGIN ? <Navigate to={'/'} /> : <Register />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
