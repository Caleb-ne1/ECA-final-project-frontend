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
import ForgotPassword from './pages/ForgotPassword';
import OTP from './pages/OTP';
import SetNewPassword from './pages/SetNewPassword';
import ManageUser from './components/admin/ManageUser';
import AddUserManually from './components/admin/AddUserManually';
import GenerateInvitationLink from './components/admin/GenerateInvitationLink';
import RegistrationForm from './pages/RegistrationForm';
import EditUser from './components/admin/EditUser';
import RegistrationPending from './pages/RegistrationPending';
import Navbar from './components/Navbar';
import Activity from './components/coordinator/Activity';
import CreateActivity from './components/common/CreateActivity';
import ExtracurricularActivities from './components/user/ExtracurricularActivities';
import ActivityDetailPage from './components/common/ActivityDetailPage';
import TermsAndConditions from './pages/TermsAndConditions';
import Footer from './pages/Footer';
import ViewUserDetails from './components/admin/ViewUserDetails';
import ProtectedRoute from './components/ProtectedRoute';
import ManageActivities from './components/admin/ManageActivities';
import MyActivities from './components/common/MyActivities';
import EditActivity from './components/common/EditActivity';

function App() {
  const location = useLocation();
  const noNavbar = ['/', '/enter_your_email', "/verify_otp", "/set_new_password", "/register", "/registration_pending"];
  const noFooter = [
    "/",
    "/enter_your_email",
    "/verify_otp",
    "/set_new_password",
    "/register",
    "/registration_pending",
  ];
  return (
    <div className="flex flex-col min-h-screen App bg-slate-100">
      {!noNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/enter_your_email" element={<ForgotPassword />} />
        <Route path="/verify_otp" element={<OTP />} />
        <Route path="/set_new_password" element={<SetNewPassword />} />
        <Route path="/register" element={<RegistrationForm />} />
        
        <Route element={<ProtectedRoute />}>
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/staff-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/manage_users" element={<ManageUser />} />
        <Route
          path="/generate_invitation_Link"
          element={<GenerateInvitationLink />}
        />
        <Route path="/add_user" element={<AddUserManually />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="/registration_pending" element={<RegistrationPending />} />
        <Route path="/activities" element={<Activity />} />
        <Route path="/create activity" element={<CreateActivity />} />
        <Route path="/admin/create activity" element={<CreateActivity />} />
        <Route path="/manage activities" element={<ManageActivities />} />
        <Route path ="/my/activities" element = {<MyActivities />} />
        <Route path="/activity/edit" element = {<EditActivity />} />
        <Route
          path="/extracurricular activities"
          element={<ExtracurricularActivities />}
        />
        <Route
          path="/extracurricular activity/view"
          element={<ActivityDetailPage  />}
        />
        <Route path="/terms and conditions" element={<TermsAndConditions />} />
        <Route path='/view' element={<ViewUserDetails /> } />
        </Route>
      </Routes>
      {!noFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App
