// import React from "react";
// import { FaStar } from "react-icons/fa";

// const reviews = [
//     {
//         id: 1,
//         name: "Rajesh Kulkarni",
//         location: "Kothrud, Pune",
//         review: "Found a pristine Honda City at a genuinely fair price. The inspection report was thorough and the paperwork was done in a single afternoon. Best used car experience I have had in Pune.",
//         rating: 5,
//         car: "Honda City 2020",
//         avatar: "/avatars/rajesh.jpg",
//     },
//     {
//         id: 2,
//         name: "Priya Deshmukh",
//         location: "Baner, Pune",
//         review: "Sold my old Swift here. They gave me a better price than any other dealer, picked up the car from home, and transferred the amount the very next day. Highly recommend!",
//         rating: 5,
//         car: "Sold Maruti Swift 2018",
//         avatar: "/avatars/priya.jpg",
//     },
//     {
//         id: 3,
//         name: "Aakash Sharma",
//         location: "Wakad, Pune",
//         review: "The team helped me shortlist three cars within my budget and arranged back-to-back test drives on the same morning. Zero pressure sales. Drove home a Creta that day!",
//         rating: 5,
//         car: "Hyundai Creta 2022",
//         avatar: "/avatars/aakash.jpg",
//     },
//     {
//         id: 4,
//         name: "Sneha Patil",
//         location: "Hadapsar, Pune",
//         review: "Great selection of cars. Staff is knowledgeable and patient. The loan process through their partner bank was smooth. Would definitely return for my next upgrade.",
//         rating: 4, // Represents the 4.5 star look
//         car: "Tata Nexon EV 2022",
//         avatar: "/avatars/sneha.jpg",
//     },
// ];

// const Reviews = () => {
//     return (
//         <section className="bg-white py-16">
//             <div className="max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
//                         WHAT OUR CUSTOMERS SAY
//                     </p>
//                     <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//                         Real Stories, Real Trust
//                     </h2>
//                     <p className="text-gray-500">
//                         Join 1,900+ happy customers who found or sold their car with Budget Car.
//                     </p>
//                 </div>

//                 {/* Reviews Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {reviews.map((item) => (
//                         <div key={item.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
//                             {/* Stars */}
//                             <div className="flex gap-0.5 mb-4">
//                                 {[...Array(5)].map((_, i) => (
//                                     <FaStar key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-200"} size={16} />
//                                 ))}
//                             </div>
                            
//                             {/* Review Text */}
//                             <p className="text-gray-600 text-sm mb-6 leading-relaxed">"{item.review}"</p>
                            
//                             {/* Divider */}
//                             <div className="border-t border-gray-100 my-4" />

//                             {/* User Info */}
//                             <div className="flex items-center gap-3 mb-4">
//                                 <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
//                                 <div>
//                                     <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
//                                     <p className="text-gray-400 text-[11px]">{item.location}</p>
//                                 </div>
//                             </div>

//                             {/* Car Badge */}
//                             <span className="inline-block bg-gray-50 text-gray-600 text-[10px] font-semibold px-3 py-1 rounded-full">
//                                 {item.car}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Reviews;










import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Rajesh Kulkarni",
        location: "Kothrud, Pune",
        review: "Found a pristine Honda City at a genuinely fair price. The inspection report was thorough and the paperwork was done in a single afternoon. Best used car experience I have had in Pune.",
        rating: 5,
        car: "Honda City 2020",
        avatar: "/avatars/rajesh.jpg",
    },
    {
        id: 2,
        name: "Priya Deshmukh",
        location: "Baner, Pune",
        review: "Sold my old Swift here. They gave me a better price than any other dealer, picked up the car from home, and transferred the amount the very next day. Highly recommend!",
        rating: 5,
        car: "Sold Maruti Swift 2018",
        avatar: "/avatars/priya.jpg",
    },
    {
        id: 3,
        name: "Aakash Sharma",
        location: "Wakad, Pune",
        review: "The team helped me shortlist three cars within my budget and arranged back-to-back test drives on the same morning. Zero pressure sales. Drove home a Creta that day!",
        rating: 5,
        car: "Hyundai Creta 2022",
        avatar: "/avatars/aakash.jpg",
    },
    {
        id: 4,
        name: "Sneha Patil",
        location: "Hadapsar, Pune",
        review: "Great selection of cars. Staff is knowledgeable and patient. The loan process through their partner bank was smooth. Would definitely return for my next upgrade.",
        rating: 4,
        car: "Tata Nexon EV 2022",
        avatar: "/avatars/sneha.jpg",
    },
];

const Reviews = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">
                    <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        WHAT OUR CUSTOMERS SAY
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Real Stories, Real Trust
                    </h2>
                    <p className="text-gray-500">
                        Join 1,900+ happy customers who found or sold their car with Budget Car.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((item) => (
                        // Set flex-col h-full so the card stretches to fill the grid row
                        <div key={item.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col h-full">
                            
                            {/* Content wrapper - flex-grow ensures this pushes the footer to the bottom */}
                            <div className="grow">
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-200"} size={16} />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">"{item.review}"</p>
                            </div>

                            {/* Footer area - always stays aligned at the bottom */}
                            <div className="mt-auto">
                                <div className="border-t border-gray-100 my-4" />
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-md">{item.name}</h4>
                                        <p className="text-gray-400 text-[14px]">{item.location}</p>
                                    </div>
                                </div>
                                <span className="inline-block bg-gray-50 text-gray-600 text-[13px] font-semibold px-3 py-1 rounded-full">
                                    {item.car}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;