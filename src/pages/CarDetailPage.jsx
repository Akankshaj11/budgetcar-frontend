

import React, { useEffect, useState, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FaWhatsapp, FaShareAlt, FaCheck, FaStar, 
  FaUserCircle, FaChevronLeft, FaChevronRight,
  FaCalendarAlt, FaGasPump, FaRoad, FaCog, FaArrowLeft
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const CarDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
}, [id]);

  return (
    <main className="bg-gray-50 min-h-screen pt-8">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-6">
        {/* <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 font-semibold hover:text-black transition"
        >
          <FaArrowLeft /> Back
        </button>  */}


        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold shadow-sm hover:bg-gray-100 transition">
    <FaArrowLeft className="text-xs"/>
    Back   
</button>




      </div>


      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Carousel */}
          <div className="relative bg-black rounded-2xl h-96 overflow-hidden group">
            <img src="/cars/hero-car.png" alt="Car" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition">
              <button className="bg-white/80 p-2 rounded-full"><FaChevronLeft /></button>
              <button className="bg-white/80 p-2 rounded-full"><FaChevronRight /></button>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold">3 / 5</div>
          </div>

          {/* Section Navigation */}
          <div className="flex gap-8 border-b border-gray-200 pl-6 sticky top-5 bg-gray-50 z-20 py-4">
            {["Overview", "Features & Specs", "Gallery", "Reviews"].map(tab => (
              <button 
                key={tab} 
                // onClick={() => setActiveTab(tab.toLowerCase())}

                onClick={() => {
    const sectionId =
        tab === "Overview"
            ? "overview"
            : tab === "Features & Specs"
            ? "specs"
            : tab.toLowerCase();

    setActiveTab(sectionId);

    // document.getElementById(sectionId)?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    // });


    const element = document.getElementById(sectionId);

if (element) {
    const offset = 110;

    window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
    });
}


}}
                className={`font-bold pb-2 transition-colors ${
    activeTab ===
    (tab === "Overview"
        ? "overview"
        : tab === "Features & Specs"
        ? "specs"
        : tab.toLowerCase())
        ? "border-b-2 border-gray-900 text-gray-900"
        : "text-gray-400"
}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Car Overview */}
          <section id="overview" className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6">Car Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[ {l: "Reg. Year", v: "Sept 2018"}, {l: "Insurance", v: "Third Party"}, {l: "Fuel", v: "Petrol"}, {l: "Alternate", v: "CNG"}, {l: "Seats", v: "5"}, {l: "Kms", v: "89,847"}, {l: "RTO", v: "Pune"}, {l: "Ownership", v: "2nd Owner"}, {l: "Engine", v: "1197 cc"}, {l: "Trans.", v: "Auto"} ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">{item.l}</p>
                  <p className="font-bold text-sm">{item.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Specs & Features */}
          <section id="specs" className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6">Features & Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4">Features</h4>
                {["Rear AC Vents", "Rear Camera", "Comfort", "Interior", "Exterior", "Safety"].map(f => <p key={f} className="flex items-center gap-2 mb-2 text-sm"><FaCheck className="text-green-500" /> {f}</p>)}
                <a href="#" className="text-sm font-bold underline mt-4 block">View all Features →</a>
              </div>
              <div>
                <h4 className="font-bold mb-4">Specifications</h4>
                {[ {l: "Engine", v: "1197 cc"}, {l: "Power", v: "81.86 bhp"}, {l: "Mileage", v: "18.9 kmpl"} ].map(s => <div key={s.l} className="flex justify-between border-b py-2 text-sm"><span className="text-gray-500">{s.l}</span><span className="font-bold">{s.v}</span></div>)}
                <a href="#" className="text-sm font-bold underline mt-4 block">View all Specifications →</a>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section id="gallery" className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-extrabold">Gallery</h2>
              <a href="#" className="text-sm font-bold underline">View all images →</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>)}
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6">Reviews</h2>
            <div className="space-y-4">
              {[1,2].map(i => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2"><FaUserCircle className="text-2xl text-gray-400" /><span className="font-bold">User</span><div className="flex text-yellow-400 text-xs"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div></div>
                  <p className="text-sm text-gray-600">Excellent vehicle, runs smoothly.</p>
                </div>
              ))}
            </div>
            <a href="#" className="text-sm font-bold underline mt-4 block">View more reviews →</a>
          </section>
        </div>

        {/* RIGHT STICKY SECTION */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-xl font-extrabold mb-1">2018 Hyundai Grand i10</h1>
            <p className="text-sm text-gray-500 mb-4">1.2 Kappa Sportz Option AT</p>
            <div className="bg-gray-100 p-3 rounded-lg text-xs font-semibold mb-4">Automatic • Petrol • 2nd Owner • 89,847 kms</div>
            <p className="text-3xl font-extrabold mb-1">₹4.47 Lakh</p>
            <p className="text-green-600 font-bold text-sm mb-6">Save ₹60,081 (vs ₹5.07 Lakh)</p>
            
            <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold mb-4 hover:bg-black transition">Make Your Offer</button>
            
            <div className="flex gap-4">
              <a href="https://wa.me/919922801959" target="_blank" rel="noopener noreferrer" className="flex-1 border py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition"><FaWhatsapp className="text-green-500" /> WhatsApp</a>
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex-1 border py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition"><FaShareAlt /> Share</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CarDetailPage;