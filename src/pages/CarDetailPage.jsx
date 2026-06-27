import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaWhatsapp, FaCheck, FaStar,
  FaUserCircle, FaChevronLeft, FaChevronRight,
  FaArrowLeft, FaFacebook, FaTwitter,
  FaEnvelope, FaCopy, FaShareAlt, FaTimes
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CarDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-time comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Specs, Features & Comment Form states
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Gallery Carousel States
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Share Modal States
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (windowWidth >= 768) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  };

  const itemsPerPage = getItemsPerPage();
  const galleryList = car ? (car.gallery || car.galleryImages || []) : [];

  const handlePrev = () => {
    setGalleryIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setGalleryIndex((prev) => Math.min(prev + 1, galleryList.length - itemsPerPage));
  };

  // Scroll spy observer ref
  const observerRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const snap = await getDoc(doc(db, "cars", id));
        if (snap.exists() && snap.data().adminAdded === true) {
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

  // Real-time comments listener
  useEffect(() => {
    if (!id) return;
    const commentsRef = collection(db, "cars", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(loaded);
    });

    return () => unsubscribe();
  }, [id]);

  // IntersectionObserver for scroll spy
  useEffect(() => {
    if (loading || !car) return;

    const sections = ["overview", "specs", "gallery", "reviews"];
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [loading, car]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;
    setSubmitting(true);
    try {
      const commentsRef = collection(db, "cars", id, "comments");
      await addDoc(commentsRef, {
        userName: userName.trim(),
        rating: rating,
        comment: newComment.trim(),
        createdAt: serverTimestamp()
      });
      setNewComment("");
      setUserName("");
      setRating(5);
      setShowCommentForm(false); // Hide form after submission
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !car) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-gray-900 border-t-transparent animate-spin"></div>
          <p className="text-gray-650 font-bold text-sm">Loading car details...</p>
        </div>
      </div>
    );
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(tabName);
    if (element) {
      const offset = 110;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth"
      });
    }
  };

  // Compile Features list
  const features = car.features || [
    "Air Conditioner",
    "Power Steering",
    "Power Windows Front",
    "Anti Lock Braking System",
    "Driver Airbag",
    "Passenger Airbag",
    "Automatic Climate Control",
    "Rear Parking Sensors"
  ];

  // Compile Specifications list
  const specs = [
    { l: "Brand", v: car.brand },
    { l: "Model", v: car.model },
    { l: "Variant", v: car.variant },
    { l: "Body Type", v: car.bodyType },
    { l: "Year", v: car.year },
    { l: "Fuel", v: car.fuel },
    { l: "Transmission", v: car.transmission },
    { l: "Ownership", v: car.owner },
    { l: "KM Driven", v: car.kms },
    { l: "Color", v: car.colorName },
    { l: "Registration City", v: car.registrationCity },
    { l: "Insurance Type", v: car.insurance }
  ].filter(s => s.v);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold shadow-sm hover:bg-gray-100 transition cursor-pointer mb-6"
        >
          <FaArrowLeft className="text-xs" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Cover Photo */}
            <div className="relative bg-black rounded-2xl h-64 sm:h-96 overflow-hidden shadow-md">
              <img
                src={selectedImage || car.image || car.coverImage}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Section Navigation Tabs (Sticky) */}
            <div className="flex gap-8 border-b border-gray-200 pl-6 sticky top-18 bg-gray-50 z-20 py-4">
              {[
                { display: "Overview", id: "overview" },
                { display: "Features & Specs", id: "specs" },
                { display: "Gallery", id: "gallery" },
                { display: "Reviews", id: "reviews" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`font-bold pb-2 transition-colors cursor-pointer text-sm md:text-base ${
                    activeTab === tab.id
                      ? "border-b-2 border-gray-900 text-gray-900"
                      : "text-gray-400 hover:text-gray-650"
                  }`}
                >
                  {tab.display}
                </button>
              ))}
            </div>

            {/* Car Overview */}
            <section id="overview" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Car Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { l: "Brand", v: car.brand },
                  { l: "Model", v: car.model },
                  { l: "Variant", v: car.variant },
                  { l: "Year", v: car.year },
                  { l: "Insurance", v: car.insurance },
                  { l: "Fuel", v: car.fuel },
                  { l: "Transmission", v: car.transmission },
                  { l: "KM Driven", v: car.kms },
                  { l: "Ownership", v: car.owner },
                  { l: "Color", v: car.colorName },
                  { l: "Registration City", v: car.registrationCity }
                ].filter(item => item.v).map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{item.l}</p>
                    <p className="font-bold text-sm text-gray-800">{item.v}</p>
                  </div>
                ))}
              </div>

              {/* Description Sub-section */}
              {car.description && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Seller Description</h3>
                  <p className="text-sm text-gray-650 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {car.description}
                  </p>
                </div>
              )}
            </section>

            {/* Specs & Features */}
            <section id="specs" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Features & Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Features Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-850 mb-4 text-sm md:text-base border-b pb-2">Included Features</h4>
                    {features.slice(0, showAllFeatures ? features.length : 5).map(f => (
                      <p key={f} className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                        <FaCheck className="text-green-500 text-xs" /> {f}
                      </p>
                    ))}
                  </div>
                  {features.length > 5 && (
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="text-xs font-bold text-gray-900 underline mt-4 block hover:text-black cursor-pointer text-left focus:outline-none"
                    >
                      {showAllFeatures ? "Show Less Features" : "View All Features"}
                    </button>
                  )}
                </div>
                
                {/* Specifications Column */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-850 mb-4 text-sm md:text-base border-b pb-2">Specifications</h4>
                    {specs.slice(0, showAllSpecs ? specs.length : 5).map(s => (
                      <div key={s.l} className="flex justify-between border-b py-2.5 text-sm">
                        <span className="text-gray-500">{s.l}</span>
                        <span className="font-bold text-gray-800">{s.v}</span>
                      </div>
                    ))}
                  </div>
                  {specs.length > 5 && (
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="text-xs font-bold text-gray-900 underline mt-4 block hover:text-black cursor-pointer text-left focus:outline-none"
                    >
                      {showAllSpecs ? "Show Less Specifications" : "View All Specifications"}
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Gallery with Inline Video */}
            <section id="gallery" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Gallery</h2>
              
              {/* Highlighted Walk-Around Video */}
              {car.video && (
                <div className="mb-6 max-w-xl mx-auto rounded-2xl overflow-hidden bg-black border border-gray-200 relative group shadow-md flex items-center justify-center h-64">
                  <video 
                    src={car.video} 
                    className="w-full h-full object-cover" 
                    controls 
                    playsInline 
                    muted
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Walk-Around Video
                  </div>
                </div>
              )}

              {galleryList.length > 3 ? (
                /* Carousel Layout */
                <div className="relative group px-10">
                  <div className="overflow-hidden rounded-xl">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${galleryIndex * (100 / itemsPerPage)}%)` }}
                    >
                      {galleryList.map((image, index) => (
                        <div 
                          key={index} 
                          className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-2"
                        >
                          <img
                            src={image}
                            className={`h-32 w-full object-cover rounded-xl hover:scale-[1.03] duration-300 transition cursor-pointer border shadow-xs ${
                              (selectedImage || car.image || car.coverImage) === image ? "border-gray-900 ring-2 ring-gray-900/20" : "border-gray-100"
                            }`}
                            alt={`Car Angle ${index + 1}`}
                            onClick={() => setSelectedImage(image)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Prev Button */}
                  <button 
                    onClick={handlePrev}
                    disabled={galleryIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition duration-300 z-10 cursor-pointer text-gray-800"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  
                  {/* Next Button */}
                  <button 
                    onClick={handleNext}
                    disabled={galleryIndex >= galleryList.length - itemsPerPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition duration-300 z-10 cursor-pointer text-gray-800"
                  >
                    <FaChevronRight size={14} />
                  </button>
                  
                  {/* Pagination Indicator */}
                  <div className="text-center text-xs text-gray-400 font-bold mt-4">
                    Showing {galleryIndex + 1} - {Math.min(galleryIndex + itemsPerPage, galleryList.length)} of {galleryList.length} Photos
                  </div>
                </div>
              ) : (
                /* Standard Grid Layout */
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryList.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={`h-32 w-full object-cover rounded-lg hover:opacity-95 hover:scale-[1.02] duration-300 transition cursor-pointer border shadow-sm ${
                        (selectedImage || car.image || car.coverImage) === image ? "border-gray-900 ring-2 ring-gray-900/20" : "border-gray-100"
                      }`}
                      alt={`Car Angle ${index + 1}`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                  {galleryList.length === 0 && (
                    <p className="col-span-full text-center text-sm text-gray-400 py-4">No gallery photos uploaded yet.</p>
                  )}
                </div>
              )}
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Customer Reviews</h2>
              
              {/* Reviews List */}
              <div className="space-y-5 mb-8">
                {comments.length === 0 ? (
                  <p className="text-sm text-gray-400 py-4 text-center">No reviews posted yet. Be the first to share your feedback!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-100 pb-5 last:border-b-0 flex gap-4">
                      <div className="shrink-0 mt-0.5">
                        <FaUserCircle className="text-3xl text-gray-300" />
                      </div>
                      <div className="grow">
                        <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                          <span className="font-bold text-sm text-gray-800">{comment.userName}</span>
                          {comment.createdAt?.seconds && (
                            <span className="text-[11px] text-gray-400 font-semibold">
                              {new Date(comment.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })}
                            </span>
                          )}
                        </div>
                        <div className="flex text-yellow-400 text-xs mb-2">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar 
                              key={idx} 
                              className={idx < (comment.rating || 5) ? "text-yellow-400" : "text-gray-250"}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-650 leading-relaxed whitespace-pre-line">{comment.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Review Input Form (Toggled via button) */}
              {!showCommentForm ? (
                <div className="border-t border-gray-100 pt-6 text-center">
                  <button
                    onClick={() => setShowCommentForm(true)}
                    className="rounded-xl bg-gray-900 hover:bg-black text-white px-6 py-3 text-xs font-bold transition cursor-pointer shadow-sm focus:outline-none"
                  >
                    Post a Comment
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 text-sm">Post a Comment</h3>
                    <button 
                      onClick={() => setShowCommentForm(false)}
                      className="text-xs text-gray-400 hover:text-gray-600 underline font-semibold cursor-pointer focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Enter your name..."
                          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-gray-400 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">Rating</label>
                        <div className="flex items-center gap-1.5 h-10">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="text-xl focus:outline-none transition hover:scale-115 cursor-pointer"
                            >
                              <FaStar className={star <= rating ? "text-yellow-400" : "text-gray-250"} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">Your Review / Comment</label>
                      <textarea
                        required
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tell us what you think about this car..."
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-400 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-xl bg-gray-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {submitting ? "Posting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT STICKY SECTION */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-[10px] font-bold text-red-650 uppercase tracking-wider mb-1">
                {car.brand} {car.model && `• ${car.model}`}
              </p>
              <h1 className="text-xl font-extrabold mb-1 text-gray-900 leading-tight">{car.name}</h1>
              <p className="text-sm text-gray-400 mb-4">{car.variant}</p>
              <div className="bg-gray-50 border border-gray-100 p-3.5 rounded-xl text-xs font-semibold mb-4 text-gray-650 flex flex-wrap gap-2">
                <span>{car.transmission}</span>
                <span>•</span>
                <span>{car.fuel}</span>
                <span>•</span>
                <span>{car.owner}</span>
                <span>•</span>
                <span>{car.kms}</span>
              </div>
              
              <p className="text-3xl font-extrabold text-gray-950 mb-1">
                ₹{Number(car.price || 0).toLocaleString("en-IN")}
              </p>
              
              {car.isDiscount && (
                <p className="text-green-600 font-bold text-xs mb-6 flex items-center gap-1.5">
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-md font-extrabold">DEAL</span>
                  Save ₹{Number(car.savings || car.discount || 0).toLocaleString("en-IN")}
                </p>
              )}

              {!car.isDiscount && <div className="mb-6"></div>}

              {/* CTA Buttons Grid */}
              <div className="space-y-3 mb-2">
                {/* Row 1: Make Your Offer (Full Width) */}
                <a 
                  href="tel:+919922801959" 
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-955 transition flex items-center justify-center text-xs md:text-sm text-center shadow-md shadow-gray-900/10 cursor-pointer"
                >
                  Make Your Offer
                </a>

                {/* Row 2: WhatsApp & Share (Side-by-side) */}
                <div className="flex gap-3">
                  <a 
                    href={`https://wa.me/919922801959?text=Hi, I am interested in the ${car.brand || ""} ${car.name || ""} (${car.year || ""}) listed on BudgetCarHub.`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 border border-gray-250 py-3 rounded-xl flex items-center justify-center gap-1.5 font-bold hover:bg-gray-50 transition text-xs md:text-sm text-gray-700 cursor-pointer"
                  >
                    <FaWhatsapp className="text-green-600 text-base" /> 
                    WhatsApp
                  </a>
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="flex-1 border border-gray-250 py-3 rounded-xl flex items-center justify-center gap-1.5 font-bold hover:bg-gray-50 transition text-xs md:text-sm text-gray-700 cursor-pointer"
                  >
                    <FaShareAlt className="text-blue-600 text-base" /> 
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => {
                setShowShareModal(false);
                setCopied(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>
            
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Share this Car</h3>
            <p className="text-xs text-gray-500 mb-4 font-medium">Share the details of {car.name} with others.</p>
            
            {/* Social Share Icons Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {/* WhatsApp */}
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this ${car.name} on BudgetCarHub: ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition duration-300">
                  <FaWhatsapp size={18} />
                </div>
                <span className="text-[9px] font-bold text-gray-500">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition duration-300">
                  <FaFacebook size={16} />
                </div>
                <span className="text-[9px] font-bold text-gray-500">Facebook</span>
              </a>

              {/* X */}
              <a 
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this certified pre-owned ${car.name} on BudgetCarHub!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black transition duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <span className="text-[9px] font-bold text-gray-500">X</span>
              </a>

              {/* Twitter */}
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this certified pre-owned ${car.name} on BudgetCarHub!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#e8f5fe] text-[#1DA1F2] flex items-center justify-center group-hover:bg-[#d4edfe] transition duration-300">
                  <FaTwitter size={16} />
                </div>
                <span className="text-[9px] font-bold text-gray-500">Twitter</span>
              </a>

              {/* Email */}
              <a 
                href={`mailto:?subject=${encodeURIComponent(`Certified Pre-Owned ${car.name} at BudgetCarHub`)}&body=${encodeURIComponent(`Hi,\n\nI found this certified pre-owned ${car.name} on BudgetCarHub and wanted to share it with you.\n\nLink: ${window.location.href}`)}`}
                className="flex flex-col items-center gap-1 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-100 transition duration-300">
                  <FaEnvelope size={16} />
                </div>
                <span className="text-[9px] font-bold text-gray-500">Email</span>
              </a>
            </div>
            
            {/* Copy Link Input Section */}
            <div className="relative flex items-center">
              <input 
                type="text" 
                readOnly 
                value={window.location.href}
                className="w-full text-xs border border-gray-200 rounded-xl pl-3 pr-20 py-2.5 outline-none bg-gray-50 text-gray-500 select-all"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute right-1.5 bg-gray-900 hover:bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <FaCheck size={10} className="text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <FaCopy size={10} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CarDetailPage;