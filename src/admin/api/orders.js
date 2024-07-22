import axios from "axios";

export const getAllOrders = async (token) => {
  try {
    const response = await axios.get("http://localhost:4001/api/admin/order", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicatio.json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
