import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneActivity = () => {
  return httpClient.get(server.CaneActivity + `/get`);
};

export const addCaneActivity = (data) => {
  return httpClient.post(server.CaneActivity, data);
};

export const updateCaneActivity = (id, data) => {
  return httpClient.put(server.CaneActivity + `/${id}`, data);
};

export const deleteCaneActivity = (id) => {
  return httpClient.delete(server.CaneActivity + `/${id}`);
};
