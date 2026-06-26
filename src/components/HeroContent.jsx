import React from "react";
import { FaArrowRight, FaTag } from "react-icons/fa";

const HeroContent = () => {
    return (
        <div className="w-full flex flex-col items-start justify-center text-left select-none max-w-xl pr-4">
            {/* Pill Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/80 uppercase">
                    Certified Pre-Owned Cars
                </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                Drive Your Dream <br />
                <span className="text-white/60 font-semibold underline decoration-white/20 underline-offset-8">
                    For Less
                </span>
            </h1>

            {/* Short Description */}
            <p className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed max-w-md drop-shadow-sm">
                Explore our wide range of quality preowned vehicles in Pune. Best prices, trusted deals, and a smooth buying experience guaranteed.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-start">
                <button 
                    onClick={() => {
                        const el = document.getElementById("inventory");
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className="flex items-center gap-3 rounded-2xl bg-white text-black px-7 py-3.5 font-bold hover:bg-zinc-200 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-lg active:scale-95 text-sm pointer-events-auto"
                >
                    Explore Cars
                    <FaArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                    onClick={() => {
                        const el = document.getElementById("deals");
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md px-7 py-3.5 text-white font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-lg active:scale-95 text-sm pointer-events-auto"
                >
                    View Deals
                    <FaTag className="w-3.5 h-3.5 text-white/60" />
                </button>
            </div>
        </div>
    );
};

export default HeroContent;
