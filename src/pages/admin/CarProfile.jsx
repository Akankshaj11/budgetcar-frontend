import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FaArrowLeft, FaUpload, FaTrash, FaFilePdf, FaFileImage, 
  FaCheck, FaTimes, FaSpinner, FaCar, FaEdit, FaCheckCircle, FaFile,
  FaShareAlt, FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope, FaCopy, FaEye
} from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadFile } from "../../services/cloudinary";

const CarProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState(() => localStorage.getItem("admin-theme") || "light");

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("admin-theme") || "light");
    };
    window.addEventListener("admin-theme-changed", handleThemeChange);
    return () => window.removeEventListener("admin-theme-changed", handleThemeChange);
  }, []);

  // Document Upload States
  const [docFile, setDocFile] = useState(null);
  const [docName, setDocName] = useState("RC");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Document Preview & Share States
  const [previewDoc, setPreviewDoc] = useState(null);
  const [copiedDocId, setCopiedDocId] = useState("");

  // Sync dynamic document default option
  useEffect(() => {
    if (car?.documents) {
      const allDocOptions = ["RC", "Aadhar", "Pan", "Insurance", "Bank noc", "form 29", "form 30", "puc"];
      const existingDocNames = (car.documents || []).map(d => d.name);
      const remaining = allDocOptions.filter(opt => !existingDocNames.includes(opt));
      if (remaining.length > 0) {
        setDocName(remaining[0]);
      } else {
        setDocName("");
      }
    }
  }, [car?.documents]);

  // Status updating state and handler
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (!car) return;
    setIsUpdatingStatus(true);
    try {
      await updateDoc(doc(db, "cars", car.id), {
        status: newStatus
      });
      setCar(prev => ({
        ...prev,
        status: newStatus
      }));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const loadCar = async () => {
    try {
      setLoading(true);
      const snap = await getDoc(doc(db, "cars", id));
      if (snap.exists()) {
        setCar({
          id: snap.id,
          ...snap.data(),
        });
      } else {
        alert("Vehicle not found.");
        navigate("/admin/manage-cars");
      }
    } catch (err) {
      console.error("Error loading vehicle profile:", err);
      alert("Failed to load vehicle profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadCar();
    }
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type (image or pdf)
    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file format. Only PDF and Images (JPEG, PNG, GIF, WebP) are accepted.");
      setDocFile(null);
      return;
    }

    setUploadError("");
    setDocFile(file);
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!docFile || !car) return;

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const secureUrl = await uploadFile(docFile);
      if (!secureUrl) {
        throw new Error("Cloudinary returned empty URL");
      }

      const fileType = docFile.type.includes("pdf") ? "pdf" : "image";
      const newDocObj = {
        id: Math.random().toString(36).substr(2, 9),
        name: docName.trim() || docFile.name,
        url: secureUrl,
        type: fileType,
        uploadedAt: new Date().toISOString()
      };

      const updatedDocs = [...(car.documents || []), newDocObj];

      // Update in Firestore
      await updateDoc(doc(db, "cars", car.id), {
        documents: updatedDocs
      });

      // Update local state
      setCar(prev => ({
        ...prev,
        documents: updatedDocs
      }));

      setUploadSuccess("Document uploaded successfully!");
      setDocFile(null);
      setDocName("RC");
      
      // Clear success message after 3s
      setTimeout(() => setUploadSuccess(""), 3000);

    } catch (err) {
      console.error("Error uploading document:", err);
      setUploadError("Failed to upload document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (!car) return;
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const updatedDocs = (car.documents || []).filter(d => d.id !== docId);

      // Update in Firestore
      await updateDoc(doc(db, "cars", car.id), {
        documents: updatedDocs
      });

      // Update local state
      setCar(prev => ({
        ...prev,
        documents: updatedDocs
      }));
    } catch (err) {
      console.error("Error deleting document:", err);
      alert("Failed to delete document.");
    }
  };

  const handleShareDocument = async (docItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${docItem.name} - BudgetCarHub`,
          text: `View document: ${docItem.name}`,
          url: docItem.url
        });
        return;
      } catch (e) {
        console.log("Navigator share failed, falling back to copy", e);
      }
    }
    // Fallback to copy link
    navigator.clipboard.writeText(docItem.url);
    setCopiedDocId(docItem.id);
    setTimeout(() => setCopiedDocId(""), 2000);
  };

  // Safe fallback placeholder image URL
  const placeholderImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='100%' height='100%' fill='%231a1a1e'/><text x='50%' y='55%' font-size='8' font-family='sans-serif' font-weight='bold' fill='%23444' dominant-baseline='middle' text-anchor='middle'>NO IMAGE</text></svg>";

  if (loading) {
    return (
      <main className={`admin-panel theme-${theme} h-screen bg-[#070709] text-gray-300 flex overflow-hidden`}>
        <AdminSidebar activeTab="manage" />
        <section className="grow flex flex-col justify-center items-center">
          <FaSpinner className="animate-spin text-gray-400 text-3xl mb-4" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Loading car profile...</p>
        </section>
      </main>
    );
  }

  if (!car) return null;

  const editRoute = car.isDiscount ? `/admin/edit-car/deal/${car.id}` : `/admin/edit-car/car/${car.id}`;
  const carStatus = car.status || "Neutral";

  const allDocOptions = ["RC", "Aadhar", "Pan", "Insurance", "Bank noc", "form 29", "form 30", "puc"];
  const existingDocNames = (car?.documents || []).map(d => d.name);
  const availableDocOptions = allDocOptions.filter(opt => !existingDocNames.includes(opt));

  return (
    <main className={`admin-panel theme-${theme} h-screen bg-[#070709] text-gray-300 flex overflow-hidden`}>
      
      {/* Shared Admin Sidebar */}
      <AdminSidebar activeTab="manage" />

      {/* Main Content Area */}
      <section className="grow flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="min-h-20 border-b border-white/5 px-6 md:px-8 py-4 md:py-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 pl-12 md:pl-0">
            <button 
              onClick={() => navigate("/admin/manage-cars")}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer"
              title="Back to Inventory"
            >
              <FaArrowLeft size={12} />
            </button>
            <div>
              <h1 className="text-md font-bold text-white leading-tight flex items-center gap-2">
                {car.name}
                {carStatus.toLowerCase() === "transferred" ? (
                  <span className="text-[9px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-1.5 py-0.5 rounded uppercase">Transferred</span>
                ) : carStatus.toLowerCase() === "processing" ? (
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded uppercase">Processing</span>
                ) : (
                  <span className="text-[9px] font-bold text-gray-400 bg-gray-400/10 border border-gray-400/20 px-1.5 py-0.5 rounded uppercase">Neutral</span>
                )}
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{car.brand} • {car.variant || "Base"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button 
              onClick={() => navigate(editRoute)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-150 active:scale-[0.98] transition cursor-pointer"
            >
              <FaEdit size={12} />
              Edit Car
            </button>
          </div>
        </header>

        {/* Profile Grid Container */}
        <div className="p-4 md:p-8 max-w-7xl grow grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: VEHICLE DETAILS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Cover Image & Price */}
            {/* <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden shadow-xl"> */}
            <div className="bg-white/2 border border-white/6 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-64 md:h-80 bg-gray-950">
                <img 
                  src={car.image || car.coverImage} 
                  className="w-full h-full object-cover" 
                  alt={car.name}
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = placeholderImage; 
                  }} 
                />
                <span className="absolute top-4 left-4 bg-[#070709]/80 border border-white/10 px-3 py-1 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest">
                  {car.badge || "Certified"}
                </span>
                {car.isDiscount && (
                  <span className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest">
                    Discount Deal
                  </span>
                )}
              </div>
              <div className="p-6 flex items-center justify-between border-t border-white/5 bg-white/1">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Selling Price</p>
                  <h2 className="text-2xl font-black text-white mt-1">
                    ₹{typeof car.price === "number" ? car.price.toLocaleString("en-IN") : car.price}
                  </h2>
                </div>
                {car.isDiscount && car.original && (
                  <div className="text-right">
                    <p className="text-[10px] text-gray-550 font-bold uppercase tracking-wider line-through">Original: ₹{car.original.toLocaleString("en-IN")}</p>
                    <p className="text-red-400 font-bold text-xs mt-0.5">Savings: ₹{car.savings.toLocaleString("en-IN")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
                <FaCar className="text-white/60" size={14} /> Technical Specifications
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: "Brand", value: car.brand },
                  { label: "Model", value: car.model },
                  { label: "Variant", value: car.variant || "-" },
                  { label: "Year", value: car.year },
                  { label: "KM Driven", value: car.kms },
                  { label: "Fuel Type", value: car.fuel },
                  { label: "Transmission", value: car.transmission },
                  { label: "Body Type", value: car.bodyType },
                  { label: "Ownership", value: car.owner },
                  { label: "Color", value: car.colorName || "-" },
                  { label: "Registration City", value: car.registrationCity || "-" },
                  { label: "Insurance Type", value: car.insurance },
                  { label: "Car Status (Customer)", value: car.carStatus || "Available" },
                  { label: "Admin Status", value: carStatus, isStatus: true },
                ].map((spec, index) => (
                  <div key={index} className="space-y-1 bg-white/1 border border-white/3 p-3.5 rounded-2xl">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">{spec.label}</span>
                    {spec.isStatus ? (
                      <div className="relative mt-1">
                        <select
                          value={spec.value}
                          disabled={isUpdatingStatus}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          className="w-full bg-[#070709] border border-white/10 rounded-xl px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-white/20 transition cursor-pointer uppercase"
                        >
                          <option value="Neutral">Neutral</option>
                          <option value="Processing">Processing</option>
                          <option value="Transferred">Transferred</option>
                        </select>
                        {isUpdatingStatus && (
                          <span className="absolute right-2 top-1.5">
                            <FaSpinner className="animate-spin text-white" size={10} />
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="block text-xs font-bold text-white">{spec.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Admin Secure Area: Registration Number */}
              <div className="border border-white/10 bg-white/2 rounded-2xl p-4 mt-4">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-red-400/80 mb-1">
                  🔒 Admin Security Section
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Registration Number</span>
                  <span className="text-sm font-black text-white tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg select-all">
                    {car.registrationNumber || "NOT SPECIFIED"}
                  </span>
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div className="pt-4 border-t border-white/5">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-2">Seller Description</span>
                  <p className="text-xs text-gray-400 bg-[#070709]/50 border border-white/5 rounded-2xl p-4 leading-relaxed whitespace-pre-line">
                    {car.description}
                  </p>
                </div>
              )}
            </div>

            {/* Included Features */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
                Features & Highlights ({car.features?.length || 0})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {car.features && car.features.length > 0 ? (
                  car.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                      <FaCheckCircle className="text-green-500 shrink-0" size={12} />
                      <span>{feat}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 col-span-full py-2">No special features recorded.</p>
                )}
              </div>
            </div>

            {/* Gallery Images & Video */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
                Vehicle Media
              </h3>
              {/* Walk-around Video */}
              {car.video && (
                <div className="space-y-2">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">Walk-around Video</span>
                  <div className="max-w-xl rounded-2xl overflow-hidden bg-black border border-white/10 relative h-64 mx-auto">
                    <video 
                      src={car.video} 
                      className="w-full h-full object-cover" 
                      controls 
                      playsInline 
                      muted
                    />
                  </div>
                </div>
              )}

              {/* Gallery Images Grid */}
              <div className="space-y-3">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">Gallery Photos ({(car.gallery || []).length})</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(car.gallery || []).map((img, index) => (
                    <a key={index} href={img} target="_blank" rel="noopener noreferrer" className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-gray-900 cursor-zoom-in block">
                      <img src={img} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                        <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded-md uppercase">Enlarge</span>
                      </div>
                    </a>
                  ))}
                  {(car.gallery || []).length === 0 && (
                    <p className="text-xs text-gray-500 col-span-full py-4 text-center">No gallery photos uploaded.</p>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DOCUMENTS SECTION */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Upload Document Form */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
                <FaUpload className="text-white/60" size={14} /> Add Document
              </h3>

              <form onSubmit={handleUploadDocument} className="space-y-4">
                {/* File Upload Selector */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">Select File (Image or PDF) *</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center bg-white/2 hover:bg-white/3 transition cursor-pointer group min-h-30 disabled:opacity-50">
                    <input
                      type="file"
                      accept="application/pdf, image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      required
                      disabled={availableDocOptions.length === 0}
                    />
                    {availableDocOptions.length === 0 ? (
                      <div className="text-center space-y-1">
                        <FaCheckCircle className="text-green-500 mx-auto" size={18} />
                        <p className="text-xs font-bold text-gray-400">All documents uploaded</p>
                      </div>
                    ) : docFile ? (
                      <div className="text-center p-2">
                        {docFile.type.includes("pdf") ? (
                          <FaFilePdf size={24} className="text-red-400 mx-auto mb-2 animate-bounce" />
                        ) : (
                          <FaFileImage size={24} className="text-blue-400 mx-auto mb-2 animate-bounce" />
                        )}
                        <p className="text-xs font-bold text-white truncate max-w-50">{docFile.name}</p>
                        <p className="text-[9px] text-gray-500 font-medium">{(docFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-1">
                        <FaUpload className="text-gray-500 group-hover:text-white transition duration-300 mx-auto" size={18} />
                        <p className="text-xs font-bold text-gray-400">Click or Drag File</p>
                        <p className="text-[8px] text-gray-650 font-bold uppercase tracking-wider">PDF, PNG, JPG</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Name input */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-500">Document Label / Name *</label>
                  {availableDocOptions.length === 0 ? (
                    <div className="w-full px-4 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-gray-500">
                      No additional categories available.
                    </div>
                  ) : (
                    <select
                      required
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-[#070709] border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition cursor-pointer"
                    >
                      {availableDocOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>

                {uploadError && (
                  <p className="text-[10px] text-red-400 font-semibold bg-red-400/5 border border-red-400/10 p-2.5 rounded-xl">
                    {uploadError}
                  </p>
                )}

                {uploadSuccess && (
                  <p className="text-[10px] text-green-400 font-semibold bg-green-400/5 border border-green-400/10 p-2.5 rounded-xl flex items-center gap-1.5">
                    <FaCheck /> {uploadSuccess}
                  </p>
                )}

                {/* Action button */}
                <button
                  type="submit"
                  disabled={isUploading || !docFile || availableDocOptions.length === 0}
                  className="w-full py-3 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-150 active:scale-[0.98] transition cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <FaSpinner className="animate-spin" size={12} />
                      Uploading File...
                    </>
                  ) : (
                    <>
                      <FaUpload size={12} />
                      Upload to Profile
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* List of Documents */}
            <div className="bg-white/2 border border-white/6 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/5">
                Uploaded Documents ({(car.documents || []).length})
              </h3>
              
              <div className="space-y-3">
                {(car.documents || []).length > 0 ? (
                  (car.documents || []).map((docItem) => (
                    <div 
                      key={docItem.id} 
                      className="flex items-center justify-between bg-white/1 border border-white/3 rounded-2xl p-3.5 hover:bg-white/2 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="shrink-0 p-2 rounded-xl bg-white/5 border border-white/10">
                          {docItem.type === "pdf" ? (
                            <FaFilePdf className="text-red-400" size={16} />
                          ) : docItem.type === "image" ? (
                            <FaFileImage className="text-blue-400" size={16} />
                          ) : (
                            <FaFile className="text-gray-400" size={16} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate max-w-32.5" title={docItem.name}>
                            {docItem.name}
                          </p>
                          <span className="block text-[8px] text-gray-550 font-bold uppercase tracking-wider mt-0.5">
                            {docItem.uploadedAt ? new Date(docItem.uploadedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            }) : "N/A"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Preview button */}
                        <button
                          onClick={() => setPreviewDoc(docItem)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition duration-200 cursor-pointer"
                          title="Preview Document"
                        >
                          <FaEye size={11} />
                        </button>

                        {/* Share button */}
                        <button
                          onClick={() => handleShareDocument(docItem)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition duration-200 cursor-pointer flex items-center justify-center min-w-7"
                          title="Share / Copy Link"
                        >
                          {copiedDocId === docItem.id ? (
                            <FaCheck className="text-green-400" size={10} />
                          ) : (
                            <FaShareAlt size={10} />
                          )}
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteDocument(docItem.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition duration-250 cursor-pointer"
                          title="Delete Document"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-white/1 border border-dashed border-white/3 rounded-2xl">
                    <p className="text-xs text-gray-550 font-medium">No documents uploaded yet.</p>
                    <p className="text-[9px] text-gray-600 mt-1">Upload files to save in this car's record.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-70 flex items-center justify-center p-4">
          <div className="bg-[#0f0f12] border border-white/10 rounded-3xl p-6 max-w-4xl w-full relative animate-in fade-in zoom-in-95 duration-200 shadow-2xl flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setPreviewDoc(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <FaTimes size={16} />
            </button>
            
            <h3 className="text-md font-bold text-white uppercase tracking-wider mb-1 pr-10">
              Document Preview: {previewDoc.name}
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-4">
              Uploaded on {previewDoc.uploadedAt ? new Date(previewDoc.uploadedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) : "N/A"}
            </p>
            
            <div className="grow overflow-y-auto flex items-center justify-center p-2 bg-[#070709] rounded-2xl border border-white/5 min-h-75">
              {previewDoc.type === "pdf" ? (
                <iframe 
                  src={previewDoc.url} 
                  className="w-full h-[60vh] rounded-xl bg-white border-0" 
                  title={previewDoc.name}
                />
              ) : (
                <img 
                  src={previewDoc.url} 
                  className="max-w-full max-h-[60vh] rounded-xl object-contain" 
                  alt={previewDoc.name} 
                />
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <a 
                href={previewDoc.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Open in new tab
              </a>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-white text-gray-900 hover:bg-gray-150 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default CarProfile;
