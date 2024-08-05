import axios from "axios";
import { MIDDLEWARE_API_URL } from "../../constants";

export const getAllCategoryDetails = async (token) => {
  try {
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/category/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const addCategory = async (token, values) => {
  try {
    const response = await axios.post(
      `${MIDDLEWARE_API_URL}/api/category`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const deleteCategory = async (token, id) => {
  try {
    const response = await axios.delete(
      `${MIDDLEWARE_API_URL}/api/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
