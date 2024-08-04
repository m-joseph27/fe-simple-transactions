import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getCustomers = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/customers${query}`);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/customers${id}`);
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`${API_BASE_URL}/customers/${id}`, customer);
  return response.data;
};

export const postCustomer = async (customer) => {
  const response = await axios.post(`${API_BASE_URL}/customers`, customer);
  return response.data;
};