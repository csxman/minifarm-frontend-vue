import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneSprayType = () => {
  return httpClient.get(server.CaneSprayType + `/get`);
};

export const addCaneSprayType = (data) => {
  return httpClient.post(server.CaneSprayType, data);
};

export const updateCaneSprayType = (id, data) => {
  return httpClient.put(server.CaneSprayType + `/${id}`, data);
};

export const deleteCaneSprayType = (id) => {
  return httpClient.delete(server.CaneSprayType + `/${id}`);
};
