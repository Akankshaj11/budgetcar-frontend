

import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const SellCar = () => {
    return (
        <section className="bg-[#1a1a1a] py-27">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                    <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        HASSLE-FREE PROCESS
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight text-white">
                        Want to Sell Your Car?
                    </h2>
                    <p className="text-gray-400 mb-6 max-w-lg leading-relaxed text-md">
                        Get the best price for your used car in Pune. We handle everything — free doorstep inspection, instant valuation, and same-day payment transfer. No middlemen, no hidden cuts.
                    </p>

                    <div className="space-y-3 mb-8">
                        {[
                            "Free at-home car inspection",
                            "Instant price quote in 30 minutes",
                            "Paperwork handled by our RC experts",
                            "Same-day payment transfer",
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-300">
                                <FaCheckCircle className="text-white shrink-0" size={16} />
                                <span className="text-md">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="bg-white text-[#1a1a1a] px-6 py-2.5 rounded-xl font-bold text-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        Sell My Car <FaArrowRight size={12} />
                    </button>
                </div>

                {/* Image Section */}
                <div className="relative">
                    <img
                        src="/path-to-your-car-image.jpg"
                        alt="Car"
                        className="rounded-3xl w-full h-100 object-cover shadow-2xl"
                    />
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 left-6 bg-white text-[#1a1a1a] p-4 rounded-2xl shadow-xl w-40">
                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-widest">
                            Average payout time
                        </p>
                        <p className="text-xl font-extrabold">24 Hours</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellCar;