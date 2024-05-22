const axios = require('axios');

export const getProductDetails = async () => {
    try {
        const response = await axios.get('http://localhost:4001/api/products/');
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};
export const addProductData = async(formData)=>{
    try{
        const response = await axios.post(
            "http://localhost:4001/api/products/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.data; 
    }
    catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
}