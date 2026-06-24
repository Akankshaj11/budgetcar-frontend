import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCarSide, FaHome, FaPlus, FaEnvelope, 
  FaSignOutAlt, FaCar
} from "react-icons/fa";

const AdminSidebar = ({ activeTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      navigate("/admin");
    }
  };

  const handleNav = (tabId) => {
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
    <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Logo / Header */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white text-gray-955 flex items-center justify-center shadow-lg">
            <FaCarSide size={16} />
          </div>
          <div>
            <h2 className="text-md font-bold text-white leading-none">BudgetCar</h2>
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-[1.5px] mt-1 block">Admin Control</span>
          </div>
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
  );
};

export default AdminSidebar;
