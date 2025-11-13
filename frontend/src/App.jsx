import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout.jsx";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home.jsx"));
const CarDetail = lazy(() => import("./pages/CarDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const AdminLayout = lazy(() => import("./components/AdminLayout.jsx"));
const AdminOverview = lazy(() => import("./pages/AdminOverview.jsx"));
const AdminCars = lazy(() => import("./pages/AdminCars.jsx"));
const AdminAddCar = lazy(() => import("./pages/AdminAddCar.jsx"));
const AdminCarEdit = lazy(() => import("./pages/AdminCarEdit.jsx"));
const AdminUsers = lazy(() => import("./pages/AdminUsers.jsx"));
const AdminSettings = lazy(() => import("./pages/AdminSettings.jsx"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="services" element={<Services />} />
            </Route>
            <Route path="/cars/:id" element={<CarDetail />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="add-car" element={<AdminAddCar />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="cars/:id" element={<AdminCarEdit />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLogin />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
