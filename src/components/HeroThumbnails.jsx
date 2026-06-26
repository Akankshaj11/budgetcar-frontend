import React from "react";

const HeroThumbnails = ({ cars, activeIndex, onChange }) => {
    return (
        <div className="w-full px-4 z-40 pointer-events-auto select-none">
            {/* Increased max-width of section to max-w-2xl */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-2xl mx-auto py-2">
                {cars.map((car, idx) => {
                    const isActive = idx === activeIndex;
                    
                    return (
                        <button
                            key={car.id}
                            onClick={() => onChange(idx)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-500 cursor-pointer text-left focus:outline-hidden hover:scale-[1.02] active:scale-95 group min-w-0 ${
                                isActive 
                                    ? "bg-black/60 border-white/20 shadow-2xl scale-[1.02]" 
                                    : "bg-black/35 border-white/5 hover:border-white/10 hover:bg-black/45"
                            }`}
                            style={{
                                boxShadow: isActive ? `0 10px 25px -5px ${car.accentColor}20` : "none",
                                borderLeftColor: isActive ? car.accentColor : undefined,
                                borderLeftWidth: isActive ? "3px" : "1px"
                            }}
                        >
                            {/* Car Thumbnail image - enlarged container */}
                            <div className="w-12 h-8 sm:w-16 sm:h-10 flex items-center justify-center overflow-hidden rounded-md bg-white/5 shrink-0">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-300 transform group-hover:scale-105"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col min-w-0">
                                <span className="text-white/60 text-[8px] font-semibold tracking-wider font-mono leading-none">
                                    0{idx + 1}
                                </span>
                                <span 
                                    className="text-[10px] sm:text-xs font-bold transition-colors duration-300 text-white/95 group-hover:text-white truncate mt-0.5"
                                >
                                    {car.name.split(" ").slice(-1)[0]} {/* e.g. "Creta", "Fortuner", "City" */}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroThumbnails;
