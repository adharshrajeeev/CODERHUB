import React from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./style.scss";
import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import Profile from './pages/user/profile/Profile'
import Register from './pages/user/register/Register';
import Explore from './pages/user/explore/Explore';

function App() {
  
  const isAuth = Boolean(useSelector((state) => state.user.token));
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
          {/* <Route path='/admin' element={<AdminLogin/>} /> */}
          <Route path='/admin/dashboard' element={<Home/>} />
          
          {/* <Route path='*' element={<PageNotFound />} /> */}
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App