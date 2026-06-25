import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCar, FaTag } from "react-icons/fa";
import useCars from "../../hooks/useCars";
import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  // Load inventory from Firestore
  const { cars: carsList, loading } = useCars();

  const dealsList = carsList.filter(car => car.isDiscount);

  // Calculate Statistics
  const totalValuation = carsList.reduce((acc, cur) => {
    const numericPrice = typeof cur.price === "number" ? cur.price : parseInt(String(cur.price || "").replace(/[^\d]/g, ""), 10);
    return acc + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  const averagePrice = totalValuation / (carsList.length || 1);

  // Sort by date for recently added list
  const sortedCars = [...carsList].sort((a, b) => {
    const dateA = a.createdAt?.seconds || 0;
    const dateB = b.createdAt?.seconds || 0;
    return dateB - dateA;
  });

  return (
    <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
      
      {/* Shared Admin Sidebar */}
      <AdminSidebar activeTab={activeTab} />

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-white capitalize">
            {activeTab}
          </h1>
          <span className="text-xs text-gray-500 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            Authorized Mode
          </span>
        </header>

        {/* View Content */}
        <div className="p-8 grow">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: "Total Cars", val: loading ? "..." : carsList.length, icon: <FaCar className="text-white" size={16} /> },
                  { title: "Active Deals", val: loading ? "..." : dealsList.length, icon: <FaTag className="text-red-400" size={16} /> },
                  { title: "Total Valuation", val: loading ? "..." : `₹${(totalValuation / 100000).toFixed(1)} L`, icon: <span className="text-green-400 font-bold text-xs">₹</span> },
                  { title: "Average Price", val: loading ? "..." : `₹${(averagePrice / 100000).toFixed(1)} L`, icon: <span className="text-cyan-400 font-bold text-xs">avg</span> }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/2 border border-white/6 p-6 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{stat.title}</p>
                      <h3 className="text-2xl font-black text-white">{stat.val}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Cars Table */}
              <div className="bg-white/2 border border-white/6 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  Recently Added Cars
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 font-bold">
                        <th className="pb-3">Car Details</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Specs</th>
                        <th className="pb-3">Badge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="py-8 text-center text-gray-500">
                            Loading recently added cars...
                          </td>
                        </tr>
                      ) : sortedCars.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-8 text-center text-gray-500">
                            No vehicles found in inventory.
                          </td>
                        </tr>
                      ) : (
                        sortedCars.slice(0, 4).map((car) => (
                          <tr key={car.id} className="text-gray-300 hover:bg-white/1">
                            <td className="py-4 flex items-center gap-3">
                              <img 
                                src={car.image} 
                                className="w-10 h-8 rounded object-cover bg-gray-900 border border-white/10 shrink-0" 
                                alt={car.name}
                                onError={(e) => { 
                                  e.target.onerror = null; 
                                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='100%' height='100%' fill='%231a1a1e'/><text x='50%' y='55%' font-size='8' font-family='sans-serif' font-weight='bold' fill='%23444' dominant-baseline='middle' text-anchor='middle'>NO IMAGE</text></svg>"; 
                                }} 
                              />
                              <div>
                                <p className="font-bold text-white">{car.name}</p>
                                <span className="text-[10px] text-gray-500">{car.brand}</span>
                              </div>
                            </td>
                            <td className="py-4 font-bold text-white">
                              {typeof car.price === "number" ? `₹${car.price.toLocaleString("en-IN")}` : car.price}
                            </td>
                            <td className="py-4">
                              <span className="inline-block bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] mr-1.5">{car.year}</span>
                              <span className="inline-block bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">{car.kms}</span>
                            </td>
                            <td className="py-4">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[9px] font-bold text-white uppercase ${car.color || "bg-blue-600"}`}>
                                {car.badge || "NEW"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

      </section>

    </main>
  );
};

export default AdminDashboard;
