const axios = require("axios");
export const userSignup = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4001/auth/signup",
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
      "http://localhost:4001/auth/signin",
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
      "http://localhost:4001/api/users/profile",
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
