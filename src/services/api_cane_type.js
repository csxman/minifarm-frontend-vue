import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneType = () => {
  return httpClient.get(server.CANE_TYPE + `/get`);
};

export const addCaneType = (data) => {
  return httpClient.post(server.CANE_TYPE, data);
};

export const updateCaneType = (id, data) => {
  return httpClient.put(server.CANE_TYPE + `/${id}`, data);
};

export const deleteCaneType = (id) => {
  return httpClient.delete(server.CANE_TYPE + `/${id}`);
};
