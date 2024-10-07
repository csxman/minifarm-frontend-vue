import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCustomers = () => {
  return httpClient.get(server.CUSTOMER_URL + `/get`);
};

export const getAllCustomerList = () => {
  return httpClient.get(server.CUSTOMER_URL + `/getAllCustomerList`);
};

export const addCustomer = (data) => {
  return httpClient.post(server.CUSTOMER_URL + `/addCustomer`, data);
};

export const updateCustomer = (id, data) => {
  return httpClient.put(server.CUSTOMER_URL + `/${id}`, data);
};

export const createCustomer = (data) => {
  return httpClient.post(server.CUSTOMER_URL, data);
};

export const deleteCustomer = (id) => {
  return httpClient.delete(server.CUSTOMER_URL + `/${id}`);
};
