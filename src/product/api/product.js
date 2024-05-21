import axios from 'axios';

export const getProductDetails = async () => {
    try {
        const response = await axios.get('http://localhost:4001/');
        return response.data;
    } catch (error) {
        if (error.response) {
          
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // No response was received
            console.error('Error request:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        throw error;
    }
};
