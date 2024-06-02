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

export const getUserDetailsByEmail = async (userEmail) => {
  
  try {
    const response = await axios.get(
      `http://localhost:4001/api/customers/email/${userEmail}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; 
  }
};