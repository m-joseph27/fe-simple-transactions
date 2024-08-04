import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getItems = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/items${query}`);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/items${id}`);
  return response.data;
};

export const updateItem = async (id, customer) => {
  const response = await axios.put(`${API_BASE_URL}/items/${id}`, customer);
  return response.data;
};

export const postItem = async (customer) => {
  const response = await axios.post(`${API_BASE_URL}/items`, customer);
  return response.data;
};