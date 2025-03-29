import { Button } from '@/components/ui/button'
import Test from './pages/Test';
import Landing from './pages/LandingPage'
import Prescription from './pages/Prescription'
import { MailOpen } from "lucide-react"
import AppState from './context/AppState';
import Chat from './pages/ChatPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import ProfilePage from './pages/ProfilePage';
import { ConsultPage } from './components/ui/ConsultPage';
import VideoCall from './pages/VideoCall';
import Dashboard from './pages/Dashboard'
import DoctorRegistration from './pages/DoctorRegistration';


function App() {

  return (
    <AppState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={'/home'}/>}/>
          <Route path='/home' element={<Landing/>}/>
          <Route path='/prescriptions' element={<Prescription/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/call' element={<ConsultPage/>}/>
          <Route path="/video-call" element={<VideoCall />} />
          <Route path='/chatbot' element={<Chat/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/register' element={<DoctorRegistration/>}/>
        </Routes>
      </BrowserRouter>
   </AppState>
  )
}
export default App;