import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCanePlowType = () => {
  return httpClient.get(server.CanePlowType + `/get`);
};

export const addCanePlowType = (data) => {
  return httpClient.post(server.CanePlowType, data);
};

export const updateCanePlowType = (id, data) => {
  return httpClient.put(server.CanePlowType + `/${id}`, data);
};

export const deleteCanePlowType = (id) => {
  return httpClient.delete(server.CanePlowType + `/${id}`);
};
