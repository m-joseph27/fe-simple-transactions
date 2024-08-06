import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getTransactions = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/transactions${query}`);
  return response.data;
};

export const deleteTransactions = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/transactions${id}`);
  return response.data;
};

export const updateTransactions = async (id, customer) => {
  const response = await axios.put(`${API_BASE_URL}/transactions/${id}`, customer);
  return response.data;
};

export const postTransactions = async (customer) => {
  const response = await axios.post(`${API_BASE_URL}/transactions`, customer);
  return response.data;
};