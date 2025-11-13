import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout.jsx";
import Home from "./pages/Home.jsx";
import CarDetail from "./pages/CarDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import AdminOverview from "./pages/AdminOverview.jsx";
import AdminCars from "./pages/AdminCars.jsx";
import AdminAddCar from "./pages/AdminAddCar.jsx";
import AdminCarEdit from "./pages/AdminCarEdit.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
