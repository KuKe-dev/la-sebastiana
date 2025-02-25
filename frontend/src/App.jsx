import {Routes, Route, useRoutes, BrowserRouter} from 'react-router'

import './App.css'

import { Home } from './pages/User/home.jsx'
import { Login } from './pages/Protected/login.jsx'
import { Admin } from './pages/Protected/admin.jsx'

import { GetProducts} from './scripts/products.js'

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
