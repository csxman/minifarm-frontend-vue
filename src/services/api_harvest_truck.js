import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getHarvestTruck = () => {
  return httpClient.get(server.HarvestTruck + `/get`);
};

export const addHarvestTruck = (data) => {
  return httpClient.post(server.HarvestTruck, data);
};

export const updateHarvestTruck = (id, data) => {
  return httpClient.put(server.HarvestTruck + `/${id}`, data);
};

export const deleteHarvestTruck = (id) => {
  return httpClient.delete(server.HarvestTruck + `/${id}`);
};
