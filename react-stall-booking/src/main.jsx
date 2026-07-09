import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import BookingSuccess from './components/BookingSuccess.jsx'
import StudentRegistration from './components/StudentRegistration.jsx'
import RegistrationSuccess from './components/RegistrationSuccess.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<BookingSuccess />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/register-success" element={<RegistrationSuccess />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
