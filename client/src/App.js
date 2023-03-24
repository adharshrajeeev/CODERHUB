import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import LoginPage from './pages/UserPages/login/LoginPage'
import SignupPage from './pages/UserPages/register/SignupPage'
import HomePage from './pages/UserPages/home/HomePage'
import ProfilePage from './pages/UserPages/profile/ProfilePage'
import PageNotFound from './pages/UserPages/PageNotFound';
import { useSelector } from 'react-redux'
import Explore from './pages/UserPages/explore/Explore'



function App() {

  const isAuth = Boolean(useSelector((state) => state?.token));

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={!isAuth ? <LoginPage /> : <HomePage/>} />
          <Route path='/signUp' element={<SignupPage />} />
          <Route path='/home' element={isAuth ? <HomePage /> : <LoginPage/>} />
          <Route path='/profile' element={isAuth ? <ProfilePage/> : <Navigate to={'/'}/>} />
          <Route path='/explore' element={isAuth ? <Explore/> : <Navigate to={'/'}/>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
