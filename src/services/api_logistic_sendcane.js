import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getLOGISTIC_SENDCANE = () => {
  return httpClient.get(server.LOGISTIC_SENDCANE + `/get`);
};


export const getDetailLOGISTIC_SENDCANE = () => {
  return httpClient.get(server.LOGISTIC_SENDCANE + `/getdetail`);
};

export const addLOGISTIC_SENDCANE = (data) => {
  return httpClient.post(server.LOGISTIC_SENDCANE, data);
};

export const updateLOGISTIC_SENDCANE = (id, data) => {
  return httpClient.put(server.LOGISTIC_SENDCANE + `/${id}`, data);
};

export const deleteLOGISTIC_SENDCANE = (id) => {
  return httpClient.delete(server.LOGISTIC_SENDCANE + `/${id}`);
};
