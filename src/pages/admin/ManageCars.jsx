import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaCar, FaTag, FaTimes, FaSearch } from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";
import useCars from "../../hooks/useCars";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ManageCars = () => {
  const navigate = useNavigate();

  // Load inventory from Firestore
  const { cars: allCars, loading } = useCars();
  const [searchQuery, setSearchQuery] = useState("");

  const carsList = allCars.filter(car => !car.isDiscount);
  const dealsList = allCars.filter(car => car.isDiscount);

  const handleDelete = async (id, type) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        await deleteDoc(doc(db, "cars", id));
      } catch (err) {
        console.error("Error deleting document:", err);
        alert("Failed to delete vehicle.");
      }
    }
  };

  // Safe fallback placeholder image URL to prevent infinite loading loops
  const placeholderImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='100%' height='100%' fill='%231a1a1e'/><text x='50%' y='55%' font-size='8' font-family='sans-serif' font-weight='bold' fill='%23444' dominant-baseline='middle' text-anchor='middle'>NO IMAGE</text></svg>";

  const filteredCars = carsList.filter(car => 
    (car.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (car.brand || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (car.fuel || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (car.transmission || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeals = dealsList.filter(deal => 
    (deal.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (deal.brand || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (deal.fuel || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (deal.transmission || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
      
      {/* Shared Admin Sidebar */}
      <AdminSidebar activeTab="manage" />

      {/* Main Content Area */}
      <section className="grow flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-white">Manage Inventory</h1>
          <span className="text-xs text-gray-500 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            Authorized Mode
          </span>
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-6xl grow">
          
          <div className="bg-white/2 border border-white/6 rounded-3xl p-6 shadow-xl space-y-8">
            
            {/* Search Input Bar */}
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <FaSearch size={12} />
              </span>
              <input
                type="text"
                placeholder="Search by name, brand, fuel, transmission..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition placeholder-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-white transition cursor-pointer"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>

            {/* Ordinary Cars Table */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaCar className="text-gray-400" size={14} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Regular Cars ({filteredCars.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 font-bold">
                      <th className="pb-3 w-[40%]">Car Details</th>
                      <th className="pb-3 w-[15%]">Price</th>
                      <th className="pb-3 w-[10%]">Year</th>
                      <th className="pb-3 w-[15%]">KMs</th>
                      <th className="pb-3 w-[10%]">Fuel/Trans</th>
                      <th className="pb-3 w-[10%] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500">
                          Loading regular cars...
                        </td>
                      </tr>
                    ) : filteredCars.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500">
                          {searchQuery ? "No matching regular cars found." : "No regular cars in inventory."}
                        </td>
                      </tr>
                    ) : (
                      filteredCars.map((car) => (
                        <tr key={car.id} className="text-gray-300 hover:bg-white/1">
                          <td className="py-4 flex items-center gap-3">
                            <img 
                              src={car.image} 
                              className="w-10 h-8 rounded object-cover bg-gray-900 border border-white/10 shrink-0" 
                              alt={car.name}
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = placeholderImage; 
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
                          <td className="py-4">{car.year}</td>
                          <td className="py-4">{car.kms}</td>
                          <td className="py-4">{car.fuel} • {car.transmission}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => navigate(`/admin/edit-car/car/${car.id}`)}
                                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                                title="Edit Car"
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                onClick={() => handleDelete(car.id, "car")}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer"
                                title="Delete Car"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Discounted Deals Table */}
            <div>
              <div className="flex items-center gap-2 mb-4 pt-4 border-t border-white/5">
                <FaTag className="text-red-400" size={14} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Discount Deals ({filteredDeals.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 font-bold">
                      <th className="pb-3 w-[35%]">Car Details</th>
                      <th className="pb-3 w-[15%]">Price</th>
                      <th className="pb-3 w-[10%]">Discount</th>
                      <th className="pb-3 w-[10%]">Year</th>
                      <th className="pb-3 w-[10%]">KMs</th>
                      <th className="pb-3 w-[10%]">Fuel/Trans</th>
                      <th className="pb-3 w-[10%] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-gray-500">
                          Loading active deals...
                        </td>
                      </tr>
                    ) : filteredDeals.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-gray-500">
                          {searchQuery ? "No matching deals found." : "No active deals."}
                        </td>
                      </tr>
                    ) : (
                      filteredDeals.map((deal) => (
                        <tr key={deal.id} className="text-gray-300 hover:bg-white/1">
                          <td className="py-4 flex items-center gap-3">
                            <img 
                              src={deal.image} 
                              className="w-10 h-8 rounded object-cover bg-gray-900 border border-white/10 shrink-0" 
                              alt={deal.name}
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = placeholderImage; 
                              }} 
                            />
                            <div>
                              <p className="font-bold text-white">{deal.name}</p>
                              <span className="text-[10px] text-gray-500">{deal.brand} (Deal)</span>
                            </div>
                          </td>
                           <td className="py-4 font-bold text-white">
                            {typeof deal.price === "number" ? `₹${deal.price.toLocaleString("en-IN")}` : deal.price}
                          </td>
                          <td className="py-4 text-red-400 font-bold">
                            {deal.discountPercentage ? `${deal.discountPercentage}%` : (deal.badge ? deal.badge.replace(/[^\d]/g, "") + "%" : "-")}
                          </td>
                          <td className="py-4">{deal.year}</td>
                          <td className="py-4">{deal.kms}</td>
                          <td className="py-4">{deal.fuel} • {deal.transmission}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => navigate(`/admin/edit-car/deal/${deal.id}`)}
                                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                                title="Edit Deal"
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                onClick={() => handleDelete(deal.id, "deal")}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer"
                                title="Delete Deal"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </section>

    </main>
  );
};

export default ManageCars;
