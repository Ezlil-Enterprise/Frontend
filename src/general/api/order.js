import axios from "axios";

export const placeOrder = async (token, { addressData }) => {
  console.log(addressData);
  try {
    const response = await axios.post(
      "http://localhost:4001/api/order/",
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error;
  }
};
export const orderHistory = async (token) => {
  try {
    const response = await axios.get("http://localhost:4001/api/order/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error;
  }
};
