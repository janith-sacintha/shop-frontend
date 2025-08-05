
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminPage from './pages/adminPage.jsx'
import TestPage from './pages/testPage.jsx'
import { Toaster } from 'react-hot-toast'
import ClientWebPage from './pages/client/clientPage.jsx'

function App() {

  return (
    
    <BrowserRouter>
      <div className="w-full h-screen flex justify-center items-center">
          <Toaster position="top-right"/>
          <Routes path="/">
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/admin/*" element={<AdminPage/>}/>
            <Route path="/test" element={<TestPage/>}/>
            <Route path="/*" element={<ClientWebPage/>}></Route>
          </Routes>
        
      </div>
    </BrowserRouter>
  
  )
}

export default App
