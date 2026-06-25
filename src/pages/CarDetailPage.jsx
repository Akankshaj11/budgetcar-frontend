

import React, { useEffect, useState, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaWhatsapp, FaShareAlt, FaCheck, FaStar,
  FaUserCircle, FaChevronLeft, FaChevronRight,
  FaCalendarAlt, FaGasPump, FaRoad, FaCog, FaArrowLeft
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const CarDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const snap = await getDoc(doc(db, "cars", id));
        if (snap.exists()) {
          setCar({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (err) {
        console.error("Error loading car details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

  if (loading || !car) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

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
          <FaArrowLeft className="text-xs" />
          Back
        </button>




      </div>


      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* Main Carousel */}
          <div className="relative bg-black rounded-2xl h-96 overflow-hidden group">
            <img
              src={car.image || car.coverImage}
              alt={car.name}
              className="w-full h-full object-cover"
            />
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
                className={`font-bold pb-2 transition-colors ${activeTab ===
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
              {[
              {l:"Year", v:car.year },
              {l:"Insurance", v:car.insurance },
              {l:"Fuel", v:car.fuel },
              {l:"Transmission", v:car.transmission },
              {l:"KM Driven", v:car.kms },
              {l:"Ownership", v:car.owner },
              {l:"Color", v:car.color },
              {l:"Registration", v:car.registrationCity }
              ].map((item, i) => (
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
                {[{ l: "Engine", v: "1197 cc" }, { l: "Power", v: "81.86 bhp" }, { l: "Mileage", v: "18.9 kmpl" }].map(s => <div key={s.l} className="flex justify-between border-b py-2 text-sm"><span className="text-gray-500">{s.l}</span><span className="font-bold">{s.v}</span></div>)}
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
              {(car.gallery || car.galleryImages || []).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="h-32 w-full object-cover rounded-lg"
                  alt=""
                />
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6">Reviews</h2>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2"><FaUserCircle className="text-2xl text-gray-400" /><span className="font-bold">User</span><div className="flex text-yellow-400 text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div></div>
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
            <h1 className="text-xl font-extrabold mb-1">{car.name}</h1>
            <p className="text-sm text-gray-500 mb-4">{car.variant}</p>
            <div className="bg-gray-100 p-3 rounded-lg text-xs font-semibold mb-4">{car.transmission} • {car.fuel} • {car.owner} • {car.kms}</div>
            <p className="text-3xl font-extrabold mb-1">₹{Number(car.price || 0).toLocaleString("en-IN")}</p>
            {car.isDiscount && (
              <p className="text-green-600 font-bold text-sm mb-6">
                Save ₹{Number(car.savings || car.discount || 0).toLocaleString("en-IN")}
              </p>
            )}

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