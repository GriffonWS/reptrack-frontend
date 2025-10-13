import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
