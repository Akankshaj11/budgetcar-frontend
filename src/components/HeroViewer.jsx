import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroViewer = ({ car }) => {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl select-none pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.img
                    key={car.id}
                    src={car.image}
                    alt={car.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover filter brightness-95 contrast-105 pointer-events-auto"
                />
            </AnimatePresence>
        </div>
    );
};

export default HeroViewer;
