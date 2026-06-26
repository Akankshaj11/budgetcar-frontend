import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroNavigation = ({ onPrev, onNext, accentColor }) => {
    return (
        <>
            {/* Left Navigation Arrow */}
            <button
                onClick={onPrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 border border-white/10 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/50 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-lg group select-none pointer-events-auto"
                aria-label="Previous Slide"
            >
                <FaChevronLeft 
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" 
                    style={{ filter: `drop-shadow(0 0 4px ${accentColor}40)` }}
                />
            </button>

            {/* Right Navigation Arrow */}
            <button
                onClick={onNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 border border-white/10 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/50 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-lg group select-none pointer-events-auto"
                aria-label="Next Slide"
            >
                <FaChevronRight 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" 
                    style={{ filter: `drop-shadow(0 0 4px ${accentColor}40)` }}
                />
            </button>
        </>
    );
};

export default HeroNavigation;
