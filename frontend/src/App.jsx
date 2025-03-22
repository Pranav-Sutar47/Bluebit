import { Button } from '@/components/ui/button'
import Test from './pages/Test';
import Landing from './pages/LandingPage'
import { MailOpen } from "lucide-react"
import AppState from './context/AppState';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/ui/Navbar';

function App() {

  return (
    <AppState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={'/home'}/>}/>
          <Route path='/home' element={<Landing/>}/>
        </Routes>
      </BrowserRouter>
   </AppState>
  )
}
export default App;


