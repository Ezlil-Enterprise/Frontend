const axios = require("axios");
import { MIDDLEWARE_API_URL } from "../../constants";

export const userSignup = async (formData) => {
  try {
    const response = await axios.post(
      `${MIDDLEWARE_API_URL}/auth/signup`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error adding user details:", error);
    throw error;
  }
};
export const userSignin = async (formData) => {
  try {
    const response = await axios.post(
      `${MIDDLEWARE_API_URL}/auth/signin`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(
      `${MIDDLEWARE_API_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
export const getUserDetailsByID = async (id) => {
  try {
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
