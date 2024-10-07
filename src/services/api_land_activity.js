import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getLandActivity = () => {
  return httpClient.get(server.LandActivity + `/get`);
};

export const addLandActivity = (data) => {
  return httpClient.post(server.LandActivity, data);
};

export const updateLandActivity = (id, data) => {
  return httpClient.put(server.LandActivity + `/${id}`, data);
};

export const deleteLandActivity = (id) => {
  return httpClient.delete(server.LandActivity + `/${id}`);
};
