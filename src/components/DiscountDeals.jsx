

import React from "react";
import {
    FaCalendarAlt,
    FaGasPump,
    FaRoad,
    FaCog,
    FaTag,
} from "react-icons/fa";

const deals = [
    { id: 1, badge: "17% OFF", color: "bg-red-500", image: "/cars/baleno.jpg", name: "Maruti Suzuki Baleno", price: "₹5,40,000", original: "₹6,50,000", savings: "₹1,10,000", year: "2020", kms: "41,000 km", fuel: "Petrol", transmission: "Manual" },
    { id: 2, badge: "16% OFF", color: "bg-red-500", image: "/cars/ecosport.jpg", name: "Ford EcoSport Titanium", price: "₹7,75,000", original: "₹9,20,000", savings: "₹1,45,000", year: "2019", kms: "62,000 km", fuel: "Petrol", transmission: "Manual" },
    { id: 3, badge: "17% OFF", color: "bg-red-500", image: "/cars/i20.jpg", name: "Hyundai i20 Sportz", price: "₹6,50,000", original: "₹7,80,000", savings: "₹1,30,000", year: "2021", kms: "28,000 km", fuel: "Petrol", transmission: "Manual" },
    { id: 4, badge: "21% OFF", color: "bg-red-500", image: "/cars/tiago.jpg", name: "Tata Tiago XT", price: "₹4,10,000", original: "₹5,20,000", savings: "₹1,10,000", year: "2020", kms: "35,000 km", fuel: "Petrol", transmission: "Manual" },
];

const DiscountDeals = () => {
    return (
        <section className="bg-white py-16">
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

                    <button className="group flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-black">

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
                                <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{deal.name}</h3>

                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="font-bold text-gray-900 text-md">{deal.price}</p>
                                    <p className="text-gray-400 text-xs line-through">{deal.original}</p>
                                </div>
                                <p className="text-green-600 text-[11px] font-semibold mb-3">You save {deal.savings}</p>

                                <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-3">
                                    <div className="flex items-center gap-1.5"><FaCalendarAlt className="text-gray-400" /> {deal.year}</div>
                                    <div className="flex items-center gap-1.5"><FaRoad className="text-gray-400" /> {deal.kms}</div>
                                    <div className="flex items-center gap-1.5"><FaGasPump className="text-gray-400" /> {deal.fuel}</div>
                                    <div className="flex items-center gap-1.5"><FaCog className="text-gray-400" /> {deal.transmission}</div>
                                </div>

                                <button className="w-full py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-2">
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