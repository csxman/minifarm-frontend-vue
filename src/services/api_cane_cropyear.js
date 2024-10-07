import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneCropyear = () => {
  return httpClient.get(server.CaneCropyear + `/get`);
};

export const addCaneCropyear = (data) => {
  return httpClient.post(server.CaneCropyear, data);
};

export const updateCaneCropyear = (id, data) => {
  return httpClient.put(server.CaneCropyear + `/${id}`, data);
};

export const deleteCaneCropyear = (id) => {
  return httpClient.delete(server.CaneCropyear + `/${id}`);
};
