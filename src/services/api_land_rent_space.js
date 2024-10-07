import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getLandRentSpace = () => {
  return httpClient.get(server.LandRentSpace + `/get`);
};

export const addLandRentSpace = (data) => {
  return httpClient.post(server.LandRentSpace, data);
};

export const updateLandRentSpace = (id, data) => {
  return httpClient.put(server.LandRentSpace + `/${id}`, data);
};

export const deleteLandRentSpace = (id) => {
  return httpClient.delete(server.LandRentSpace + `/${id}`);
};
