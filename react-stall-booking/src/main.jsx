import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import AppV2 from './AppV2.jsx'
import BookingSuccess from './components/BookingSuccess.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/v2" element={<AppV2 />} />
        <Route path="/success" element={<BookingSuccess />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
