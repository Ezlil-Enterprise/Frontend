import axios from "axios";

export const getAllCategoryDetails = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:4001/api/category/",
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
export const addCategory = async (token, values) => {
  try {
    const response = await axios.post(
      "http://localhost:4001/api/category",
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
      `http://localhost:4001/api/category/${id}`,
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
