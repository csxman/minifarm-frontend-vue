import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAccounts = () => {
  return httpClient.get(server.ACCOUNT_URL + `/get`);
};

export const updateAccountPass = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/${id}`, data);
};

export const updateUserAccount = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/updateUserAccount/${id}`, data);
};

export const deleteUserAccount = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/deleteUserAccount/${id}`, data);
};

export const getAuthorize = (id, router_path) => {
  return httpClient.get(
    server.ACCOUNT_URL + `/getAuthorize/${id}/${router_path}`
  );
};

export const createAccount = (data) => {
  return httpClient.post(server.ACCOUNT_URL + "/register", data);
};

export const addUserAccount = (data) => {
  return httpClient.post(server.ACCOUNT_URL + "/addUserAccount", data);
};

export const deleteAccount = (id) => {
  return httpClient.delete(server.ACCOUNT_URL + `/${id}`);
};

export const getAccountDetail = (id) => {
  return httpClient.get(server.ACCOUNT_URL + `/${id}`);
};
