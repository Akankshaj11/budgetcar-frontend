import React from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    const location = useLocation();

    // Do not show the WhatsApp button on admin routes
    if (location.pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <a
            href="https://wa.me/919922801959"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-black text-white border border-white/15 shadow-2xl transition-all duration-300 hover:bg-white hover:text-black hover:border-black hover:scale-110 active:scale-95 hover:shadow-[0_6px_24px_rgba(0,0,0,0.15)] group"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[12deg]" />
            
            {/* Subtle beacon ripple effect */}
            <span className="absolute inset-0 rounded-full border-2 border-white/40 group-hover:border-black/20 opacity-0 group-hover:animate-ping"></span>
        </a>
    );
};

export default WhatsAppButton;
