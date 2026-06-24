import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
    const [intent, setIntent] = useState("Buy");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !phone || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const newEnquiry = {
            id: Date.now(),
            name,
            phone,
            email,
            message,
            type: intent.toLowerCase().replace(/\s+/g, ""), // "buy", "sell", "testdrive"
            date: new Date().toLocaleString("en-IN")
        };

        try {
            const stored = localStorage.getItem("budget_enquiries");
            const currentEnquiries = stored ? JSON.parse(stored) : [];
            const updatedEnquiries = [newEnquiry, ...currentEnquiries];
            localStorage.setItem("budget_enquiries", JSON.stringify(updatedEnquiries));

            setSuccessMsg("Thank you! Your message has been sent successfully.");
            setName("");
            setPhone("");
            setEmail("");
            setMessage("");

            setTimeout(() => {
                setSuccessMsg("");
            }, 4000);
        } catch (err) {
            console.error("Error saving enquiry:", err);
            alert("Failed to send message. Please try again.");
        }
    };

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
                        {/* Map Height */}
                        <div className="h-48 bg-gray-200 rounded-2xl overflow-hidden shrink-0">
                            <div className="w-full h-full flex items-center justify-center text-gray-500">Map Embed Area</div>
                        </div>
                        
                        {/* Contact Info Cards */}
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

                    {/* Right Column (Form) */}
                    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl h-full flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-xl mb-6">Send Us a Message</h3>
                            
                            {/* Enquiry Type Selector */}
                            <div className="flex bg-white p-1 rounded-xl mb-6 border border-gray-100">
                                {["Buy", "Sell", "Test Drive"].map((opt) => (
                                    <button 
                                        key={opt}
                                        type="button"
                                        onClick={() => setIntent(opt)}
                                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${intent === opt ? "bg-gray-900 text-white shadow-sm" : "hover:bg-gray-100 text-gray-500"}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            {successMsg && (
                                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 text-xs font-semibold flex items-center gap-2">
                                    <FaCheckCircle className="text-green-600" /> {successMsg}
                                </div>
                            )}

                            {/* Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
                                    <input 
                                        type="text" 
                                        placeholder="+91" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="example@mail.com" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
                                    <textarea 
                                        placeholder="Tell us what you are looking for..." 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 h-32 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm resize-none"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3 mt-6 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition cursor-pointer active:scale-[0.99]"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;