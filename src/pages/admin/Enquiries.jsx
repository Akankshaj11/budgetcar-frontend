import React, { useState } from "react";
import { FaInbox, FaTrash, FaPhoneAlt, FaEnvelope, FaClock, FaTags } from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";

const defaultEnquiries = [
  {
    id: 101,
    name: "Rohan Sharma",
    phone: "+91 98765 43210",
    email: "rohan.sharma@gmail.com",
    message: "Hi, I am interested in purchasing the Maruti Suzuki Swift VXi listed for ₹4.85 Lakh. Please share availability and finance options.",
    type: "buy",
    date: "24/06/2026, 05:15:30 pm"
  },
  {
    id: 102,
    name: "Priya Patel",
    phone: "+91 99887 76655",
    email: "priya.patel@yahoo.com",
    message: "I want to sell my Hyundai i20 Sportz 2021 model. It has driven around 28,000 km, single owner, no insurance claims. Looking for a valuation.",
    type: "sell",
    date: "24/06/2026, 04:30:10 pm"
  },
  {
    id: 103,
    name: "Amit Desai",
    phone: "+91 91234 56789",
    email: "amit.desai@outlook.com",
    message: "Would like to book a test drive for the Honda City (ID: 2) this coming Saturday morning around 11:00 AM. Please confirm if slot is open.",
    type: "testdrive",
    date: "24/06/2026, 02:45:00 pm"
  }
];

const Enquiries = () => {
  // Load enquiries from localStorage
  const [enquiries, setEnquiries] = useState(() => {
    if (typeof window === "undefined") return defaultEnquiries;
    const stored = localStorage.getItem("budget_enquiries");
    if (!stored) {
      localStorage.setItem("budget_enquiries", JSON.stringify(defaultEnquiries));
      return defaultEnquiries;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultEnquiries;
    }
  });

  const [activeFilter, setActiveFilter] = useState("all"); // "all", "buy", "sell", "testdrive"

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      const updated = enquiries.filter(item => item.id !== id);
      localStorage.setItem("budget_enquiries", JSON.stringify(updated));
      setEnquiries(updated);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "buy":
        return "bg-blue-500/10 border border-blue-500/20 text-blue-400";
      case "sell":
        return "bg-green-500/10 border border-green-500/20 text-green-400";
      case "testdrive":
        return "bg-purple-500/10 border border-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/10 border border-gray-500/20 text-gray-400";
    }
  };

  return (
    <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
      
      {/* Shared Admin Sidebar */}
      <AdminSidebar activeTab="enquiries" />

      {/* Main Content Area */}
      <section className="flex-grow flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-white">Client Enquiries</h1>
          <span className="text-xs text-gray-500 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            Inbox ({enquiries.length})
          </span>
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-5xl flex-grow space-y-6">
          
          {/* Toggle Buttons Filter Bar */}
          <div className="flex bg-white/[0.02] border border-white/[0.06] p-1 rounded-2xl max-w-md shadow-lg">
            {[
              { id: "all", label: "All" },
              { id: "buy", label: "Buy" },
              { id: "sell", label: "Sell" },
              { id: "testdrive", label: "Test Drive" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-white text-gray-955 shadow-md shadow-white/5"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Enquiries List */}
          <div className="space-y-4">
            {filteredEnquiries.length === 0 ? (
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                <FaInbox size={32} className="text-gray-600" />
                <p className="text-sm text-gray-500 font-semibold">No enquiries found</p>
                <p className="text-[10px] text-gray-600">Messages sent through the contact form will appear here.</p>
              </div>
            ) : (
              filteredEnquiries.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-white/10 transition-colors duration-300"
                >
                  
                  {/* Left Block: Client Info & Message */}
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-sm font-bold text-white">{item.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase ${getTypeBadgeClass(item.type)}`}>
                        {item.type === "testdrive" ? "Test Drive" : item.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold">
                        <FaClock size={10} />
                        {item.date}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed bg-white/[0.01] border border-white/[0.03] p-4 rounded-xl">
                      {item.message}
                    </p>

                    {/* Client Contacts */}
                    <div className="flex flex-wrap gap-4 pt-1">
                      <a 
                        href={`tel:${item.phone}`}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 hover:text-white transition-colors"
                      >
                        <FaPhoneAlt size={10} className="text-gray-500" />
                        {item.phone}
                      </a>
                      <a 
                        href={`mailto:${item.email}`}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 hover:text-white transition-colors"
                      >
                        <FaEnvelope size={10} className="text-gray-500" />
                        {item.email}
                      </a>
                    </div>
                  </div>

                  {/* Right Block: Delete Trigger */}
                  <div className="shrink-0 flex items-start justify-end">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer shadow-lg"
                      title="Delete Enquiry"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </section>

    </main>
  );
};

export default Enquiries;
