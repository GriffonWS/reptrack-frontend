import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Register from './pages/Register';
import Login from './pages/Login';


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
