import axios from "axios";

export const uploadFile = async (file) => {
  if (!file) return "";
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const isVideo = file.type && file.type.startsWith("video");
  const resourceType = isVideo ? "video" : "image";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    console.error(`Cloudinary ${resourceType} upload error:`, err);
    return "";
  }
};

// Maintain alias for backward compatibility
export const uploadImage = uploadFile;