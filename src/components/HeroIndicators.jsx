import React from "react";

const HeroIndicators = ({ cars, activeIndex, onChange, accentColor }) => {
    return (
        <div className="flex gap-2.5 items-center justify-center z-40 select-none pointer-events-auto">
            {cars.map((car, idx) => {
                const isActive = idx === activeIndex;
                return (
                    <button
                        key={car.id}
                        onClick={() => onChange(idx)}
                        className="group relative h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer"
                        style={{
                            width: isActive ? "32px" : "10px",
                            backgroundColor: isActive ? accentColor : "rgba(255, 255, 255, 0.25)"
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                    >
                        {/* Hover ring effect */}
                        <span 
                            className="absolute -inset-1 rounded-full border border-white/0 group-hover:border-white/10 transition-colors duration-300"
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default HeroIndicators;
