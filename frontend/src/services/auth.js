import axios from 'axios';

const API = 'https://fundora-backend-iqz6.onrender.com/api/auth/';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API}register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API}login`, userData,{
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Required when using res.cookie in backend
  });
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

