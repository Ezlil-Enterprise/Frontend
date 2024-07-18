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
