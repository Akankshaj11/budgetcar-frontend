import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FaArrowLeft, FaUpload, FaTrash, FaFilePdf, FaFileImage, 
  FaCheck, FaTimes, FaSpinner, FaCar, FaEdit, FaCheckCircle, FaFile,
  FaShareAlt, FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope, FaCopy
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

  // Share States
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Document Upload States
  const [docFile, setDocFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

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
    if (!docName) {
      // Default doc name to file name without extension
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      setDocName(nameWithoutExt);
    }
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
      setDocName("");
      
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

  // Safe fallback placeholder image URL
  const placeholderImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'><rect width='100%' height='100%' fill='%231a1a1e'/><text x='50%' y='55%' font-size='8' font-family='sans-serif' font-weight='bold' fill='%23444' dominant-baseline='middle' text-anchor='middle'>NO IMAGE</text></svg>";

  if (loading) {
    return (
      <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
        <AdminSidebar activeTab="manage" />
        <section className="grow flex flex-col justify-center items-center">
          <FaSpinner className="animate-spin text-white text-3xl mb-4" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Loading car profile...</p>
        </section>
      </main>
    );
  }

  if (!car) return null;

  const editRoute = car.isDiscount ? `/admin/edit-car/deal/${car.id}` : `/admin/edit-car/car/${car.id}`;
  const carStatus = car.status || "Neutral";

  return (
    <main className="h-screen bg-[#070709] text-gray-300 flex overflow-hidden">
      
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
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 active:scale-[0.98] transition cursor-pointer"
            >
              <FaShareAlt size={12} />
              Share Profile
            </button>
            <button 
              onClick={() => navigate(editRoute)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-955 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-150 active:scale-[0.98] transition cursor-pointer"
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
              <div className="p-6 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
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
                  <div key={index} className="space-y-1 bg-white/[0.01] border border-white/[0.03] p-3.5 rounded-2xl">
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
                  <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center bg-white/2 hover:bg-white/3 transition cursor-pointer group min-h-[120px]">
                    <input
                      type="file"
                      accept="application/pdf, image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      required
                    />
                    {docFile ? (
                      <div className="text-center p-2">
                        {docFile.type.includes("pdf") ? (
                          <FaFilePdf size={24} className="text-red-400 mx-auto mb-2 animate-bounce" />
                        ) : (
                          <FaFileImage size={24} className="text-blue-400 mx-auto mb-2 animate-bounce" />
                        )}
                        <p className="text-xs font-bold text-white truncate max-w-[200px]">{docFile.name}</p>
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
                  <input
                    type="text"
                    required
                    placeholder="e.g. Registration Certificate (RC)"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#070709] border border-white/6 rounded-xl text-white outline-none focus:border-white/20 transition"
                  />
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
                  disabled={isUploading || !docFile}
                  className="w-full py-3 bg-white text-gray-955 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-gray-150 active:scale-[0.98] transition cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
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
                      className="flex items-center justify-between bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 hover:bg-white/[0.02] transition"
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
                          <p className="text-xs font-bold text-white truncate max-w-[130px]" title={docItem.name}>
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
                        <a 
                          href={docItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider hover:bg-white/10 hover:text-white transition duration-200"
                        >
                          View
                        </a>
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
                  <div className="text-center py-6 bg-white/[0.01] border border-dashed border-white/5 rounded-2xl">
                    <p className="text-xs text-gray-550 font-medium">No documents uploaded yet.</p>
                    <p className="text-[9px] text-gray-600 mt-1">Upload files to save in this car's record.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </section>

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
            
            <h3 className="text-lg font-extrabold text-gray-950 mb-2">Share this Car</h3>
            <p className="text-xs text-gray-550 mb-4 font-medium">Share the details of {car.name} with others.</p>
            
            {/* Social Share Icons Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {/* WhatsApp */}
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this ${car.name} profile on BudgetCarHub: ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center cursor-pointer"
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
                className="flex flex-col items-center gap-1 group text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition duration-300">
                  <FaFacebook size={16} />
                </div>
                <span className="text-[9px] font-bold text-gray-500">Facebook</span>
              </a>

              {/* X */}
              <a 
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out the vehicle profile for ${car.name}!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black transition duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <span className="text-[9px] font-bold text-gray-500">X</span>
              </a>

              {/* Twitter */}
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out the vehicle profile for ${car.name}!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#e8f5fe] text-[#1DA1F2] flex items-center justify-center group-hover:bg-[#d4edfe] transition duration-300">
                  <FaTwitter size={16} />
                </div>
                <span className="text-[9px] font-bold text-gray-500">Twitter</span>
              </a>

              {/* Email */}
              <a 
                href={`mailto:?subject=${encodeURIComponent(`Vehicle Profile: ${car.name}`)}&body=${encodeURIComponent(`Hi,\n\nI wanted to share the vehicle profile for the ${car.name}.\n\nLink: ${window.location.href}`)}`}
                className="flex flex-col items-center gap-1 group text-center cursor-pointer"
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
                className="absolute right-1 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-[10px] font-extrabold uppercase tracking-wider transition cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default CarProfile;
