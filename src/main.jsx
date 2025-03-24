import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import TrophyCabinet from './TrophyCabinet.jsx'; // We'll create this next
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/trophy-cabinet" element={<TrophyCabinet />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
