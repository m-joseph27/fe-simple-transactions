import axios from "axios";

const baseURL = axios.create({
  baseURL: 'http://localhost:3000/transactions',
});

export const getTransactions = async (endpoint) => {
  try {
    const response = await baseURL.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const postTransaction = async (endpoint, transaction) => {
  try {
    const response = await baseURL.post(endpoint, transaction);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const updateTransaction = async (endpoint, id, transaction) => {
  try {
    const response = await baseURL.put(endpoint, id, transaction);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const deleteTransaction = async (endpoint, id) => {
  try {
    const response = await baseURL.delete(endpoint, id);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}