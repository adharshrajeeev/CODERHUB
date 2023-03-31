import React from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./style.scss";
import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import Profile from './pages/user/profile/Profile'
import Register from './pages/user/register/Register';
import Explore from './pages/user/explore/Explore';
import AdminLogin from './pages/admin/adminLogin/Login';
import AdminHome from './pages/admin/adminHome/Home'


function App() {
  
  const isAuth = Boolean(useSelector((state) => state.user.token));
  const adminAuth = Boolean(localStorage.getItem('adminToken'));

  const darkMode =false

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
       <BrowserRouter>
       <Routes>
       <Route path='/' element={!isAuth ? <Login /> : <Home/>} /> 
          <Route path='/signUp' element={<Register />} />
          <Route path='/home' element={isAuth ? <Home /> : <Login/>} />
          <Route path='/profile' element={isAuth ? <Profile/> : <Navigate to={'/'}/>} />
          <Route path='/explore' element={isAuth ? <Explore/> : <Navigate to={'/'}/>} />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={adminAuth ? <AdminHome/> : <Navigate to={'/admin'}/>}  />
          
          {/* <Route path='*' element={<PageNotFound />} /> */}
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App