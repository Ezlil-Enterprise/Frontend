import axios from "axios";
import { MIDDLEWARE_API_URL } from "../../constants";

export const placeOrder = async (token, { addressData }, payment_id) => {
  try {
    const response = await axios.post(
      `${MIDDLEWARE_API_URL}/api/order/`,
      {
        paymentId: payment_id,
        addressData: addressData || userData.address,
      },
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
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/order/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error;
  }
};
