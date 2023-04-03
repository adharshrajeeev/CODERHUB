import React from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import "./style.scss";
import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import Profile from './pages/user/profile/Profile'
import Register from './pages/user/register/Register';
import Explore from './pages/user/explore/Explore';
import AdminLogin from './pages/admin/adminLogin/Login';
import AdminHome from './pages/admin/adminHome/Home'
import AdminUserList from './pages/admin/adminUserList/AdminUserList';


const isAuth = Boolean(localStorage.getItem('token'));
const adminAuth = Boolean(localStorage.getItem('adminToken'));
function App() {
  

  const darkMode =false

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
       <BrowserRouter>
       <Routes>
       <Route path='/' element={<Login /> } /> 
          <Route path='/signUp' element={<Register />} />
          <Route path='/home' element={ <Home /> } />
          <Route path='/profile' element={ <Profile/> } />
          <Route path='/explore' element={ <Explore/> } />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={adminAuth ? <AdminHome/> : <Navigate to={'/admin'}/>}  />
          <Route path='/admin/users' element={adminAuth ? <AdminUserList/> : <Navigate to={'/admin'}/>}  />
          
          {/* <Route path='*' element={<PageNotFound />} /> */}
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App