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
import Activity from './components/coordinator/Activity';
import CreateActivity from './components/coordinator/CreateActivity';
import ExtracurricularActivities from './components/user/ExtracurricularActivities';
import ActivityDetailPage from './components/user/ActivityDetailPage';
import TermsAndConditions from './pages/TermsAndConditions';
import Footer from './pages/Footer';
import ViewUserDetails from './components/admin/ViewUserDetails';
import ProtectedRoute from './components/ProtectedRoute';

const activity = {
  name: "Web Development Bootcamp",
  date: "2024-03-10",
  time: "9:00 AM - 4:00 PM",
  isVirtual: true,
  location: "Zoom (link to be shared upon registration)",
  description:
    "Dive into modern web development with hands-on sessions on HTML, CSS, JavaScript, and React.js.",
  image:
    "https://images.unsplash.com/photo-1542744095-291d1f67b221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  materials: [
    "Laptop with a web browser installed",
    "Code editor (e.g., VS Code)",
    "Stable internet connection",
  ],
  organizers: [
    {
      type: "person",
      name: "Caleb Kibet",
      title: "Lead Instructor",
      contact: "kibetCaleb@gmail.com",
      bio: "Caleb Kibet is a web development expert with 8+ years of experience in building and teaching web applications.",
      photo:
        "https://img.freepik.com/premium-vector/portrait-handsome-male-office-worker_481311-2.jpg?ga=GA1.1.494808097.1735222370&semt=ais_hybrid",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/calebkibet",
      },
    },
    {
      type: "university",
      name: "Zetech University",
      title: "Learning Institution",
      contact: "info@zetech.ac.ke",
      bio: "Zetech University is a private university in Kiambu County, Kenya. Zetech University was founded by Engineer Ken Mbiuki in 1999 and is registered by the Ministry of Higher Education Science and Technology.",
      photo:
        "https://imgs.search.brave.com/25p-rQMFqFGooOHaMegrMpKTQ36CgqQ_V2QipK24qDg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcGku/ZnJlZS1hcHBseS5j/b20vaW1nL2xvZ28v/ZTA3YTY1NDUtMGNk/Yi00NDU0LWFmYjMt/MWVlY2ZmMTEzNmFh/P3c9MTUwJmg9MTUw/JmZpdD1jcm9wJnM9/MzU1NzIzMmZlMTBk/YmQ0MjExZDRlMDc4/OGE2YTVjNDE",
      website: "https://www.zetech.ac.ke/index.php",
    },
    {
      type: "university",
      name: "Power Learn Project",
      title: "Institution",
      contact: "info@powerlearn.org",
      bio: "The Power Learn Project is an initiative that aims to empower Africa’s youth through software development, unlocking their potential to drive transformative change and create innovative solutions to address the continent’s biggest challenges.",
      photo:
        "https://imgs.search.brave.com/aaxwgkbMrEOKBl1457Z_OPgQgenMJun09eFHH7CUUQI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YXNwLmV2ZW50cy9D/TElFTlRfRW5lcmd5/TmVfOUEyQUQ5RTFf/MDUyRF9DNDY2XzIx/RkE1RjZGMDFEOTMy/NjMvc2l0ZXMvWUVT/LTIwMjMvbWVkaWEv/bGlicmFyaWVzL2V4/aGliaXRvcnMvcG93/ZXItbGVhcm50Lmpw/Zy9maXQtaW4vNTAw/eDk5OTkvZmlsdGVy/czpub191cHNjYWxl/KCk.jpeg",
      website: "https://powerlearnprojectafrica.org/",
    },
  ],
  files: [
    { name: "Bootcamp Schedule.pdf", url: "/files/schedule.pdf" },
    { name: "React Starter Kit.zip", url: "/files/react-starter-kit.zip" },
  ],
  eligibility: "Open to all students interested in coding.",
  maxParticipants: "100 students",
  ageRestrictions: "Ages 16 and above",
  specialRequirements: [
    "Basic understanding of programming",
    "Pre-installed Node.js",
    "Chrome or Firefox browser",
  ],
};




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
        <Route path="/enter_your_email" element={<Email />} />
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
        <Route
          path="/extracurricular activities"
          element={<ExtracurricularActivities />}
        />
        <Route
          path="/extracurricular activities/1"
          element={<ActivityDetailPage activity={activity} />}
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
