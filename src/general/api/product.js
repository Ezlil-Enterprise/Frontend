import axios from "axios";
export const getAllProductDetails = async () => {
  try {
    const response = await axios.get("http://localhost:4001/api/products/");
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
