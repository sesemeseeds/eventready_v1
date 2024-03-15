import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from "./pages/LandingPage";
import { EventPage } from "./pages/EventPage";
import GeneralInfoPage from "./pages/GeneralInfoPage";
import MarketingPage from "./pages/MarketingPage";
import Navigation from "./components/Navigation";
import Attendance from "./pages/Attendance";
import TasksPage from "./pages/TasksPage";
import UserLoginPage from "./pages/UserLoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/event/:id" element={<Navigation />}>
          <Route path="marketing" element={<MarketingPage />} />
          <Route path="generalinfo" element={<GeneralInfoPage />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="userlogin" element={<UserLoginPage />} />
        </Route>
        
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
      </Router>
  );
}

export default App;