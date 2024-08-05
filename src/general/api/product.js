import axios from "axios";
import { MIDDLEWARE_API_URL } from "../../constants";

export const getAllProductDetails = async () => {
  try {
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/products/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const getProductDetailsByID = async (id) => {
  try {
    const response = await axios.get(
      `${MIDDLEWARE_API_URL}/api/products/id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
