import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getHarvestCarcut = () => {
  return httpClient.get(server.HarvestCarcut + `/get`);
};

export const addHarvestCarcut = (data) => {
  return httpClient.post(server.HarvestCarcut, data);
};

export const updateHarvestCarcut = (id, data) => {
  return httpClient.put(server.HarvestCarcut + `/${id}`, data);
};

export const deleteHarvestCarcut = (id) => {
  return httpClient.delete(server.HarvestCarcut + `/${id}`);
};
