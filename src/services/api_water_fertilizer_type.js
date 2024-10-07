import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getWaterFertilizerType = () => {
  return httpClient.get(server.WaterFertilizerType + `/get`);
};

export const addWaterFertilizerType = (data) => {
  return httpClient.post(server.WaterFertilizerType, data);
};

export const updateWaterFertilizerType = (id, data) => {
  return httpClient.put(server.WaterFertilizerType + `/${id}`, data);
};

export const deleteWaterFertilizerType = (id) => {
  return httpClient.delete(server.WaterFertilizerType + `/${id}`);
};
