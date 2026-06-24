import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaUpload, FaCar, FaImage, FaListUl, FaPercent } from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";
import { refreshCars } from "../../data/cars";
import { refreshDeals } from "../../data/deals";

const AddCar = () => {
  const navigate = useNavigate();

  // Basic Information States
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("Maruti Suzuki");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [fuel, setFuel] = useState("Petrol");
  const [transmission, setTransmission] = useState("Manual");
  const [bodyType, setBodyType] = useState("Hatchback");
  const [color, setColor] = useState("");
  const [ownership, setOwnership] = useState("2nd Owner");
  const [registrationCity, setRegistrationCity] = useState("");
  const [insurance, setInsurance] = useState("Comprehensive");
  const [description, setDescription] = useState("");

  // Images States
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  // Features Checkboxes States
  const [featuresList, setFeaturesList] = useState({
    airbags: false,
    rearCamera: false,
    touchscreen: false,
    sunroof: false,
    alloyWheels: false,
    abs: false,
    cruiseControl: false,
    parkingSensors: false
  });

  // Discount Section States
  const [discountType, setDiscountType] = useState("no-discount"); // "no-discount" or "discount"
  const [discountPercentage, setDiscountPercentage] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Handler for Cover Image (Single)
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for Gallery Images (Multiple)
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFeatureToggle = (featureKey) => {
    setFeaturesList((prev) => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!carName || !brand || !price || !year || !kmDriven) {
      alert("Please fill in all required fields marked with * in Basic Information.");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      try {
        const basePrice = parseInt(price, 10);
        const formattedKms = parseInt(kmDriven, 10).toLocaleString("en-IN") + " km";
        
        // Compile features array
        const selectedFeatures = [];
        const featureLabels = {
          airbags: "Airbags",
          rearCamera: "Rear Camera",
          touchscreen: "Touchscreen",
          sunroof: "Sunroof",
          alloyWheels: "Alloy Wheels",
          abs: "ABS",
          cruiseControl: "Cruise Control",
          parkingSensors: "Parking Sensors"
        };
        Object.keys(featuresList).forEach((key) => {
          if (featuresList[key]) {
            selectedFeatures.push(featureLabels[key]);
          }
        });

        const isDiscounted = discountType === "discount" && discountPercentage;

        if (isDiscounted) {
          // Process Discount Deal
          const storedDeals = localStorage.getItem("budget_deals");
          const currentDeals = storedDeals ? JSON.parse(storedDeals) : [];
          
          const newId = currentDeals.length > 0 ? Math.max(...currentDeals.map(d => d.id)) + 1 : 1;
          const pct = parseInt(discountPercentage, 10);
          const savingsVal = Math.round((basePrice * pct) / 100);
          const finalPriceVal = basePrice - savingsVal;

          const newDeal = {
            id: newId,
            badge: `${pct}% OFF`,
            color: "bg-red-500",
            image: coverImage || "/cars/baleno.jpg",
            gallery: galleryImages,
            name: carName,
            price: "₹" + finalPriceVal.toLocaleString("en-IN"),
            original: "₹" + basePrice.toLocaleString("en-IN"),
            savings: "₹" + savingsVal.toLocaleString("en-IN"),
            year: String(year),
            kms: formattedKms,
            fuel: fuel,
            transmission: transmission,
            brand: brand,
            bodyType: bodyType,
            owner: ownership,
            colorName: color || "Unknown",
            registrationCity: registrationCity,
            insurance: insurance,
            description: description,
            features: selectedFeatures,
            discountPercentage: pct
          };

          const updatedDeals = [newDeal, ...currentDeals];
          localStorage.setItem("budget_deals", JSON.stringify(updatedDeals));
          refreshDeals();

        } else {
          // Process Regular Car
          const storedCars = localStorage.getItem("budget_cars");
          const currentCars = storedCars ? JSON.parse(storedCars) : [];
          
          const newId = currentCars.length > 0 ? Math.max(...currentCars.map(c => c.id)) + 1 : 1;

          const newCar = {
            id: newId,
            badge: "CERTIFIED",
            color: "bg-blue-600",
            image: coverImage || "/cars/swift.jpg",
            gallery: galleryImages,
            name: carName,
            price: "₹" + basePrice.toLocaleString("en-IN"),
            year: String(year),
            kms: formattedKms,
            fuel: fuel,
            transmission: transmission,
            brand: brand,
            bodyType: bodyType,
            owner: ownership,
            colorName: color || "Unknown",
            registrationCity: registrationCity,
            insurance: insurance,
            description: description,
            features: selectedFeatures
          };

          const updatedCars = [newCar, ...currentCars];
          localStorage.setItem("budget_cars", JSON.stringify(updatedCars));
          refreshCars();
        }

        setIsSaving(false);
        setSuccessMsg("Vehicle saved successfully!");

        // Reset Fields
        setCarName("");
        setModel("");
        setVariant("");
        setYear("");
        setPrice("");
        setKmDriven("");
        setColor("");
        setRegistrationCity("");
        setDescription("");
        setCoverImage("");
        setGalleryImages([]);
        setDiscountPercentage("");
        setDiscountType("no-discount");
        setFeaturesList({
          airbags: false,
          rearCamera: false,
          touchscreen: false,
          sunroof: false,
          alloyWheels: false,
          abs: false,
          cruiseControl: false,
          parkingSensors: false
        });
      } catch (err) {
        console.error("Error saving car:", err);
        setIsSaving(false);
        alert("Failed to save. Please check inputs.");
      }
    }, 1000);
  };

  const brands = [
    "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota", 
    "Honda", "Kia", "Volkswagen", "Skoda", "Renault", "Ford", "MG"
  ];

  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
  const transmissions = ["Manual", "Automatic", "AMT", "CVT", "DCT"];
  const bodyTypes = ["Hatchback", "Sedan", "SUV", "Compact SUV", "MUV", "Coupe", "Convertible"];
  const ownerships = ["2nd Owner", "3rd Owner"];
  const insurances = ["Comprehensive", "Third Party", "Zero Dep", "Expired", "No Insurance"];

  return (
    <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
      
      {/* Shared Admin Sidebar */}
      <AdminSidebar activeTab="add" />

      {/* Main Content Area */}
      <section className="grow flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-white">Add New Car</h1>
          <span className="text-xs text-gray-500 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            Create Record
          </span>
        </header>

        {/* Form Container */}
        <div className="p-8 max-w-4xl grow space-y-6">
          
          {successMsg && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold flex items-center gap-2">
              <FaCheck /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-8">
            
            {/* ================= SECTION 1: BASIC INFORMATION ================= */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                <FaCar className="text-white/60" size={16} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Car Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Car Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Maruti Suzuki Swift VXi"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                    required
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                  >
                    {brands.map(b => <option key={b} value={b} className="bg-[#151518] text-white">{b}</option>)}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Model *</label>
                  <input
                    type="text"
                    placeholder="e.g. Swift"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                    required
                  />
                </div>

                {/* Variant */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Variant</label>
                  <input
                    type="text"
                    placeholder="e.g. VXi"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Year *</label>
                  <input
                    type="number"
                    placeholder="e.g. 2021"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Original Price (INR) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 520000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                    required
                  />
                </div>

                {/* KM Driven */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">KM Driven *</label>
                  <input
                    type="number"
                    placeholder="e.g. 35000"
                    value={kmDriven}
                    onChange={(e) => setKmDriven(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                    required
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Fuel Type *</label>
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                  >
                    {fuelTypes.map(f => <option key={f} value={f} className="bg-[#151518] text-white">{f}</option>)}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Transmission *</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                  >
                    {transmissions.map(t => <option key={t} value={t} className="bg-[#151518] text-white">{t}</option>)}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Body Type *</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                  >
                    {bodyTypes.map(b => <option key={b} value={b} className="bg-[#151518] text-white">{b}</option>)}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Color</label>
                  <input
                    type="text"
                    placeholder="e.g. Silver"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                  />
                </div>

                {/* Ownership */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Ownership *</label>
                  <select
                    value={ownership}
                    onChange={(e) => setOwnership(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                  >
                    {ownerships.map(o => <option key={o} value={o} className="bg-[#151518] text-white">{o}</option>)}
                  </select>
                </div>

                {/* Registration City */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Registration City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, MH-12"
                    value={registrationCity}
                    onChange={(e) => setRegistrationCity(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                  />
                </div>

                {/* Insurance */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Insurance *</label>
                  <select
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                  >
                    {insurances.map(i => <option key={i} value={i} className="bg-[#151518] text-white">{i}</option>)}
                  </select>
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
                <textarea
                  placeholder="Enter details about vehicle condition, history, maintenance, insurance, etc..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-xs bg-white/2 border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition resize-none"
                ></textarea>
              </div>
            </div>

            {/* ================= SECTION 2: IMAGES ================= */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                <FaImage className="text-white/60" size={16} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Vehicle Images
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Cover Image Upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Cover Image (Single)</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/2 hover:bg-white/3 transition cursor-pointer group h-48">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {coverImage ? (
                      <div className="w-full h-full relative">
                        <img src={coverImage} className="w-full h-full object-cover rounded-xl border border-white/10" alt="Cover Preview" />
                        <button
                          type="button"
                          onClick={() => setCoverImage("")}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-400 transition"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <FaUpload className="text-gray-500 group-hover:text-white transition duration-300 mx-auto" size={24} />
                        <p className="text-xs font-bold text-gray-400">Upload Cover Image</p>
                        <p className="text-[9px] text-gray-600">Primary search thumbnail</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery Images Upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Gallery Images (Multiple)</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/2 hover:bg-white/3 transition cursor-pointer group h-48">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="text-center space-y-2">
                      <FaUpload className="text-gray-500 group-hover:text-white transition duration-300 mx-auto" size={24} />
                      <p className="text-xs font-bold text-gray-400">Upload Gallery Photos</p>
                      <p className="text-[9px] text-gray-600">Select multiple files</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Gallery Previews Grid */}
              {galleryImages.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">Gallery Previews ({galleryImages.length})</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {galleryImages.map((img, index) => (
                      <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-gray-900">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:text-red-400 opacity-0 group-hover:opacity-100 transition duration-200"
                        >
                          <FaTimes size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ================= SECTION 3: FEATURES ================= */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                <FaListUl className="text-white/60" size={16} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Features
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: "airbags", label: "Airbags" },
                  { key: "rearCamera", label: "Rear Camera" },
                  { key: "touchscreen", label: "Touchscreen" },
                  { key: "sunroof", label: "Sunroof" },
                  { key: "alloyWheels", label: "Alloy Wheels" },
                  { key: "abs", label: "ABS" },
                  { key: "cruiseControl", label: "Cruise Control" },
                  { key: "parkingSensors", label: "Parking Sensors" }
                ].map((feat) => (
                  <button
                    key={feat.key}
                    type="button"
                    onClick={() => handleFeatureToggle(feat.key)}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition duration-300 text-center cursor-pointer ${
                      featuresList[feat.key]
                        ? "bg-white text-gray-955 border-white shadow-lg"
                        : "bg-white/2 border-white/6 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {feat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= SECTION 4: DISCOUNT SECTION ================= */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                <FaPercent className="text-white/60" size={16} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Discount Options
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                
                {/* No Discount Option */}
                <label className="flex items-center gap-3.5 cursor-pointer text-xs font-bold text-white select-none">
                  <input
                    type="radio"
                    name="discountGroup"
                    value="no-discount"
                    checked={discountType === "no-discount"}
                    onChange={() => setDiscountType("no-discount")}
                    className="accent-white w-4 h-4"
                  />
                  No Discount
                </label>

                {/* Discount Option */}
                <label className="flex items-center gap-3.5 cursor-pointer text-xs font-bold text-white select-none">
                  <input
                    type="radio"
                    name="discountGroup"
                    value="discount"
                    checked={discountType === "discount"}
                    onChange={() => setDiscountType("discount")}
                    className="accent-white w-4 h-4"
                  />
                  Discount Options
                </label>

                {/* Conditional discount percentage input */}
                {discountType === "discount" && (
                  <div className="flex-1 w-full max-w-xs transition duration-300 animate-slide-right">
                    <div className="flex items-center bg-white/2 border border-white/6 rounded-xl px-4 py-2.5 focus-within:border-white/20 transition">
                      <input
                        type="number"
                        placeholder="Discount Percentage (e.g. 15)"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        className="w-full text-xs text-white outline-none bg-transparent"
                        min="1"
                        max="99"
                        required
                      />
                      <span className="text-xs font-bold text-gray-500 ml-2">%</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Form Buttons */}
            <div className="pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="px-6 py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 bg-white text-gray-955 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-150 active:scale-[0.98] transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>

          </form>

        </div>

      </section>

    </main>
  );
};

export default AddCar;
