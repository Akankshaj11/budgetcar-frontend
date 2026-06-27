import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCarSide, FaHome, FaPlus, FaEnvelope, 
  FaSignOutAlt, FaCar, FaBars, FaTimes
} from "react-icons/fa";
import { auth } from "../firebase";

const AdminSidebar = ({ activeTab }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      try {
        setIsOpen(false);
        await auth.signOut();
        navigate("/admin");
      } catch (err) {
        console.error("Error signing out:", err);
      }
    }
  };

  const handleNav = (tabId) => {
    setIsOpen(false);
    if (tabId === "add") {
      navigate("/admin/add-car");
    } else if (tabId === "manage") {
      navigate("/admin/manage-cars");
    } else if (tabId === "enquiries") {
      navigate("/admin/enquiries");
    } else {
      navigate(`/admin/dashboard?tab=${tabId}`);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-50 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white md:hidden hover:bg-white/10 transition cursor-pointer"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
      </button>

      {/* Backdrop Overlay when Sidebar is open on Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`w-64 bg-black/95 md:bg-black/45 border-r border-white/5 flex flex-col justify-between shrink-0 h-screen fixed md:sticky top-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-white/5 flex items-center pl-16 md:pl-6">
            <img 
              src="/budgetcarlogo.png" 
              alt="BudgetCarHub Logo" 
              className="h-16 w-auto object-contain brightness-0 invert" 
            />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: <FaHome size={14} /> },
              { id: "add", label: "Add Car", icon: <FaPlus size={14} /> },
              { id: "manage", label: "Manage Cars", icon: <FaCar size={14} /> },
              { id: "enquiries", label: "Enquiries", icon: <FaEnvelope size={14} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-gray-950 shadow-md shadow-white/5"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/5 transition duration-300 cursor-pointer"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
