import axios from "axios";
import { MIDDLEWARE_API_URL } from "../../constants";

export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(`${MIDDLEWARE_API_URL}/api/admin/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicatio.json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderByID = async (token, id) => {
  try {
    const response = await axios.delete(
      `${MIDDLEWARE_API_URL}/api/admin/order/${id}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "applicatio.json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
