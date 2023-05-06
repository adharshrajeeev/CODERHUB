import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./style.scss";
import Login from './pages/user/login/Login';
import Profile from './pages/user/profile/Profile'
import Register from './pages/user/register/Register';
import Explore from './pages/user/explore/Explore';
import AdminLogin from './pages/admin/adminLogin/Login';
import AdminHome from './pages/admin/adminHome/Home'
import AdminUserList from './pages/admin/adminUserList/AdminUserList';
import { AuthorizeUser, ProtectUser } from './protected/AuthUser';
import { AuthorizeAdmin, ProtectAdmin } from './protected/AuthAdmin';
import Connections from './pages/user/network/Connections';
import Followings from './pages/user/network/Followings';
import Followers from './pages/user/network/Followers';
import UserProfiles from './pages/user/profile/UserProfiles';
import AdminPostList from './pages/admin/adminPosts/AdminPostList';
import Settings from './pages/user/settings/Settings';
import LazyLoading from './components/user/Loading/LazyLoading';
import PasswordForget from './pages/user/forget/PasswordForget';
import Messenger from './pages/user/messenger/Messenger';
import SearchedResults from './pages/user/searchResults/SearchedResults';
import PostView from './pages/admin/postDetails/PostView';
import NotifcationsPage from './pages/user/userNotifications/NotifcationsPage';
const LazyHomePage = React.lazy(()=>import('./pages/user/home/Home'))





function App() {


  const darkMode = false

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <BrowserRouter>
        <Routes>
          {/* USER ROUTES */}
          <Route path='/' element={
            <ProtectUser>
              <Login />
            </ProtectUser>
          } />
          <Route path='/signUp' element={
            <ProtectUser>
              <Register />
            </ProtectUser>
          } />

<         Route path='/signupVerification' element={
            <ProtectUser>
              <Register />
            </ProtectUser>
          } />

          <Route path='/home' element={
            <AuthorizeUser>
              <React.Suspense fallback={<LazyLoading/>}>
                <LazyHomePage/>
              </React.Suspense>
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

            <Route path='/messenger' element={
            <AuthorizeUser>
              <Messenger/>
            </AuthorizeUser>
          } />


           <Route path='/settings' element={
            <AuthorizeUser>
              <Settings/>
            </AuthorizeUser>
          } />

           <Route path='/forgetPassword' element={
       
            <ProtectUser>
              <PasswordForget/>
            </ProtectUser>
         
          } />

        <Route path='/searchResults' element={
       
       <AuthorizeUser>
         <SearchedResults/>
         </AuthorizeUser>
     } />

        <Route path='/notifications' element={
       
       <AuthorizeUser>
       <NotifcationsPage/>
         </AuthorizeUser>
     } />

          {/* ========================================ADMIN ROUTESS============================================================= */}


          <Route path='/admin' element={
            <ProtectAdmin>
              <AdminLogin />
            </ProtectAdmin>
          }
          />

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

          <Route path='/admin/posts' element={
            <AuthorizeAdmin>
              <AdminPostList />
            </AuthorizeAdmin>
          } />

            <Route path='/admin/posts/detailed/:postId' element={
            <AuthorizeAdmin>
              <PostView />
            </AuthorizeAdmin>
          } />


          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App