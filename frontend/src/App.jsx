import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import StudentDashboard from './components/Dashboard/StudentDashboard';


function App() {
  return (
    <GoogleOAuthProvider clientId="96058883383-37l1psr3jj24606a7doisqhd6ac0th2h.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
