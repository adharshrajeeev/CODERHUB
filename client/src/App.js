import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/UserPages/login/LoginPage'
import SignupPage from './pages/UserPages/register/SignupPage'
import HomePage from './pages/UserPages/home/HomePage'
import ProfilePage from './pages/UserPages/profile/ProfilePage'
import PageNotFound from './pages/UserPages/PageNotFound'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signUp' element={<SignupPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
