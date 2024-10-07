import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getSoilCondition = () => {
  return httpClient.get(server.SoilCondition + `/get`);
};

export const addSoilCondition = (data) => {
  return httpClient.post(server.SoilCondition, data);
};

export const updateSoilCondition = (id, data) => {
  return httpClient.put(server.SoilCondition + `/${id}`, data);
};

export const deleteSoilCondition = (id) => {
  return httpClient.delete(server.SoilCondition + `/${id}`);
};
