
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminPage from './pages/adminPage.jsx'
import TestPage from './pages/testPage.jsx'
import { Toaster } from 'react-hot-toast'
import ClientWebPage from './pages/client/clientPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/client/forgetPassword.jsx'

function App() {

  return (
    
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="w-full h-screen flex justify-center items-center">
          <Toaster position="top-right"/>
          <Routes path="/">
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/admin/*" element={<AdminPage/>}/>
            <Route path="/test" element={<TestPage/>}/>
            <Route path="/forget" element={<ForgetPassword/>}/>
            <Route path="/*" element={<ClientWebPage/>}></Route>
          </Routes>
        
      </div>
    </GoogleOAuthProvider>
    </BrowserRouter>
  
  )
}

export default App
