import axios from 'axios';

export const getAllCategoryDetails = async (token) => {
    try {
      const response = await axios.get("http://localhost:4001/api/category/category",  {
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