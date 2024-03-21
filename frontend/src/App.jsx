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
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import ImportExcel from "./pages/ImportExcel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="dashboard/event/:id" element={<Navigation />}>
          <Route path="marketing" element={<MarketingPage />} />
          <Route path="generalinfo" element={<GeneralInfoPage />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="userlogin" element={<UserLoginPage />} />
          <Route path="/Attendance" element={<Attendance />} />

        </Route>
        
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/dashboard" element={<LandingPage />} />
      </Routes>
      <ImportExcel />

      </Router>
  );
}

export default App;