import {Routes, Route, useRoutes, BrowserRouter} from 'react-router'

import './styles/App.css'

import { Home } from './pages/User/home.jsx'
import { Login } from './pages/auth/login.jsx'
import { Admin } from './pages/admin/admin.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home />} />


        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
