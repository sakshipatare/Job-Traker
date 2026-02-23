import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import CompanyDashboard from './components/Dashboard/CompanyDashboard';
import StudentApplicants from './components/Dashboard/company/StudentApply';


function App() {
  return (
    <GoogleOAuthProvider clientId="442659484507-a14m8uec4vl48u4bsc9vlon7mcio65eu.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/applicants/:jobId" element={<StudentApplicants />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
