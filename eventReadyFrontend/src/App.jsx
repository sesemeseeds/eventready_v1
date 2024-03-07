import React from "react";
import {Routes, Route} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { EventPage } from "./pages/EventPage";
import GeneralInfoPage from "./pages/GeneralInfoPage";
import MarketingPage from "./pages/MarketingPage";
import Navigation from "./components/Navigation";
import Attendance from "./pages/Attendance";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
      <Routes>
        <Route path="/event/:id" element={<Navigation />}>
          <Route path="marketing" element={<MarketingPage />} />
          <Route path="generalinfo" element={<GeneralInfoPage />} />
          <Route path="helloworld" element={<HelloWorld />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="tasks" element={<TasksPage />} />
        </Route>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/generalinfo" element={<GeneralInfoPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/marketing" element={<MarketingPage />} />
      </Routes>
  );
}

export default App;