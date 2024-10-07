import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getUserType = () => {
  return httpClient.get(server.UserType + `/get`);
};

export const addUserType = (data) => {
  return httpClient.post(server.UserType, data);
};

export const updateUserType = (id, data) => {
  return httpClient.put(server.UserType + `/${id}`, data);
};

export const deleteUserType = (id) => {
  return httpClient.delete(server.UserType + `/${id}`);
};
