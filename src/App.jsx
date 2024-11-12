
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Events from './components/Events'
import Pnf from './components/Pnf'
import EventDeails from './components/EventDeails'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {  

  return (
    <>
    <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
    }
  }
    >
    <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/event_booking_app" exact element={<Signup/>}></Route>
      <Route path="/login" exact element={<Login/>}></Route>
      <Route path="/events" exact element={<Events/>}></Route>
      <Route path="/eventDetails/:eid" exact element={<EventDeails/>}></Route>
      <Route path="*" element={<Pnf/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
