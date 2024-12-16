import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import Login from "./pages/Login";
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Email from './pages/Email';
import OTP from './pages/OTP';
import SetNewPassword from './pages/SetNewPassword';
import ManageUser from './components/admin/ManageUser';
import AddUserManually from './components/admin/AddUserManually';
import GenerateInvitationLink from './components/admin/GenerateInvitationLink';
import RegistrationForm from './pages/RegistrationForm';
import EditUser from './components/admin/EditUser';
import RegistrationPending from './pages/RegistrationPending';
import Navbar from './components/Navbar';
function App() {
  const location = useLocation();
  const noNavbar = ['/', '/enter_your_email', "/verify_otp", "/set_new_password", "/register", "/registration_pending"];

  return (
    <div className="App bg-slate-100">
     {!noNavbar.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student-dashboard" element={<UserDashboard />} />
          <Route path="/staff-dashboard" element={<CoordinatorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/enter_your_email" element={<Email />} />
          <Route path="/verify_otp" element={<OTP />} />
          <Route path="/set_new_password" element={<SetNewPassword />} />
          <Route path="/manage_users" element={<ManageUser />} />
          <Route
            path="/generate_invitation_Link"
            element={<GenerateInvitationLink />}
          />
          <Route path="/add_user" element={<AddUserManually />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path='/edit' element={<EditUser />} />
          <Route path="/registration_pending" element={<RegistrationPending />} />
        </Routes>
    </div>
  )
}

export default App
