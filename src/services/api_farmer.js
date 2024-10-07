import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getFARMER = () => {
  return httpClient.get(server.FARMER + `/get`);
};

export const addFARMER = (data) => {
  return httpClient.post(server.FARMER, data);
};

export const updateFARMER = (id, data) => {
  return httpClient.put(server.FARMER + `/${id}`, data);
};

export const deleteFARMER = (id) => {
  return httpClient.delete(server.FARMER + `/${id}`);
};
