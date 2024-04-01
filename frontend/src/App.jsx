import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { EventPage } from "./pages/EventPage";
import GeneralInfoPage from "./pages/GeneralInfoPage";
import MarketingPage from "./pages/MarketingPage";
import Navigation from "./components/Navigation";
import LandingNavigation from "./components/LandingNavigation";
import Attendance from "./pages/Attendance";
import TasksPage from "./pages/TasksPage";
import UserLoginPage from "./pages/UserLoginPage";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import GalleryPage from "./pages/GalleryPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DialogTitle } from "@mui/material";
import './index.css';
import 'typeface-roboto'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Roboto'
    },
  },
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#13547a', 
          color: 'white', 
    
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#80d0c7", 
         
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#13547a", 
          '&:hover': {
            backgroundColor: "#0e3a5f", 
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="dashboard/event/:id" element={<Navigation />}>
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="generalinfo" element={<GeneralInfoPage />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="budget" element={<BudgetPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="userlogin" element={<UserLoginPage />} />
          </Route>
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/dashboard" element={<LandingNavigation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
