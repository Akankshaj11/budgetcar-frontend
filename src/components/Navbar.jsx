import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCarSide,
  FaPhoneAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSolid = scrolled || location.pathname !== "/";

  const links = ["Home", "About", "Inventory", "Sell", "Contact"];

  const handleLinkClick = (item) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (item === "Home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(item.toLowerCase());
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
    } else {
      if (item === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleBookTestDrive = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isSolid
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-150"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}

            <div 
              className="flex items-center gap-3 cursor-pointer shrink-0"
              onClick={() => handleLinkClick("Home")}
            >
              <img 
                src="/budgetcarlogo.png" 
                alt="BudgetCarHub Logo" 
                className={`h-9 sm:h-10 md:h-11 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] object-contain transition-all duration-300 ${
                  isSolid ? "brightness-0" : "brightness-0 invert"
                }`}
              />
            </div>

            {/* Desktop Links */}

            <ul className="hidden lg:flex items-center gap-9">
              {links.map((item) => (
                <li
                  key={item}
                  onClick={() => handleLinkClick(item)}
                  className={`relative font-medium cursor-pointer transition-colors duration-300 group ${
                    isSolid ? "text-gray-900" : "text-white"
                  }`}
                >
                  {item}

                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                      isSolid ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                </li>
              ))}
            </ul>

            {/* Right */}

            <div className="hidden lg:flex items-center gap-6">

              <a
                href="tel:+919922801959"
                className={`text-xl animate-phone transition-colors duration-300 ${
                  isSolid
                    ? "text-gray-900 hover:text-gray-600"
                    : "text-white hover:text-gray-300"
                }`}
              >
                <FaPhoneAlt />
              </a>

              <button
                onClick={handleBookTestDrive}
                className={`px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isSolid
                    ? "bg-gray-900 text-white hover:bg-black"
                    : "bg-white text-gray-900 hover:bg-gray-200"
                }`}
              >
                Book Test Drive
              </button>

            </div>

            {/* Mobile Toggle */}

            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden text-2xl transition-colors duration-300 ${
                isSolid ? "text-gray-900" : "text-white"
              }`}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 lg:hidden z-60 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <FaTimes
            className="text-2xl cursor-pointer text-gray-900"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-8 px-8 mt-6">
          {links.map((item) => (
            <li
              key={item}
              onClick={() => handleLinkClick(item)}
              className="text-lg font-medium text-gray-900 cursor-pointer hover:text-gray-600"
            >
              {item}
            </li>
          ))}

          <button 
            onClick={handleBookTestDrive}
            className="mt-6 bg-gray-900 text-white rounded-xl py-3 font-semibold cursor-pointer"
          >
            Book Test Drive
          </button>
        </ul>
      </div>
    </>
  );
};

export default Navbar;