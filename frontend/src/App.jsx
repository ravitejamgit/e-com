import {React} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

export default function App() {
  axios.defaults.withCredentials = true;
  return(
    <>
     <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
     </Router>
    </>
  )
}