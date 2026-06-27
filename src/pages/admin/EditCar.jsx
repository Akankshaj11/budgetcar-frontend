import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaTimes, FaUpload, FaCar, FaImage, FaListUl, FaPercent } from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadImage } from "../../services/cloudinary";

const EditCar = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  // Basic Information States
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [color, setColor] = useState("");
  const [ownership, setOwnership] = useState("");
  const [registrationCity, setRegistrationCity] = useState("");
  const [insurance, setInsurance] = useState("");
  const [description, setDescription] = useState("");

  // Images States
  const [coverImage, setCoverImage] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  // Video States
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

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

  // Load the vehicle data on mount
  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const snap = await getDoc(doc(db, "cars", id));
        if (!snap.exists()) {
          alert("Vehicle not found!");
          navigate("/admin/manage-cars");
          return;
        }
        const vehicle = { id: snap.id, ...snap.data() };

        // Set state fields
        setCarName(vehicle.name || "");
        setBrand(vehicle.brand || "Suzuki");
        
        if (vehicle.model) {
          setModel(vehicle.model);
          setVariant(vehicle.variant || "");
        } else {
          // Attempt to parse model and variant from full name if not separate
          const nameWithoutBrand = (vehicle.name || "").replace(vehicle.brand || "", "").trim();
          const nameWords = nameWithoutBrand.split(" ");
          setModel(nameWords[0] || "");
          setVariant(nameWords.slice(1).join(" ") || "");
        }

        // Pre-fill fields
        if (vehicle.isDiscount) {
          setPrice(vehicle.original ? String(vehicle.original) : (vehicle.price ? String(vehicle.price) : ""));
          setDiscountType("discount");
          setDiscountPercentage(vehicle.discountPercentage || "");
        } else {
          setPrice(vehicle.price ? String(vehicle.price) : "");
          setDiscountType("no-discount");
          setDiscountPercentage("");
        }

        setYear(vehicle.year || "");
        setFuel(vehicle.fuel || "Petrol");
        setTransmission(vehicle.transmission || "Manual");
        setBodyType(vehicle.bodyType || "Hatchback");
        setOwnership(vehicle.owner || "2nd Owner");
        setKmDriven(vehicle.kms ? vehicle.kms.replace(/[^\d]/g, "") : "");
        setColor(vehicle.colorName || "");
        setRegistrationCity(vehicle.registrationCity || "");
        setInsurance(vehicle.insurance || "Comprehensive");
        setDescription(vehicle.description || "");
        
        // Features checkbox mapping
        const activeFeatures = vehicle.features || [];
        setFeaturesList({
          airbags: activeFeatures.includes("Airbags"),
          rearCamera: activeFeatures.includes("Rear Camera"),
          touchscreen: activeFeatures.includes("Touchscreen"),
          sunroof: activeFeatures.includes("Sunroof"),
          alloyWheels: activeFeatures.includes("Alloy Wheels"),
          abs: activeFeatures.includes("ABS"),
          cruiseControl: activeFeatures.includes("Cruise Control"),
          parkingSensors: activeFeatures.includes("Parking Sensors")
        });

        setCoverImage(vehicle.image || "");
        setVideoPreview(vehicle.video || "");
        
        // Map URLs to object structure
        const initialGallery = (vehicle.gallery || []).map((url) => ({
          id: Math.random().toString(36).substr(2, 9),
          url: url,
          file: null
        }));
        setGalleryItems(initialGallery);

      } catch (err) {
        console.error("Error loading vehicle details:", err);
      }
    };

    loadVehicle();
  }, [id, navigate]);

  // Handler for Cover Image (Single)
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
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
        setGalleryItems((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            url: reader.result,
            file: file
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (itemId) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureToggle = (featureKey) => {
    setFeaturesList((prev) => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!carName || !brand || !price || !year || !kmDriven) {
      alert("Please fill in all required fields marked with * in Basic Information.");
      return;
    }

    setIsSaving(true);

    try {
      // 1. Upload Cover Image if a new one is selected
      let finalImageUrl = coverImage;
      if (coverFile) {
        const uploadedUrl = await uploadImage(coverFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          alert("Failed to upload cover image.");
          setIsSaving(false);
          return;
        }
      }

      // 2. Upload Gallery Images if any new files are selected
      const finalGalleryUrls = [];
      for (const item of galleryItems) {
        if (item.file) {
          const uploadedUrl = await uploadImage(item.file);
          if (uploadedUrl) {
            finalGalleryUrls.push(uploadedUrl);
          } else {
            console.error(`Failed to upload gallery image: ${item.file.name}`);
          }
        } else {
          finalGalleryUrls.push(item.url);
        }
      }

      // 3. Upload Video Walk-around if selected
      let finalVideoUrl = videoPreview;
      if (videoFile) {
        const uploadedUrl = await uploadImage(videoFile);
        if (uploadedUrl) {
          finalVideoUrl = uploadedUrl;
        } else {
          alert("Failed to upload video.");
          setIsSaving(false);
          return;
        }
      } else if (!videoPreview) {
        finalVideoUrl = null;
      }

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

      const isCurrentlyDiscounted = discountType === "discount" && discountPercentage;

      const docData = {
        name: carName,
        brand: brand,
        model: model,
        variant: variant,
        year: String(year),
        kms: formattedKms,
        fuel: fuel,
        transmission: transmission,
        bodyType: bodyType,
        owner: ownership,
        colorName: color,
        registrationCity: registrationCity,
        insurance: insurance,
        description: description,
        features: selectedFeatures,
        image: finalImageUrl,
        gallery: finalGalleryUrls,
        video: finalVideoUrl,
        adminAdded: true,
        updatedAt: serverTimestamp()
      };

      if (isCurrentlyDiscounted) {
        const pct = parseInt(discountPercentage, 10);
        const savingsVal = Math.round((basePrice * pct) / 100);
        const finalPriceVal = basePrice - savingsVal;

        docData.price = finalPriceVal;
        docData.original = basePrice;
        docData.savings = savingsVal;
        docData.discountPercentage = pct;
        docData.badge = `${pct}% OFF`;
        docData.color = "bg-red-500";
        docData.isDiscount = true;
      } else {
        docData.price = basePrice;
        docData.original = null;
        docData.savings = null;
        docData.discountPercentage = null;
        docData.badge = "CERTIFIED";
        docData.color = "bg-blue-600";
        docData.isDiscount = false;
      }

      await updateDoc(doc(db, "cars", id), docData);

      setIsSaving(false);
      setSuccessMsg("Changes saved successfully!");

      setTimeout(() => {
        navigate("/admin/manage-cars");
      }, 800);

    } catch (err) {
      console.error("Error saving changes:", err);
      setIsSaving(false);
      alert("Failed to save changes.");
    }
  };

  const brands = [
    "Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota", 
    "Honda", "Kia", "Volkswagen", "Skoda", "Renault", "Ford", "MG",
    "BMW", "Mercedes-Benz", "Audi", "Jaguar"
  ];

  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
  const transmissions = ["Manual", "Automatic", "AMT", "CVT", "DCT"];
  const bodyTypes = ["Hatchback", "Sedan", "SUV", "Compact SUV", "MUV", "Coupe", "Convertible"];
  const ownerships = ["2nd Owner", "3rd Owner"];
  const insurances = ["Comprehensive", "Third Party", "Zero Dep", "Expired", "No Insurance"];

  return (
    <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
      
      {/* Shared Admin Sidebar */}
      <AdminSidebar activeTab="manage" />

      {/* Main Content Area */}
      <section className="grow flex flex-col overflow-y-auto">
        
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-white pl-12 md:pl-0">Edit Vehicle Details</h1>
          <span className="text-xs text-gray-500 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg uppercase">
            Edit Mode ({type})
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
                    placeholder="e.g. Suzuki Swift VXi"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Cover Image Upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Cover Image (Single)</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/1 hover:bg-white/2 transition cursor-pointer group h-48">
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
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/1 hover:bg-white/2 transition cursor-pointer group h-48">
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

                {/* Video Walk-around Upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Walk-around Video (Optional)</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/1 hover:bg-white/2 transition cursor-pointer group h-48">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {videoPreview ? (
                      <div className="w-full h-full relative">
                        <video src={videoPreview} className="w-full h-full object-cover rounded-xl border border-white/10" muted controls />
                        <button
                          type="button"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoPreview("");
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-400 transition"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <FaUpload className="text-gray-500 group-hover:text-white transition duration-300 mx-auto" size={24} />
                        <p className="text-xs font-bold text-gray-400">Upload Video</p>
                        <p className="text-[9px] text-gray-600">Video walk-around (*.mp4, *.mov)</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Gallery Previews Grid */}
              {galleryItems.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">Gallery Previews ({galleryItems.length})</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-gray-900">
                        <img src={item.url} className="w-full h-full object-cover" alt="" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(item.id)}
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
                onClick={() => navigate("/admin/manage-cars")}
                className="px-6 py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 bg-white text-gray-955 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-150 active:scale-[0.98] transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>

        </div>

      </section>

    </main>
  );
};

export default EditCar;
