




import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Dattatray Yadav",
        location: "Pune",
        review: "I had purchased a wagonr car from a BudgetCarHub. My family and I are very happy. We got a nice car, Amit sir is really trusted person\nWe are very thankful to Amit Sir and Ajay sir, he gave us a nice car, thanks all Bujet car team",
        rating: 5,
        car: "Maruti Suzuki WagonR",
    },
    {
        id: 2,
        name: "Pratiksha dodake",
        location: "Pune",
        review: "My experiance was great I loved the car very much and I am happy with the service provided by Pratik sir but only the issue was with pricing was a bit high of 4.5 lacks for 2013 model .",
        rating: 4,
        car: "Purchased Car",
    },
    {
        id: 3,
        name: "Pragati Borade",
        location: "Pune",
        review: "recently purchased my first car and I'm thrilled with the experience. I got an amazing deal and excellent service from BudgetCarHub. Their team was professional, helpful, and made the entire process smooth and hassle-free.",
        rating: 5,
        car: "Purchased Car",
    },
    {
        id: 4,
        name: "Asif Jakhate",
        location: "Pune",
        review: "BudgetCarHub has good amount of cars available. The staff is very humble and always ready to help specially Pratik😊. After sales service is also good, My cars suspension was not working properly so they did changed it to new. Thanks to Pratik, I hope we are friends now 😜.",
        rating: 5,
        car: "Purchased Car",
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
                        Join 1,900+ happy customers who found or sold their car with BudgetCarHub.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-100 p-4.5 rounded-xl shadow-xs flex flex-col h-full">
                            
                            {/* Content wrapper */}
                            <div className="grow">
                                <div className="flex gap-0.5 mb-2.5">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-200"} size={14} />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed whitespace-pre-line">"{item.review}"</p>
                            </div>

                            {/* Footer area */}
                            <div className="mt-auto">
                                <div className="border-t border-gray-100 my-3" />
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                                        {item.name.trim().charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">{item.name}</h4>
                                        <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;