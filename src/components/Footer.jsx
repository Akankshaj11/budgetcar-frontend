import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLinkClick = (link) => {
        if (link === "Home") {
            if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                navigate("/");
            }
        } else if (link === "Browse Inventory") {
            navigate("/all-cars");
        } else {
            const sectionMap = {
                "Sell Your Car": "sell",
                "Book Test Drive": "contact",
                "About Us": "about",
                "Contact": "contact"
            };
            const secId = sectionMap[link];
            if (location.pathname === "/") {
                const element = document.getElementById(secId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                navigate("/");
                setTimeout(() => {
                    const element = document.getElementById(secId);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 150);
            }
        }
    };

    const handleBrandClick = (brand) => {
        const brandMap = {
            "Suzuki": "Suzuki",
            "Hyundai": "Hyundai",
            "Honda": "Honda",
            "Tata Motors": "Tata",
            "Toyota": "Toyota",
            "Mahindra": "Mahindra",
            "Kia": "Kia"
        };
        const dbValue = brandMap[brand] || brand;
        navigate(`/all-cars?brand=${encodeURIComponent(dbValue)}`);
    };

    return (
        <footer className="bg-[#0a0a0a] text-gray-400 pt-16 pb-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <img 
                            src="/budgetcarlogo.png" 
                            alt="BudgetCarHub Logo" 
                            className="h-[100px] w-auto object-contain brightness-0 invert" 
                        />
                    </div>
                    <p className="text-sm mb-8 leading-relaxed">
                        Pune's most trusted second-hand car dealership since 2012. BudgetCarHub makes buying and selling easy.
                    </p>
                    <div className="flex gap-3">
                        <a 
                            href="https://www.instagram.com/budgetcarhub?igsh=MW96bmNjaHU0M2Z5bA==" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={14} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-6">QUICK LINKS</h3>
                    <ul className="space-y-4 text-md">
                        {["Home", "Browse Inventory", "Sell Your Car", "Book Test Drive", "About Us", "Contact"].map(link => (
                            <li key={link}>
                                <button 
                                    onClick={() => handleLinkClick(link)} 
                                    className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                                >
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Popular Brands */}
                <div>
                    <h3 className="text-white font-bold mb-6">POPULAR BRANDS</h3>
                    <ul className="space-y-4 text-md">
                        {["Suzuki", "Hyundai", "Honda", "Tata Motors", "Toyota", "Mahindra", "Kia", "Audi", "Mercedes", "BMW", "Jaguar"].map(brand => (
                            <li key={brand}>
                                <button 
                                    onClick={() => handleBrandClick(brand)} 
                                    className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                                >
                                    {brand}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-6">CONTACT</h3>
                    <ul className="space-y-4 text-md">
                        <li className="flex gap-3"><FaMapMarkerAlt className="mt-1 shrink-0" /> Sr.No 30, Pune Nagar Rd, opp. Canara Bank, Viman Nagar, Pune 411014</li>
                        <li className="flex gap-3"><FaPhone className="mt-1 shrink-0" /> +91 99228 01959</li>
                        {/* <li className="flex gap-3"><FaWhatsapp className="mt-1 shrink-0" /> WhatsApp: <a href="https://wa.me/919922801959" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">wa.me</a></li> */}
                        <li className="flex gap-3"><FaEnvelope className="mt-1 shrink-0" /> budgetcar.hub.pune01@gmail.com</li>
                        <li className="flex gap-3"><FaClock className="mt-1 shrink-0" /> Mon–Sat: 10 AM – 8 PM | Sun: 10 AM – 6 PM</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
                <div className="flex flex-col gap-1 items-center md:items-start">
                    <p>&copy; 2026 BudgetCarHub. All rights reserved.</p>
                    <p className="text-xs text-gray-500 font-medium">Designed by Softtrades Technology Pvt. Ltd.</p>
                </div>
                
                <div className="flex gap-6">
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
                    <Link to="/admin/login" className="hover:text-white transition-colors font-medium">Admin</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;