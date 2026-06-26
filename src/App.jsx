import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import CarDetailPage from "./pages/CarDetailPage";
import AllCars from "./pages/AllCars";
import AllDeals from "./pages/AllDeals";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCar from "./pages/admin/AddCar";
import ManageCars from "./pages/admin/ManageCars";
import EditCar from "./pages/admin/EditCar";
import Enquiries from "./pages/admin/Enquiries";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-car" element={<AddCar />} />
        <Route path="/admin/manage-cars" element={<ManageCars />} />
        <Route path="/admin/edit-car/:type/:id" element={<EditCar />} />
        <Route path="/admin/enquiries" element={<Enquiries />} />
      </Routes>
    </>
  );
};

export default App;