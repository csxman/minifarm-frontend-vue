import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getFertilizerBand = () => {
  return httpClient.get(server.FertilizerBand + `/get`);
};

export const addFertilizerBand = (data) => {
  return httpClient.post(server.FertilizerBand, data);
};

export const updateFertilizerBand = (id, data) => {
  return httpClient.put(server.FertilizerBand + `/${id}`, data);
};

export const deleteFertilizerBand = (id) => {
  return httpClient.delete(server.FertilizerBand + `/${id}`);
};
