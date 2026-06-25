

import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaCalendarAlt,
    FaGasPump,
    FaRoad,
    FaCog,
    FaTag,
} from "react-icons/fa";
import useCars from "../hooks/useCars";

const DiscountDeals = () => {
    const navigate = useNavigate();
    const { cars, loading } = useCars();
    if (loading) {
    return (
        <div className="py-20 text-center text-lg font-semibold">
            Loading Deals...
        </div>
    );
}
    const deals = cars.filter(car => car.isDiscount);

    if (deals.length === 0) {
        return null;
    }
    return (
        <section className="bg-white py-15">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-5">
                    <p className="text-center text-[13px] font-bold uppercase tracking-widest text-red-600 mb-2">
                        🔥 LIMITED TIME DEALS
                    </p>

                    {/* Centered Heading with Absolute Link */}
                    <div className="relative flex items-center justify-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center">
                            Discounts on Cars
                        </h2>

                    </div>

                    <p className="mt-3 text-center text-gray-500 mx-auto max-w-lg">
                        Grab these deals before they are gone — discounted certified cars.
                    </p>
                </div>

                {/* View All Button */}

                <div className="mb-8 flex justify-end">

                    <button 
                        onClick={() => navigate("/all-deals")}
                        className="group flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-black cursor-pointer"
                    >

                        View All Deals

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>

                    </button>

                </div>

                {/* Grid */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">









                    {deals.map((deal) => (
                        <div
                            key={deal.id}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="relative">
                                <img src={deal.image} alt={deal.name} className="h-35 w-full object-cover" />
                                <span className={`absolute left-3 top-3 px-2 py-1 text-[10px] font-bold text-white rounded-md ${deal.color}`}>
                                    {deal.badge}
                                </span>
                            </div>

                            <div className="p-3">
                                <p className="text-[10px] font-bold text-red-650 uppercase tracking-wider mb-0.5">
                                    {deal.brand} {deal.model && `• ${deal.model}`}
                                </p>
                                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{deal.name}</h3>

                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="font-bold text-gray-900 text-md">₹{Number(deal.price).toLocaleString("en-IN")}</p>
                                    <p className="text-gray-400 text-xs line-through">₹{Number(deal.original || deal.originalPrice).toLocaleString("en-IN")}</p>
                                </div>
                                <p className="text-green-600 text-[11px] font-semibold mb-3">You save ₹{Number(deal.savings || deal.discount).toLocaleString("en-IN")}</p>

                                <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-3">
                                    <div className="flex items-center gap-1.5"><FaCalendarAlt className="text-gray-400" /> {deal.year}</div>
                                    <div className="flex items-center gap-1.5"><FaRoad className="text-gray-400" /> {deal.kms}</div>
                                    <div className="flex items-center gap-1.5"><FaGasPump className="text-gray-400" /> {deal.fuel}</div>
                                    <div className="flex items-center gap-1.5"><FaCog className="text-gray-400" /> {deal.transmission}</div>
                                </div>

                                <button 
                                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                                    className="w-full py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <FaTag size={12} /> Grab This Deal
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DiscountDeals;