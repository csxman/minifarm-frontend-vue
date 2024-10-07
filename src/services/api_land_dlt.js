import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getLandDLT = () => {
  return httpClient.get(server.LandDLT + `/get`);
};

export const addLandDLT = (data) => {
  return httpClient.post(server.LandDLT, data);
};

export const updateLandDLT = (id, data) => {
  return httpClient.put(server.LandDLT + `/${id}`, data);
};

export const deleteLandDLT = (id) => {
  return httpClient.delete(server.LandDLT + `/${id}`);
};
