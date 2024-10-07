import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneOwner = () => {
  return httpClient.get(server.CaneOwner + `/get`);
};

export const addCaneOwner = (data) => {
  return httpClient.post(server.CaneOwner, data);
};

export const updateCaneOwner = (id, data) => {
  return httpClient.put(server.CaneOwner + `/${id}`, data);
};

export const deleteCaneOwner = (id) => {
  return httpClient.delete(server.CaneOwner + `/${id}`);
};
