import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getFertilizerFormula = () => {
  return httpClient.get(server.FertilizerFormula + `/get`);
};

export const addFertilizerFormula = (data) => {
  return httpClient.post(server.FertilizerFormula, data);
};

export const updateFertilizerFormula = (id, data) => {
  return httpClient.put(server.FertilizerFormula + `/${id}`, data);
};

export const deleteFertilizerFormula = (id) => {
  return httpClient.delete(server.FertilizerFormula + `/${id}`);
};
