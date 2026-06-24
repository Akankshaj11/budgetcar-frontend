

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const galleryItems = [
    { id: 1, type: "photo", src: "/gallery/car1.jpg" },
    { id: 2, type: "video", src: "/gallery/video1.jpg" },
    { id: 3, type: "photo", src: "/gallery/person1.jpg" },
    { id: 4, type: "video", src: "/gallery/video2.jpg" },
    { id: 5, type: "photo", src: "/gallery/car2.jpg" },
    { id: 6, type: "video", src: "/gallery/video3.jpg" },
    { id: 7, type: "photo", src: "/gallery/building.jpg" },
    { id: 8, type: "photo", src: "/gallery/person2.jpg" },
];

const Gallery = () => {
    const [filter, setFilter] = useState("All");
    const categories = ["All", "Car Photos", "Videos", "Happy Customers"];

    return (
        <section className="bg-[#f9f9f9] py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header - Compacted */}
                <div className="text-center mb-16">
                    <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-1">GALLERY</p>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Cars, Customers & Moments</h2>
                    <p className="text-md text-gray-500 mb-6">Photos, walk-around videos, and happy customer deliveries.</p>
                    
                    {/* Filters - Smaller buttons */}
                    <div className="flex justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                    filter === cat ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid - Explicitly 4 columns, 2 rows */}
                <div className="grid grid-cols-4 grid-rows-2 gap-4 h-94">
                    {galleryItems.slice(0, 8).map((item) => (
                        <div 
                            key={item.id} 
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.id === 1 ? "row-span-2" : ""}`}
                        >
                            <img src={item.src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            
                            {item.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-900">
                                        <FaPlay size={12} className="ml-0.5" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;