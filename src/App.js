import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import { lazy } from "react";

import "./index.css"

const FullLayout = lazy(() => import("./layouts/FullLayout/FullLayout.js"));
const Dashboard1 = lazy(() => import("./views/dashboards/Dashboard1.js"));
const Login = lazy(() => import("./views/authentification/login.jsx"));
const Event = lazy(() => import("./views/Event/Event.jsx"));
const Email = lazy(() => import("./views/authentification/Email.jsx"));
const EventDetail = lazy(() => import("./views/Event/Eventdetails.jsx"));
const AddEvent = lazy(() => import("./views/Event/AddEvent.jsx"));
const ManageEvents = lazy(() => import("./views/Event/ManageEvents.jsx"));
const RemoveEvent = lazy(() => import("./views/Event/RemoveEvent.jsx"));
const EditEvent = lazy(() => import("./views/Event/EditEvent.jsx"));
const ManageOrganizers = lazy(() => import("./views/Organizer/ManageOrganizers.jsx"));
const Payment = lazy(() => import("./views/Payment/Payment.jsx"));
const ManageProfile = lazy(() => import("./views/Profile/ManageProfile.jsx"));

const App = () => {
  const theme = baseTheme;
  
  // You can add authentication check here
 /*  const isAuthenticated = () => {
    // Replace this with your actual authentication check
    return localStorage.getItem('token') !== null;
  }; */

  // Protected Route component
  /* const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }; */

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<Email />} />
        
        {/* Protected routes */}
        <Route path="/app" element={<FullLayout />}>
          <Route index element={<Navigate to="/app/dashboard" />} />
          <Route path="dashboard" element={<Dashboard1 />} />
          <Route path="event" element={<Event />} />
          <Route path="event-details" element={<EventDetail />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="modify-event" element={<ManageEvents />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="remove-event" element={<RemoveEvent />} />
          <Route path="manage-organizers" element={<ManageOrganizers />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<ManageProfile />} />
        </Route>

        {/* Catch all redirect to login 
        <Route path="*" element={<Navigate to="/login" replace />} />*/}
      </Routes>
    </ThemeProvider>
  );
};

export default App;