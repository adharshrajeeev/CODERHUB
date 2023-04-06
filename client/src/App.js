import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./style.scss";
import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import Profile from './pages/user/profile/Profile'
import Register from './pages/user/register/Register';
import Explore from './pages/user/explore/Explore';
import AdminLogin from './pages/admin/adminLogin/Login';
import AdminHome from './pages/admin/adminHome/Home'
import AdminUserList from './pages/admin/adminUserList/AdminUserList';
import AuthorizeUser from './protected/AuthUser';
import AuthorizeAdmin from './protected/AuthAdmin';
import Connections from './pages/user/network/Connections';
import Followings from './pages/user/network/Followings';
import Followers from './pages/user/network/Followers';
import UserProfiles from './pages/user/profile/UserProfiles';



function App() {


  const darkMode = false

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <BrowserRouter>
        <Routes>
          {/* USER ROUTES */}
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<Register />} />

          <Route path='/home' element={
            <AuthorizeUser>
              <Home />
            </AuthorizeUser>
          }
          />
          <Route path='/profile' element={
            <AuthorizeUser>
              <Profile />
            </AuthorizeUser>
          }
          />
           <Route path='/user-profile/:id' element={
            <AuthorizeUser>
              <UserProfiles />
            </AuthorizeUser>
          }
          />

          <Route path='/explore' element={
            <AuthorizeUser>
              <Explore />
            </AuthorizeUser>
          } />

           <Route path='/connections' element={
            <AuthorizeUser>
              <Connections />
            </AuthorizeUser>
          } />

          <Route path='/people-following' element={
            <AuthorizeUser>
              <Followings />
            </AuthorizeUser>
          } />
          <Route path='/people-followers' element={
            <AuthorizeUser>
              <Followers />
            </AuthorizeUser>
          } />

{/* ========================================ADMIN ROUTESS============================================================= */}
          <Route path='/admin' element={<AdminLogin />} />

          <Route path='/admin/dashboard' element={
            <AuthorizeAdmin>
              <AdminHome />
            </AuthorizeAdmin>
          } />

          <Route path='/admin/users' element={
            <AuthorizeAdmin>
              <AdminUserList />
            </AuthorizeAdmin>
          } />

          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App