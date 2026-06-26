import React, { useState, useMemo } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import useCars from "../hooks/useCars";

const Gallery = () => {
    const { cars, loading } = useCars();
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Aggregated gallery items from Firestore real-time cars
    const aggregatedItems = useMemo(() => {
        if (loading || !cars || cars.length === 0) {
            return [];
        }

        const items = [];
        let idCounter = 1;

        cars.forEach((car) => {
            // 1. Add Cover Image
            if (car.image) {
                items.push({
                    id: `cover-${car.id}-${idCounter++}`,
                    type: "photo",
                    src: car.image,
                    category: "Car Photos",
                    carName: car.name
                });
            }

            // 2. Add Walk-around Video
            if (car.video) {
                items.push({
                    id: `video-${car.id}-${idCounter++}`,
                    type: "video",
                    src: car.video,
                    category: "Videos",
                    carName: car.name
                });
            }

            // 3. Add Gallery Images
            if (car.gallery && Array.isArray(car.gallery)) {
                car.gallery.forEach((gUrl) => {
                    items.push({
                        id: `gallery-${car.id}-${idCounter++}`,
                        type: "photo",
                        src: gUrl,
                        category: "Car Photos",
                        carName: car.name
                    });
                });
            }
        });

        return items;
    }, [cars, loading]);

    if (loading) {
        return null;
    }

    return (
        <section className="bg-[#f9f9f9] py-16 text-gray-955 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-red-650 mb-1.5">GALLERY</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Cars, Customers & Moments</h2>
                    <p className="text-sm text-gray-500 max-w-xl mx-auto">Browse through our inventory photos, walk-around videos, and happy delivery celebrations.</p>
                </div>

                {/* Grid - 4 Column Layout, 3 Rows (12 items) */}
                {aggregatedItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 shadow-xs">
                        <p className="text-sm font-semibold text-gray-400">No media uploads found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {aggregatedItems.slice(0, 12).map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => setSelectedMedia(item)}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 aspect-square"
                            >
                                {item.type === "video" ? (
                                    <div className="w-full h-full relative">
                                        <video 
                                            src={item.src} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-300" />
                                        <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center text-gray-900 shadow-lg">
                                            <FaPlay size={8} className="ml-0.5" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <img 
                                            src={item.src} 
                                            alt={item.carName || "Gallery Item"} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
                                    </div>
                                )}
                                
                                {/* Hover details label */}
                                {item.carName && (
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{item.category}</p>
                                        <h4 className="text-xs font-bold text-white uppercase mt-0.5 truncate">{item.carName}</h4>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= LIGHTBOX / MEDIA MODAL ================= */}
            {selectedMedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedMedia(null)} />
                    
                    <button 
                        onClick={() => setSelectedMedia(null)}
                        className="absolute top-6 right-6 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-red-400 transition cursor-pointer"
                    >
                        <FaTimes size={18} />
                    </button>
                    
                    <div className="relative z-51 w-full max-w-4xl max-h-[85vh] flex items-center justify-center animate-zoom-in">
                        {selectedMedia.type === "video" ? (
                            <video 
                                src={selectedMedia.src} 
                                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
                                controls 
                                autoPlay
                            />
                        ) : (
                            <img 
                                src={selectedMedia.src} 
                                alt={selectedMedia.carName || "Gallery Detail"} 
                                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
                            />
                        )}
                        {selectedMedia.carName && (
                            <div className="absolute bottom-[-32px] left-0 right-0 text-center">
                                <p className="text-xs font-bold text-white/80 tracking-wide uppercase">
                                    {selectedMedia.carName}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;