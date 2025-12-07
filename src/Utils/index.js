import axios from "axios";

export const uploadImageToImgBB = async (imgFile) => {
  const formData = new FormData();
  formData.append("image", imgFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API_KEY}`,
      formData
    );

 
    return response.data.data.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
