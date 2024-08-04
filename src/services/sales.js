import axios from "axios";

const baseURL = axios.create({
  baseURL: 'http://localhost:3000/sales',
});

export const getSales = async (endpoint) => {
  try {
    const response = await baseURL.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const postSale = async (endpoint, sale) => {
  try {
    const response = await baseURL.post(endpoint, sale);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}