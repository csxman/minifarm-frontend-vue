import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Report from "@/views/Report.vue";
import Dashboard from "@/views/Dashboard.vue";
import CaneType from "@/views/CaneType.vue";
import CaneVarieties from "@/views/CaneVarieties.vue";
import FertilizerFormula from "@/views/FertilizerFormula.vue";
import FertilizerBand from "@/views/FertilizerBand.vue";
import LandActivity from "@/views/LandActivity.vue";
import CaneActivity from "@/views/CaneActivity.vue";
import LandRentSpace from "@/views/LandRentSpace.vue";
import CaneCropyear from "@/views/CaneCropyear.vue";
import HarvestCarcut from "@/views/HarvestCarcut.vue";
import CaneOwner from "@/views/CaneOwner.vue";
import LandDLT from "@/views/LandDLT.vue";
import CanePlowType from "@/views/CanePlowType.vue";
import CaneSprayType from "@/views/CaneSprayType.vue";
import CaneCutedType from "@/views/CaneCutedType.vue";
import WaterFertilizerType from "@/views/WaterFertilizerType.vue";
import SoilCondition from "@/views/SoilCondition.vue";
import HarvestTruck from "@/views/HarvestTruck.vue";
import DriverUser from "@/views/DriverUser.vue";
import Map from "@/views/Map.vue";
import Farmer from "@/views/Farmer.vue";
import User from "@/views/User.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import ReportAreaByFarmer from "@/views/ReportAreaByFarmer.vue";
import ReportCaneReceive from "@/views/ReportCaneReceive.vue";
import ReportPlotDetail from "@/views/ReportPlotDetail.vue";
import ReportAdjust from "@/views/report/ReportAdjust.vue";
import ReportCanecut from "@/views/report/ReportCanecut.vue";

import ReportDrone from "@/views/report/ReportDrone.vue";
import ReportFertilizerFormula from "@/views/report/ReportFertilizerFormula.vue";
import ReportLeaves from "@/views/report/ReportLeaves.vue";
import ReportPlant from "@/views/report/ReportPlant.vue";
import ReportPlot from "@/views/report/ReportPlot.vue";
import ReportPlow from "@/views/report/ReportPlow.vue";
import ReportPoint from "@/views/report/ReportPoint.vue";
import ReportRipper from "@/views/report/ReportRipper.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/report-ripper",
    name: "report-ripper",
    component: ReportRipper,
  },
  {
    path: "/report-point",
    name: "report-point",
    component: ReportPoint,
  },
  {
    path: "/report-plow",
    name: "report-plow",
    component: ReportPlow,
  },
  {
    path: "/report-plot",
    name: "report-plot",
    component: ReportPlot,
  },
  {
    path: "/report-plant",
    name: "report-plant",
    component: ReportPlant,
  },
  {
    path: "/report-leaves",
    name: "report-leaves",
    component: ReportLeaves,
  },
  {
    path: "/report-fertilizer-formula",
    name: "report-fertilizer-formula",
    component: ReportFertilizerFormula,
  },
  {
    path: "/report-drone",
    name: "report-drone",
    component: ReportDrone,
  },
  {
    path: "/report-canecut",
    name: "report-canecut",
    component: ReportCanecut,
  },
  {
    path: "/report-adjust",
    name: "report-adjust",
    component: ReportAdjust,
  },
  {
    path: "/report-cane-receive",
    name: "report-cane-receive",
    component: ReportCaneReceive,
  },
  {
    path: "/report-plot-detail/:id",
    name: "report-plot-detail",
    component: ReportPlotDetail,
  },
  {
    path: "/report-area-by-farmer",
    name: "report-area-by-farmer",
    component: ReportAreaByFarmer,
  },
  {
    path: "/reset-password/:id",
    name: "reset-password",
    component: ResetPassword,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/farmer",
    name: "farmer",
    component: Farmer,
  },
  {
    path: "/map",
    name: "map",
    component: Map,
  },
  {
    path: "/driver-user",
    name: "driver-user",
    component: DriverUser,
  },
  {
    path: "/harvest-truck",
    name: "harvest-truck",
    component: HarvestTruck,
  },
  {
    path: "/soil-condition",
    name: "soil-condition",
    component: SoilCondition,
  },
  {
    path: "/water-fertilizer-type",
    name: "water-fertilizer-type",
    component: WaterFertilizerType,
  },
  {
    path: "/cane-cuted-type",
    name: "cane-cuted-type",
    component: CaneCutedType,
  },
  {
    path: "/cane-spray-type",
    name: "cane-spray-type",
    component: CaneSprayType,
  },
  {
    path: "/cane-plow-type",
    name: "cane-plow-type",
    component: CanePlowType,
  },
  {
    path: "/land-dlt",
    name: "land-dlt",
    component: LandDLT,
  },
  {
    path: "/cane-owner",
    name: "cane-owner",
    component: CaneOwner,
  },
  {
    path: "/harvest-carcut",
    name: "harvest-carcut",
    component: HarvestCarcut,
  },
  {
    path: "/cane-cropyear",
    name: "cane-cropyear",
    component: CaneCropyear,
  },
  {
    path: "/land-rent-space",
    name: "land-rent-space",
    component: LandRentSpace,
  },
  {
    path: "/cane-activity",
    name: "cane-activity",
    component: CaneActivity,
  },
  {
    path: "/land-activity",
    name: "land-activity",
    component: LandActivity,
  },
  {
    path: "/fertilizer-formula",
    name: "fertilizer-formula",
    component: FertilizerFormula,
  },
  {
    path: "/fertilizer-band",
    name: "fertilizer-band",
    component: FertilizerBand,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/cane-type",
    name: "cane-type",
    component: CaneType,
  },
  {
    path: "/cane-varieties",
    name: "cane-varieties",
    component: CaneVarieties,
  },
  {
    path: "/report",
    meta: {
      isSecured: true,
    },
    name: "report",
    component: Report,
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "*",
    redirect: "/dashboard",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
