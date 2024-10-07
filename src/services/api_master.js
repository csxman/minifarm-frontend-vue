import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDepartmentMaster = (id) => {
  return httpClient.get(server.MASTER_DEPARTMENT + `/${id}`);
};

export const getPositionMaster = (id) => {
  return httpClient.get(server.MASTER_POSITION + `/${id}`);
};

export const getCompanyMaster = (id) => {
  return httpClient.get(server.MASTER_COMPANY + `/${id}`);
};
