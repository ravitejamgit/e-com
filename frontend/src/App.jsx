import {React} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return(
    <>
     <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
     </Router>
    </>
  )
}