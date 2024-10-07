import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getGISPLOT = () => {
  return httpClient.get(server.GIS_PLOT + `/get`);
};

export const getGISReport = () => {
  return httpClient.get(server.GIS_PLOT + `/getReportAllArea`);
};

export const getDashboard = () => {
  return httpClient.get(server.GIS_PLOT + `/getDashboard`);
};

export const getGISReportPlotDetail = (id) => {
  return httpClient.get(server.GIS_PLOT + `/getReportPlotDetail/${id}`);
};

export const getAllMapByExtend = (maxLon, minLon, maxLat, minLat) => {
  return httpClient.get(
    server.GIS_PLOT +
      `/getAllMapByExtend/${maxLon}/${minLon}/${maxLat}/${minLat}`
  );
};

export const addGISPLOT = (data) => {
  return httpClient.post(server.GIS_PLOT, data);
};

export const insertGISPlot = (data) => {
  return httpClient.post(server.GIS_PLOT + `/insertPlot`, data);
};

export const updateGISPLOT = (id, data) => {
  return httpClient.put(server.GIS_PLOT + `/${id}`, data);
};

export const deleteGISPLOT = (id) => {
  return httpClient.delete(server.GIS_PLOT + `/${id}`);
};
