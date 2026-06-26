import React, { useState, useEffect, useRef, useCallback } from "react";
import { featuredCars } from "./FeaturedCars";
import HeroContent from "./HeroContent";
import HeroViewer from "./HeroViewer";
import HeroThumbnails from "./HeroThumbnails";

const HeroCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const resumeTimeoutRef = useRef(null);
    const activeCar = featuredCars[activeIndex];

    // Move to next slide
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % featuredCars.length);
    }, []);

    // Select specific slide
    const handleSelect = (index) => {
        setActiveIndex(index);
        triggerInteractionPause();
    };

    // Pause slideshow and schedule resume
    const triggerInteractionPause = useCallback(() => {
        setIsPaused(true);

        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }

        resumeTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 5000); // Resume slideshow after 5 seconds of inactivity
    }, []);

    // Setup slideshow interval timer (cycles every 6 seconds)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            handleNext();
        }, 6000);

        return () => clearInterval(interval);
    }, [isPaused, handleNext]);

    // Clean up timeouts on unmount
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between pt-24 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-30 overflow-y-auto lg:overflow-hidden no-scrollbar">
            
            {/* Main Split Grid Section - items-start aligns the tops of both columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-auto w-full">
                
                {/* Left Side: Generic Text Content */}
                <div className="lg:col-span-5 flex flex-col justify-start">
                    <HeroContent />
                </div>

                {/* Right Side: Showcase car - height adjusted to align bottom cards with left buttons */}
                <div className="lg:col-span-7 flex flex-col justify-between relative w-full mt-8 lg:mt-0 lg:h-75 shrink-0">
                    
                    {/* Car Viewer Container */}
                    <div className="w-full h-50 lg:h-90 relative flex items-center justify-center">
                        <HeroViewer car={activeCar} />
                    </div>

                    {/* Thumbnail Cards Selectors */}
                    <div className="mt-8 w-full z-40 pointer-events-auto">
                        <HeroThumbnails
                            cars={featuredCars}
                            activeIndex={activeIndex}
                            onChange={handleSelect}
                        />
                    </div>

                   

                </div>
            </div>

        </div>
    );
};

export default HeroCarousel;
