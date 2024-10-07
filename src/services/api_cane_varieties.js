import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneVarieties = () => {
  return httpClient.get(server.CANE_VARIETIES + `/get`);
};

export const addCaneVarieties = (data) => {
  return httpClient.post(server.CANE_VARIETIES, data);
};

export const updateCaneVarieties = (id, data) => {
  return httpClient.put(server.CANE_VARIETIES + `/${id}`, data);
};

export const deleteCaneVarieties = (id) => {
  return httpClient.delete(server.CANE_VARIETIES + `/${id}`);
};
