import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getActivityAdjust = () => {
  // return httpClient.get(server.activity_adjust + `/get`);
  return httpClient.get(server.activity_adjust + `/getdata`);
};

export const getActivityCanecut = () => {
  // return httpClient.get(server.activity_canecut + `/get`);
  return httpClient.get(server.activity_canecut + `/getdata`);
};

export const getActivityDrone = () => {
  // return httpClient.get(server.activity_drone + `/get`);
  return httpClient.get(server.activity_drone + `/getdata`);
};

export const getActivityFertilizerFormula = () => {
  return httpClient.get(server.activity_fertilizer_formula + `/get`);
};

export const getActivityLeaves = () => {
  // return httpClient.get(server.activity_leaves + `/get`);
  return httpClient.get(server.activity_leaves + `/getdata`);
};

export const getActivityPlant = () => {
  // return httpClient.get(server.activity_plant + `/get`);
  return httpClient.get(server.activity_plant + `/getdata`);
};

export const getActivityPlot = () => {
  // return httpClient.get(server.activity_plot + `/get`);
  return httpClient.get(server.activity_plot + `/getdata`);
};

export const getActivityPlow = () => {
  return httpClient.get(server.activity_plow + `/get`);
};

export const getActivityPoint = () => {
  return httpClient.get(server.activity_point + `/get`);
};

export const getActivityRipper = () => {
  return httpClient.get(server.activity_ripper + `/get`);
};

// Path: src/services/constants.js

// activity_adjust: `activity-adjust`,
//   activity_canecut: `activity-canecut`,
//   activity_drone: `activity-drone`,
//   activity_fertilizer_formula: `activity-fertilizer-formula`,
//   activity_leaves: `activity-leaves`,
//   activity_plant: `activity-plant`,
//   activity_plot: `activity-plot`,
//   activity_plow: `activity-plow`,
//   activity_point: `activity-point`,
//   activity_ripper: `activity-ripper`,
