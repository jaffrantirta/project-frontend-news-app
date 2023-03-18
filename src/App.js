import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Category, CreateNews, Dashboard, Home, Login, News, Register } from './pages';
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
        <Route path='/categories' element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path='/news' element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path='/news/create' element={<ProtectedRoute><CreateNews /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
