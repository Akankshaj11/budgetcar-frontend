import React, { useState } from "react";
import { FaCarSide, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavbarSearch = ({ searchQuery, setSearchQuery, hideLinks = false }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Inventory", "Sell", "Contact"];

  const handleLinkClick = (link) => {
    setOpen(false);
    if (link === "Home") {
      navigate("/");
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(link.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            
            {/* Left: Logo & Name */}
            <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer shrink-0">
              <img 
                src="/budgetcarlogo.png" 
                alt="BudgetCarHub Logo" 
                className="h-9 sm:h-10 md:h-11 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] object-contain brightness-0" 
              />
            </div>

            {/* Middle: Search Field (Desktop) */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative flex items-center w-full">
                <FaSearch className="absolute left-4 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, brand or fuel type..."
                  className="w-full pl-11 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:bg-white focus:border-gray-400 transition"
                />
              </div>
            </div>

            {/* Right: Desktop Links */}
            {!hideLinks && (
              <ul className="hidden lg:flex items-center gap-7">
                {links.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleLinkClick(item)}
                    className="relative text-sm font-semibold text-gray-700 cursor-pointer hover:text-gray-955 transition-colors duration-300 group py-1"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
              </ul>
            )}

            {/* Book Drive Button */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <button
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 150);
                }}
                className="px-5 py-2.5 rounded-xl bg-gray-900 text-xs font-bold text-white hover:bg-gray-800 transition cursor-pointer"
              >
                Book Test Drive
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-3 lg:hidden shrink-0">
              <button
                onClick={() => setOpen(!open)}
                className="text-gray-700 text-xl cursor-pointer"
              >
                {open ? <FaTimes /> : <FaBars />}
              </button>
            </div>

          </div>

          {/* Mobile Search Input (Visible on small screens below header) */}
          <div className="pb-4 block md:hidden">
            <div className="relative flex items-center w-full">
              <FaSearch className="absolute left-4 text-gray-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cars..."
                className="w-full pl-11 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:bg-white focus:border-gray-400 transition"
              />
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 lg:hidden z-60 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <FaTimes
            className="text-xl cursor-pointer text-gray-750"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-6 px-8 mt-6">
          {!hideLinks && links.map((item) => (
            <li
              key={item}
              onClick={() => handleLinkClick(item)}
              className="text-base font-semibold text-gray-800 cursor-pointer hover:text-gray-950 transition"
            >
              {item}
            </li>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              navigate("/");
              setTimeout(() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }, 150);
            }}
            className="mt-6 w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            Book Test Drive
          </button>
        </ul>
      </div>
    </>
  );
};

export default NavbarSearch;
