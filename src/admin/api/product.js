const axios = require("axios");

export const getAllProductDetails = async () => {
  try {
    const response = await axios.get("http://localhost:4001/api/products/");
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const getProductDetailsByID = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4001/api/products/id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const addProductData = async (formData) => {
  try {
   
    const response = await axios.post(
      "http://localhost:4001/api/admin/products/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const updateProductDetails = async (id, values,token) => {
 
  try {
    const response = await axios.put(
      `http://localhost:4001/api/admin/products/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const deleteProductByID = async (id,token) => {
  try {
    const response = await axios.delete(
      `http://localhost:4001/api/admin/products/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
