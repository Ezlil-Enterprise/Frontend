import axios from "axios";
export const getCartDetails = async (token) => {
  try {
    const response = await axios.get("http://localhost:4001/api/cart/", {
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
export const addCartDetails = async (token, values) => {
  const data = {
    productId: values._id,
  };

  try {
    const response = await axios.put(
      "http://localhost:4001/api/cart/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding cart details:", error);
    throw error;
  }
};

export const updateCartItems = async (token, id, values) => {
  try {
    const response = await axios.put(
      `http://localhost:4001/api/cartitem/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting cart details:", error);
    throw error;
  }
};

export const deleteCartItems = async (token, id) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `http://localhost:4001/api/cartitem/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting cart details:", error);
    throw error;
  }
};
