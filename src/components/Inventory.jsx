

import React from "react";
import {
    FaCalendarAlt,
    FaGasPump,
    FaRoad,
    FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCars from "../hooks/useCars";

// const cars = [
//     { id: 1, badge: "HOT DEAL", color: "bg-orange-500", image: "/cars/swift.jpg", name: "Maruti Suzuki Swift", price: "₹4,85,000", year: "2021", kms: "32,000 km", fuel: "Petrol", transmission: "Manual" },
//     { id: 2, badge: "CERTIFIED", color: "bg-green-600", image: "/cars/city.jpg", name: "Honda City 4th Gen", price: "₹8,20,000", year: "2020", kms: "48,000 km", fuel: "Petrol", transmission: "CVT" },
//     { id: 3, badge: "LOW KMS", color: "bg-slate-800", image: "/cars/creta.jpg", name: "Hyundai Creta", price: "₹12,50,000", year: "2022", kms: "18,500 km", fuel: "Diesel", transmission: "Automatic" },
//     { id: 4, badge: "PREMIUM", color: "bg-purple-600", image: "/cars/fortuner.jpg", name: "Toyota Fortuner", price: "₹24,90,000", year: "2021", kms: "55,000 km", fuel: "Diesel", transmission: "Automatic" },
//     { id: 5, badge: "EV", color: "bg-cyan-600", image: "/cars/nexon.jpg", name: "Tata Nexon EV", price: "₹13,80,000", year: "2023", kms: "11,000 km", fuel: "Electric", transmission: "Automatic" },
//     { id: 6, badge: "LIKE NEW", color: "bg-pink-600", image: "/cars/thar.jpg", name: "Mahindra Thar", price: "₹15,90,000", year: "2023", kms: "9,000 km", fuel: "Diesel", transmission: "Manual" },
//     { id: 7, badge: "FUN DRIVE", color: "bg-slate-700", image: "/cars/verna.jpg", name: "Hyundai Verna", price: "₹10,80,000", year: "2022", kms: "22,000 km", fuel: "Petrol", transmission: "Automatic" },
//     { id: 8, badge: "TOP RATED", color: "bg-orange-600", image: "/cars/brezza.jpg", name: "Maruti Brezza", price: "₹9,45,000", year: "2022", kms: "28,000 km", fuel: "Petrol", transmission: "Manual" },
// ];

const Inventory = () => {
    const navigate = useNavigate();
    const { cars, loading } = useCars();

    if (loading) {
        return (
            <div className="py-20 text-center text-lg font-semibold">
                Loading Cars...
            </div>
        );
    }

    // Filter out discounted cars from normal inventory
    const regularCars = cars.filter(car => !car.isDiscount);

    return (
        <section id="inventory" className="bg-white py-5">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-10 text-center">
                    <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        OUR INVENTORY
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                        Popular Second Hand Cars for Sale
                    </h2>
                    <p className="mt-3 text-gray-500 mx-auto max-w-lg">
                        Handpicked, inspected, and priced right with a 200-point certification.
                    </p>
                </div>

                {/* View All Cars Button */}
                <div className="mb-6 flex justify-end">
                    <button onClick={() => navigate("/all-cars")} className="group flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-black">
                        View All Cars
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>

                {/* Cars Grid / Empty State */}
                {regularCars.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-450 mb-4 text-2xl shadow-xs">
                            🚗
                        </div>
                        <p className="text-gray-900 font-bold text-lg mb-1">No Cars in Inventory</p>
                        <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
                            We are currently updating our collection with fresh certified cars. Check back soon or contact us for immediate requirements!
                        </p>
                        <button 
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition shadow-sm cursor-pointer"
                        >
                            Enquire Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {regularCars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="h-35 w-full object-cover"
                                    />
                                    <span
                                        className={`absolute left-3 top-3 px-2 py-1 text-[10px] font-bold text-white rounded-md ${car.color}`}
                                    >
                                        {car.badge}
                                    </span>
                                    <span
                                        className={`absolute right-3 top-3 px-2.5 py-0.5 text-[9px] font-bold text-white rounded-md uppercase tracking-wider ${
                                            (car.carStatus || "Available").toLowerCase() === "sold" ? "bg-red-600" :
                                            (car.carStatus || "Available").toLowerCase() === "booked" ? "bg-gray-500" : "bg-green-600"
                                        }`}
                                    >
                                        {car.carStatus || "Available"}
                                    </span>
                                </div>

                                {/* Card Details */}
                                <div className="p-3">
                                    <p className="text-[10px] font-bold text-red-650 uppercase tracking-wider mb-0.5">
                                        {car.brand} {car.model && `• ${car.model}`}
                                    </p>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{car.name}</h3>
                                    <p className="font-bold text-gray-900 text-md mb-2">
                                        ₹{Number(car.price).toLocaleString("en-IN")}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1.5"><FaCalendarAlt className="text-gray-400" /> {car.year}</div>
                                        <div className="flex items-center gap-1.5"><FaRoad className="text-gray-400" /> {car.kms}</div>
                                        <div className="flex items-center gap-1.5"><FaGasPump className="text-gray-400" /> {car.fuel}</div>
                                        <div className="flex items-center gap-1.5"><FaCog className="text-gray-400" /> {car.transmission}</div>
                                    </div>

                                    <button onClick={() => {
                                        navigate(`/car/${car.id}`);
                                    }} className="w-full py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-[#2b2b2b] hover:text-white">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Inventory;