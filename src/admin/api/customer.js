const axios = require("axios");
import { MIDDLEWARE_API_URL } from "../../constants";

export const getCustomerDetails = async () => {
  try {
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
export const getCustomerDetailsByID = async (id) => {
  try {
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
export const addCustomerData = async (formData) => {
  try {
    const response = await axios.post(
      `${MIDDLEWARE_API_URL}/auth/signup`,
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
    const response = await axios.put(
      `${MIDDLEWARE_API_URL}/api/users/${id}`,
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
      `${MIDDLEWARE_API_URL}/api/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};
