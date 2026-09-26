import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Volunteer from './pages/Volunteer.jsx'
import VolunteerDashboard from './pages/VolunteerDashboard.jsx'
import Beggar from './pages/Beggar.jsx'
import Citizen from './pages/Citizen.jsx'
import CitizenDashboard from './pages/CitizenDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AllVolunteers from './pages/AllVolunteers.jsx'
import AllCitizens from './pages/AllCitizens.jsx'
import AllBeggars from './pages/AllBeggars.jsx'
import AllUsers from './pages/AllUsers.jsx'
import Find from './pages/Find.jsx'

function App() {
  const location = useLocation();

  // Bootstrap's modal JS appends a .modal-backdrop div to <body> and adds a
  // "modal-open" class + inline styles when a modal is shown. If we navigate
  // away (e.g. after login) before Bootstrap finishes its own close/hide
  // cleanup, that backdrop and body styling get orphaned and block clicks
  // on whatever page loads next. This strips them out on every route change.
  useEffect(() => {
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/volunteercred" element={<Volunteer />} />
      <Route path="/voldash" element={<VolunteerDashboard />} />
      <Route path="/beggarcred" element={<Beggar />} />
      <Route path="/citizencred" element={<Citizen />} />
      <Route path="/citizendash" element={<CitizenDashboard />} />
      <Route path="/admindash" element={<AdminDashboard />} />
      <Route path="/allvol" element={<AllVolunteers />} />
      <Route path="/allcit" element={<AllCitizens />} />
      <Route path="/allbeg" element={<AllBeggars />} />
      <Route path="/allusers" element={<AllUsers />} />
      <Route path="/find" element={<Find />} />
    </Routes>
  )
}

export default App
