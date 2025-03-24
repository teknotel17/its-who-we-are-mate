import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import TrophyCabinet from './pages/TrophyCabinet'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* If user goes to /trophy-cabinet, load TrophyCabinet directly */}
      <Route path="/trophy-cabinet" element={<TrophyCabinet />} />

      {/* Everything else (/, /login, /admin, etc.) is handled by App's nested routes */}
      <Route path="/*" element={<App />} />

    </Routes>
  </BrowserRouter>
)
