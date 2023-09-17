import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<SignUp/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
