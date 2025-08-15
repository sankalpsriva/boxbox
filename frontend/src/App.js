import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Seasons from './pages/Seasons';
import SeasonDetail from './pages/SeasonDetail';
import Races from './pages/Races';
import Drivers from './pages/Drivers';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import RequestVerification from './pages/RequestVerification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/seasons/:year" element={<SeasonDetail />} />
          <Route path="/races" element={<Races />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/request-verification" element={<RequestVerification />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
