import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO from "./components/SEO";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaSpinner } from "react-icons/fa";

import Home from "./pages/Home";
import CarDetailPage from "./pages/CarDetailPage";
import AllCars from "./pages/AllCars";
import AllDeals from "./pages/AllDeals";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCar from "./pages/admin/AddCar";
import ManageCars from "./pages/admin/ManageCars";
import EditCar from "./pages/admin/EditCar";
import CarProfile from "./pages/admin/CarProfile";
import Enquiries from "./pages/admin/Enquiries";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-[#070709] flex flex-col justify-center items-center">
        <FaSpinner className="animate-spin text-white text-3xl mb-4" />
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Checking authorization...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <SEO title="Admin" description="BudgetCarHub admin portal." noindex />
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cars" element={<AllCars />} />
        <Route path="/all-deals" element={<AllDeals />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add-car" element={<AdminRoute><AddCar /></AdminRoute>} />
        <Route path="/admin/manage-cars" element={<AdminRoute><ManageCars /></AdminRoute>} />
        <Route path="/admin/car-profile/:id" element={<AdminRoute><CarProfile /></AdminRoute>} />
        <Route path="/admin/edit-car/:type/:id" element={<AdminRoute><EditCar /></AdminRoute>} />
        <Route path="/admin/enquiries" element={<AdminRoute><Enquiries /></AdminRoute>} />
      </Routes>
    </>
  );
};

export default App;
