const axios = require("axios");
export const userSignup = async (formData) => {
  try {
    const response = await axios.post(
      " http://localhost:4001/api/user/signup",
      formData
    );
    return response;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export const userSignin = async (formData) => {
  try {
    const response = await axios.post(
      " http://localhost:4001/api/user/login",
      formData
    );
    return response;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
