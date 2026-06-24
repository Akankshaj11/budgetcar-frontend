import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] text-gray-400 pt-16 pb-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-white">🚗</span>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg">Budget Car</h2>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">TRUSTED CARS</p>
                        </div>
                    </div>
                    <p className="text-sm mb-8 leading-relaxed">
                        Pune's most trusted second-hand car dealership since 2012. Budget Car makes buying and selling easy.
                    </p>
                    <div className="flex gap-3">
                        {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-6">QUICK LINKS</h3>
                    <ul className="space-y-4 text-md">
                        {["Home", "Browse Inventory", "Sell Your Car", "Book Test Drive", "About Us", "Contact"].map(link => (
                            <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Popular Brands */}
                <div>
                    <h3 className="text-white font-bold mb-6">POPULAR BRANDS</h3>
                    <ul className="space-y-4 text-md">
                        {["Maruti Suzuki", "Hyundai", "Honda", "Tata Motors", "Toyota", "Mahindra", "Kia"].map(brand => (
                            <li key={brand}><a href="#" className="hover:text-white transition-colors">{brand}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-6">CONTACT</h3>
                    <ul className="space-y-4 text-md">
                        <li className="flex gap-3"><FaMapMarkerAlt className="mt-1 shrink-0" /> Sr.No 30, Pune Nagar Rd, opp. Canara Bank, Viman Nagar, Pune 411014</li>
                        <li className="flex gap-3"><FaPhone className="mt-1 shrink-0" /> +91 99228 01959</li>
                        <li className="flex gap-3"><FaWhatsapp className="mt-1 shrink-0" /> WhatsApp: wa.me</li>
                        <li className="flex gap-3"><FaEnvelope className="mt-1 shrink-0" /> budgetcar.pune@gmail.com</li>
                        <li className="flex gap-3"><FaClock className="mt-1 shrink-0" /> Mon–Sat: 10 AM – 8 PM | Sun: 10 AM – 6 PM</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
                <p>&copy; 2024 Budget Car. All rights reserved. | A Trusted Name in Pune.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Use</a>
                    <a href="#" className="hover:text-white">Sitemap</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;