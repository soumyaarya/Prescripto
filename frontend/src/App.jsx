import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route,useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
//admin pages
import { useContext } from 'react'
import Dashboard from './admin/pages/Admin/Dashboard'
import AllAppointments from './admin/pages/Admin/AllAppointments'
import AddDoctor from './admin/pages/Admin/AddDoctor'
import DoctorsList from './admin/pages/Admin/DoctorsList'
import DoctorDashboard from './admin/pages/Doctor/DoctorDashboard'
import DoctorAppointments from './admin/pages/Doctor/DoctorAppointments'
import DoctorProfile from './admin/pages/Doctor/DoctorProfile'
import { AdminContext } from './admin/context/AdminContext'
import { DoctorContext } from './admin/context/DoctorContext'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import DoctorRoute from './components/DoctorRoute'
// Admin Components
import Sidebar from './admin/components/Sidebar'
const App = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const location = useLocation()

  const isAdminOrDoctor = aToken || dToken
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isDoctorRoute = location.pathname.startsWith('/doctor')

  const showSidebar = isAdminOrDoctor && (isAdminRoute || isDoctorRoute)
  const showNavbar = !isAdminOrDoctor
  const showFooter = !isAdminOrDoctor
  return (
   <div className={isAdminOrDoctor ? 'bg-[#F8F9FD]' : ''}>
      <ToastContainer />
      {showNavbar && <Navbar />}
      <div className={showSidebar ? 'flex items-start' : 'mx-4 sm:mx-[10%]'}>
        {showSidebar && <Sidebar />}
        <Routes>

          {/* === USER ROUTES === */}
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/verify' element={<Verify />} />

          {/* === ADMIN ROUTES === */}
          
        <Route path='/admin-dashboard' element={
          <AdminRoute><Dashboard /></AdminRoute>
        } />
        <Route path='/all-appointments' element={
          <AdminRoute><AllAppointments /></AdminRoute>
        } />
        <Route path='/add-doctor' element={
          <AdminRoute><AddDoctor /></AdminRoute>
        } />
        <Route path='/doctor-list' element={
          <AdminRoute><DoctorsList /></AdminRoute>
        } />

        <Route path='/doctor-dashboard' element={
          <DoctorRoute><DoctorDashboard /></DoctorRoute>
        } />
        <Route path='/doctor-appointments' element={
          <DoctorRoute><DoctorAppointments /></DoctorRoute>
        } />
        <Route path='/doctor-profile' element={
          <DoctorRoute><DoctorProfile /></DoctorRoute>
        } />

        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  )
}

export default App