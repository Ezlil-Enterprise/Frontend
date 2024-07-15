import axios from "axios";
export const getCartDetails = async (token) => {
    
  try {
    const response =await axios.get("http://localhost:4001/api/cart/",{
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
export const addCartDetails = async (token,values) => {
    console.log(values);
    try {
      const response =await axios.put("http://localhost:4001/api/cart/add",values,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
  
      });
      return response.data;
    } catch (error) {
      console.error("Error adding cart details:", error);
      throw error;
    }
  };