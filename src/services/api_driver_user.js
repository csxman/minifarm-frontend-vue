import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDriverUser = () => {
  return httpClient.get(server.DriverUser + `/get`);
};

export const addDriverUser = (data) => {
  return httpClient.post(server.DriverUser, data);
};

export const updateDriverUser = (id, data) => {
  return httpClient.put(server.DriverUser + `/${id}`, data);
};

export const deleteDriverUser = (id) => {
  return httpClient.delete(server.DriverUser + `/${id}`);
};
