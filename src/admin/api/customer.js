const axios = require("axios");

export const getCustomerDetails = async () => {
  try {
    const response = await axios.get("http://localhost:4001/api/users/");
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
export const getCustomerDetailsByID = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4001/api/customers/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
export const addCustomerData = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4001/auth/signup",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
export const updateCustomerDetails = async (id, values) => {
  try {
    const response = await axios.patch(
      `http://localhost:4001/api/customers/${id}`,
      values
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
export const deleteCustomerByID = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4001/api/customers/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
