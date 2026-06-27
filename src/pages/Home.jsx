


import React, { useMemo } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import { getHomeJsonLd, getSiteUrl, PAGE_SEO } from "../config/seo";
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
import HeroCarousel from "../components/HeroCarousel";

// Array of brand logos for the strip
const brandLogos = [
    "/logos/tata.svg", "/logos/toyota.svg", "/logos/mahindra.svg", 
    "/logos/kia.svg", "/logos/hyundai.svg", "/logos/skoda.svg", 
    "/logos/suzuki.svg", "/logos/honda.svg", "/logos/ford.svg",
    "/logos/mg.svg", "/logos/renault.svg", "/logos/volkswagen.svg",
    "/logos/audi.svg", "/logos/mercedes.svg", "/logos/bmw.svg",
    "/logos/jaguar.svg"
];

const Home = () => {
    const jsonLd = useMemo(() => getHomeJsonLd(getSiteUrl()), []);

    return (
        <>
        <SEO
            title={PAGE_SEO.home.title}
            description={PAGE_SEO.home.description}
            keywords={PAGE_SEO.home.keywords}
            jsonLd={jsonLd}
        />
        <main className="min-h-screen bg-[#111111]">
            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden flex flex-col">
                <Navbar />

                {/* Premium Interactive Hero Showcase */}
                <HeroCarousel />

                {/* Continuously Running Logo Strip */}
                <div className="absolute bottom-0 left-0 w-full z-40">
                    <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden">
                        <div className="flex animate-marquee whitespace-nowrap">
                            <div className="flex items-center gap-16 px-8 shrink-0">
                                {brandLogos.map((logo, index) => (
                                    <img key={`set1-${index}`} src={logo} alt="Brand" className="h-6 w-auto max-w-16 object-contain opacity-60 grayscale invert" />
                                ))}
                            </div>
                            <div className="flex items-center gap-16 px-8 shrink-0">
                                {brandLogos.map((logo, index) => (
                                    <img key={`set2-${index}`} src={logo} alt="Brand" className="h-6 w-auto max-w-16 object-contain opacity-60 grayscale invert" />
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
        </>
    );
};

export default Home;