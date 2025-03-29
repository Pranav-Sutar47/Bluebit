
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppState from './context/AppState';
import Navbar from './components/ui/Navbar';
import DoctorNavbar from './components/ui/DoctorNavbar';
import Landing from './pages/LandingPage';
import Prescription from './pages/Prescription';
import ProfilePage from './pages/ProfilePage';
import { ConsultPage } from './components/ui/ConsultPage';
import VideoCall from './pages/VideoCall';
import Dashboard from './pages/Dashboard';
import Chat from './pages/ChatPage';
import DoctorRegistration from './pages/DoctorRegistration';
import DoctorDashboard from './pages/Dashboard';
import Consult from './pages/ConsultPage'
function AppContent() {
  const location = useLocation();
  const isDoctorDashboard = location.pathname === '/dashboard';

  return (
    <>
      {isDoctorDashboard ? <DoctorDashboard /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/prescriptions" element={<Prescription />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/call" element={<ConsultPage />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/chatbot" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<DoctorRegistration />} />
        <Route path="/get-doctors" element={<Consult />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppState>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppState>
  );
}

export default App;
