// // import React, { useState } from "react";
// // import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";

// // const Contact = () => {
// //     const [intent, setIntent] = useState("Buy");

// //     return (
// //         <section className="bg-white py-16">
// //             <div className="max-w-7xl mx-auto px-6">
// //                 {/* Header */}
// //                 <div className="text-center mb-12">
// //                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">GET IN TOUCH</p>
// //                     <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
// //                     <p className="text-gray-500">We are open 7 days a week. Come visit or reach us online.</p>
// //                 </div>

// //                 <div className="grid lg:grid-cols-2 gap-8">
// //                     {/* Left Column: Map & Info */}
// //                     <div className="space-y-6">
// //                         <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden">
// //                             {/* Placeholder for embedded Map */}
// //                             <div className="w-full h-full flex items-center justify-center text-gray-500">Map Embed Area</div>
// //                         </div>
                        
// //                         <div className="grid md:grid-cols-2 gap-4">
// //                             <div className="bg-gray-50 p-5 rounded-2xl">
// //                                 <FaMapMarkerAlt className="text-gray-400 mb-3" />
// //                                 <h4 className="font-bold text-xs uppercase mb-1">Address</h4>
// //                                 <p className="text-sm text-gray-600 mb-2">Sr.No 30, Pune Nagar Rd, near Ramwadi Bus Stop, opp. Canara Bank, Sakore Nagar, Viman Nagar, Pune 411014</p>
// //                                 <a href="#" className="text-sm font-semibold hover:underline">Get Directions</a>
// //                             </div>
// //                             <div className="bg-gray-50 p-5 rounded-2xl">
// //                                 <FaPhone className="text-gray-400 mb-3" />
// //                                 <h4 className="font-bold text-xs uppercase mb-1">Phone</h4>
// //                                 <p className="text-sm text-gray-600 mb-2">+91 99228 01959</p>
// //                                 <a href="tel:+919922801959" className="text-sm font-semibold hover:underline">Call Now</a>
// //                             </div>
// //                             <div className="bg-gray-50 p-5 rounded-2xl">
// //                                 <FaWhatsapp className="text-gray-400 mb-3" />
// //                                 <h4 className="font-bold text-xs uppercase mb-1">WhatsApp</h4>
// //                                 <p className="text-sm text-gray-600 mb-2">Chat on WhatsApp</p>
// //                                 <a href="#" className="text-sm font-semibold hover:underline">Open WhatsApp</a>
// //                             </div>
// //                             <div className="bg-gray-50 p-5 rounded-2xl">
// //                                 <FaEnvelope className="text-gray-400 mb-3" />
// //                                 <h4 className="font-bold text-xs uppercase mb-1">Email</h4>
// //                                 <p className="text-sm text-gray-600 mb-2">budgetcar.pune@gmail.com</p>
// //                                 <a href="mailto:budgetcar.pune@gmail.com" className="text-sm font-semibold hover:underline">Send Mail</a>
// //                             </div>
// //                         </div>
// //                         <div className="bg-gray-50 p-5 rounded-2xl flex items-start gap-4">
// //                             <FaClock className="text-gray-400 mt-1" />
// //                             <div>
// //                                 <h4 className="font-bold text-xs uppercase mb-1">Working Hours</h4>
// //                                 <p className="text-sm text-gray-600">Mon – Sat: 10:00 AM – 8:00 PM</p>
// //                                 <p className="text-sm text-gray-600">Sunday: 10:00 AM – 6:00 PM</p>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Right Column: Form */}
// //                     <div className="bg-gray-50 p-8 rounded-2xl h-fit">
// //                         <h3 className="font-bold text-xl mb-6">Send Us a Message</h3>
                        
// //                         {/* Toggle Intent */}
// //                         <div className="flex bg-white p-1 rounded-xl mb-6 border border-gray-100">
// //                             {["Buy", "Sell", "Test Drive"].map((opt) => (
// //                                 <button 
// //                                     key={opt}
// //                                     onClick={() => setIntent(opt)}
// //                                     className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${intent === opt ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
// //                                 >
// //                                     {opt}
// //                                 </button>
// //                             ))}
// //                         </div>

// //                         {/* Form Fields */}
// //                         <div className="space-y-4">
// //                             <div>
// //                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
// //                                 <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Your Name" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
// //                                 <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="+91" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
// //                                 <input type="email" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="example@mail.com" />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
// //                                 <textarea className="w-full p-3 rounded-lg border border-gray-200 h-32 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Tell us what you are looking for..."></textarea>
// //                             </div>
// //                             <button className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
// //                                 Send Message
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default Contact;














// import React, { useState } from "react";
// import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";

// const Contact = () => {
//     const [intent, setIntent] = useState("Buy");

//     return (
//         <section className="bg-white py-16">
//             <div className="max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">GET IN TOUCH</p>
//                     <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
//                     <p className="text-gray-500">We are open 7 days a week. Come visit or reach us online.</p>
//                 </div>

//                 {/* Main Grid: items-stretch ensures equal column heights */}
//                 <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    
//                     {/* Left Column */}
//                     <div className="space-y-6 h-full flex flex-col">
//                         <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden shrink-0">
//                             <div className="w-full h-full flex items-center justify-center text-gray-500">Map Embed Area</div>
//                         </div>
                        
//                         <div className="grid md:grid-cols-2 gap-4 grow">
//                             <div className="bg-gray-50 p-5 rounded-2xl">
//                                 <FaMapMarkerAlt className="text-gray-400 mb-3" />
//                                 <h4 className="font-bold text-xs uppercase mb-1">Address</h4>
//                                 <p className="text-sm text-gray-600 mb-2">Sr.No 30, Pune Nagar Rd, near Ramwadi Bus Stop, opp. Canara Bank, Sakore Nagar, Viman Nagar, Pune 411014</p>
//                                 <a href="#" className="text-sm font-semibold hover:underline">Get Directions</a>
//                             </div>
//                             <div className="bg-gray-50 p-5 rounded-2xl">
//                                 <FaPhone className="text-gray-400 mb-3" />
//                                 <h4 className="font-bold text-xs uppercase mb-1">Phone</h4>
//                                 <p className="text-sm text-gray-600 mb-2">+91 99228 01959</p>
//                                 <a href="tel:+919922801959" className="text-sm font-semibold hover:underline">Call Now</a>
//                             </div>
//                             <div className="bg-gray-50 p-5 rounded-2xl">
//                                 <FaWhatsapp className="text-gray-400 mb-3" />
//                                 <h4 className="font-bold text-xs uppercase mb-1">WhatsApp</h4>
//                                 <p className="text-sm text-gray-600 mb-2">Chat on WhatsApp</p>
//                                 <a href="#" className="text-sm font-semibold hover:underline">Open WhatsApp</a>
//                             </div>
//                             <div className="bg-gray-50 p-5 rounded-2xl">
//                                 <FaEnvelope className="text-gray-400 mb-3" />
//                                 <h4 className="font-bold text-xs uppercase mb-1">Email</h4>
//                                 <p className="text-sm text-gray-600 mb-2">budgetcar.pune@gmail.com</p>
//                                 <a href="mailto:budgetcar.pune@gmail.com" className="text-sm font-semibold hover:underline">Send Mail</a>
//                             </div>
//                         </div>
                        
//                         <div className="bg-gray-50 p-5 rounded-2xl flex items-start gap-4 shrink-0">
//                             <FaClock className="text-gray-400 mt-1" />
//                             <div>
//                                 <h4 className="font-bold text-xs uppercase mb-1">Working Hours</h4>
//                                 <p className="text-sm text-gray-600">Mon – Sat: 10:00 AM – 8:00 PM</p>
//                                 <p className="text-sm text-gray-600">Sunday: 10:00 AM – 6:00 PM</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column */}
//                     <div className="bg-gray-50 p-8 rounded-2xl h-full flex flex-col">
//                         <h3 className="font-bold text-xl mb-6">Send Us a Message</h3>
                        
//                         <div className="flex bg-white p-1 rounded-xl mb-6 border border-gray-100">
//                             {["Buy", "Sell", "Test Drive"].map((opt) => (
//                                 <button 
//                                     key={opt}
//                                     onClick={() => setIntent(opt)}
//                                     className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${intent === opt ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
//                                 >
//                                     {opt}
//                                 </button>
//                             ))}
//                         </div>

//                         <div className="space-y-4 grow">
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
//                                 <input type="text" className="w-full p-3 rounded-lg border border-gray-200" placeholder="Your Name" />
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
//                                 <input type="text" className="w-full p-3 rounded-lg border border-gray-200" placeholder="+91" />
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
//                                 <input type="email" className="w-full p-3 rounded-lg border border-gray-200" placeholder="example@mail.com" />
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
//                                 <textarea className="w-full p-3 rounded-lg border border-gray-200 h-32" placeholder="Tell us what you are looking for..."></textarea>
//                             </div>
//                         </div>

//                         <button className="w-full py-3 mt-6 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
//                             Send Message
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Contact;
















import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
    const [intent, setIntent] = useState("Buy");

    return (
        <section id="contact" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-2">GET IN TOUCH</p>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
                    <p className="text-gray-500">We are open 7 days a week. Come visit or reach us online.</p>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Column */}
                    <div className="space-y-6 h-full flex flex-col">
                        {/* Reduced Map Height */}
                        <div className="h-48 bg-gray-200 rounded-2xl overflow-hidden shrink-0">
                            <div className="w-full h-full flex items-center justify-center text-gray-500">Map Embed Area</div>
                        </div>
                        
                        {/* Contact Info Cards - Side-by-Side Icon Layout */}
                        <div className="grid md:grid-cols-2 gap-4 grow">
                            <div className="bg-gray-50 p-5 rounded-2xl flex gap-3">
                                <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-xs uppercase mb-1">Address</h4>
                                    <p className="text-sm text-gray-600 mb-2">Sr.No 30, Pune Nagar Rd, near Ramwadi Bus Stop, opp. Canara Bank, Sakore Nagar, Viman Nagar, Pune 411014</p>
                                    <a href="#" className="text-sm font-semibold hover:underline">Get Directions</a>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl flex gap-3">
                                <FaPhone className="text-gray-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-xs uppercase mb-1">Phone</h4>
                                    <p className="text-sm text-gray-600 mb-2">+91 99228 01959</p>
                                    <a href="tel:+919922801959" className="text-sm font-semibold hover:underline">Call Now</a>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl flex gap-3">
                                <FaWhatsapp className="text-gray-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-xs uppercase mb-1">WhatsApp</h4>
                                    <p className="text-sm text-gray-600 mb-2">Chat on WhatsApp</p>
                                    <a href="https://wa.me/919922801959" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">Open WhatsApp</a>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl flex gap-3">
                                <FaEnvelope className="text-gray-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-xs uppercase mb-1">Email</h4>
                                    <p className="text-sm text-gray-600 mb-2">budgetcar.pune@gmail.com</p>
                                    <a href="mailto:budgetcar.pune@gmail.com" className="text-sm font-semibold hover:underline">Send Mail</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-5 rounded-2xl flex gap-4 shrink-0">
                            <FaClock className="text-gray-400 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-xs uppercase mb-1">Working Hours</h4>
                                <p className="text-sm text-gray-600">Mon – Sat: 10:00 AM – 8:00 PM</p>
                                <p className="text-sm text-gray-600">Sunday: 10:00 AM – 6:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-gray-50 p-8 rounded-2xl h-full flex flex-col">
                        <h3 className="font-bold text-xl mb-6">Send Us a Message</h3>
                        
                        <div className="flex bg-white p-1 rounded-xl mb-6 border border-gray-100">
                            {["Buy", "Sell", "Test Drive"].map((opt) => (
                                <button 
                                    key={opt}
                                    onClick={() => setIntent(opt)}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${intent === opt ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 grow">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
                                <input type="text" className="w-full p-3 rounded-lg border border-gray-200" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
                                <input type="text" className="w-full p-3 rounded-lg border border-gray-200" placeholder="+91" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
                                <input type="email" className="w-full p-3 rounded-lg border border-gray-200" placeholder="example@mail.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
                                <textarea className="w-full p-3 rounded-lg border border-gray-200 h-32" placeholder="Tell us what you are looking for..."></textarea>
                            </div>
                        </div>

                        <button className="w-full py-3 mt-6 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;