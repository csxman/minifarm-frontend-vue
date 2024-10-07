import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCaneCutedType = () => {
  return httpClient.get(server.CaneCutedType + `/get`);
};

export const addCaneCutedType = (data) => {
  return httpClient.post(server.CaneCutedType, data);
};

export const updateCaneCutedType = (id, data) => {
  return httpClient.put(server.CaneCutedType + `/${id}`, data);
};

export const deleteCaneCutedType = (id) => {
  return httpClient.delete(server.CaneCutedType + `/${id}`);
};
