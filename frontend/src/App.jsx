import { Button } from '@/components/ui/button'
import Test from './pages/Test';
import Landing from './pages/LandingPage'
import Prescription from './pages/Prescription'
import { MailOpen } from "lucide-react"
import AppState from './context/AppState';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import ProfilePage from './pages/ProfilePage';
import Chat from './pages/ChatPage'


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
          <Route path='/chatbot' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
   </AppState>
  )
}
export default App;


