


import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import About from "../components/About";
import BrowseBrands from "../components/BrowseBrands";
import Inventory from "../components/Inventory";
import DiscountDeals from "../components/DiscountDeals";
import SellCar from "../components/SellCar";
import Reviews from "../components/Reviews";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import { FaArrowRight, FaSearch } from "react-icons/fa";

// Array of brand logos for the strip
const brandLogos = [
    "/logos/tata.png", "/logos/toyota.png", "/logos/mahindra.png", 
    "/logos/kia.png", "/logos/hyundai.png", "/logos/skoda.png", 
    "/logos/maruti.png", "/logos/honda.png"
];

const Home = () => {
    return (
        <main className="min-h-screen bg-[#111111]">
            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
                <Navbar />

                {/* Background Image & Effects */}
                <div className="absolute inset-0">
                    <img
                        src="/hero-car.png"
                        alt="Hero"
                        className="absolute inset-0 w-full h-full object-cover scale-105 brightness-75 contrast-110"
                    />
                    {/* Grainy Noise Overlay */}
                    <div className="hero-noise absolute inset-0 z-10"></div>
                    {/* Dark Gradients */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 z-20"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-30 flex h-full flex-col items-center justify-center text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                        Buy & Sell Preowned Cars
                    </h1>
                    <p className="mt-5 text-gray-300 text-xl">
                        Certified pre-owned cars at fair prices in Pune.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button className="flex items-center gap-3 rounded-2xl bg-[#232323] px-8 py-4 text-white font-semibold hover:bg-[#2d2d2d] transition">
                            <FaSearch />
                            Browse Cars
                        </button>
                        <button className="flex items-center gap-3 rounded-2xl border border-gray-600 bg-white/10 backdrop-blur-md px-8 py-4 text-white font-semibold hover:bg-white/20 transition">
                            <FaArrowRight />
                            Sell Your Car
                        </button>
                    </div>
                </div>

                {/* Continuously Running Logo Strip */}
                <div className="absolute bottom-0 left-0 w-full z-40">
                    <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden">
                        <div className="flex animate-marquee whitespace-nowrap">
                            <div className="flex items-center gap-16 px-8 shrink-0">
                                {brandLogos.map((logo, index) => (
                                    <img key={`set1-${index}`} src={logo} alt="Brand" className="h-6 w-auto opacity-70" />
                                ))}
                            </div>
                            <div className="flex items-center gap-16 px-8 shrink-0">
                                {brandLogos.map((logo, index) => (
                                    <img key={`set2-${index}`} src={logo} alt="Brand" className="h-6 w-auto opacity-70" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Sections */}
            <About />
            <Search />
            <BrowseBrands />
            <Inventory />
            <DiscountDeals />
            <SellCar />
            <Reviews />
            <Gallery />
            <Contact />
            <Footer />
        </main>
    );
};

export default Home;