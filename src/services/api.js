import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";
import * as productApis from "@/services/api_product.js";
import * as masterApis from "@/services/api_master.js";
import * as accountApis from "@/services/api_account.js";
import * as customerApis from "@/services/api_customer.js";
import * as groupMenuApis from "@/services/api_group_menu.js";
import * as settingGroupMenuApis from "@/services/api_setting_group_menu.js";
import * as menuDetailApis from "@/services/api_menu_detail.js";
import * as settingMenuDetailApis from "@/services/api_setting_menu_detail.js";
import * as caneType from "@/services/api_cane_type.js";
import * as caneVarieties from "@/services/api_cane_varieties.js";
import * as FertilizerFormula from "@/services/api_fertilizer_formula.js";
import * as FertilizerBand from "@/services/api_fertilizer_band.js";
import * as LandActivity from "@/services/api_land_activity.js";
import * as CaneActivity from "@/services/api_cane_activity.js";
import * as LandRentSpace from "@/services/api_land_rent_space.js";
import * as CaneCropyear from "@/services/api_cane_cropyear.js";
import * as HarvestCarcut from "@/services/api_harvest_carcut.js";
import * as CaneOwner from "@/services/api_cane_owner.js";
import * as LandDLT from "@/services/api_land_dlt.js";
import * as CanePlowType from "@/services/api_cane_plow_type.js";
import * as CaneSprayType from "@/services/api_cane_spray_type.js";
import * as CaneCutedType from "@/services/api_cane_cuted_type.js";
import * as WaterFertilizerType from "@/services/api_water_fertilizer_type.js";
import * as SoilCondition from "@/services/api_soil_condition.js";
import * as HarvestTruck from "@/services/api_harvest_truck.js";
import * as LOGISTIC_SENDCANE from "@/services/api_logistic_sendcane.js";
import * as DriverUser from "@/services/api_driver_user.js";
import * as gisPlot from "@/services/api_gis_plot.js";
import * as farmer from "@/services/api_farmer.js";
import * as userType from "@/services/api_user_type.js";
import * as activityReport from "@/services/api_activity_report.js";

const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const login = async (values) => {
  try {
    let result = await httpClient.post(
      server.ACCOUNT_URL + "/" + server.LOGIN_URL,
      values
    );

    console.log("login log : " + "result ok");

    if (result.data.token != null || result.data.token != "") {
      console.log("login log : " + "token ok");

      localStorage.setItem(server.USERNAME, values.username);
      localStorage.setItem(server.USER_ID, result.data.user_id);
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      localStorage.setItem(server.FULLNAME, result.data.acc_fullname);
      localStorage.setItem(server.ROLE, result.data.role);
      localStorage.setItem(server.COMPANYID, result.data.company_id);
      localStorage.setItem(server.DEPARTMENT_ID, result.data.department_id);
      localStorage.setItem(server.POSITION_ID, result.data.position_id);
      localStorage.setItem(server.AUTHORIZE_ID, result.data.authorize_id);

      // localStorage.setItem(server.COMPANY_NAME, result.data.company_name);
      // localStorage.setItem(server.DEPARTMENT_NAME, result.data.department_name);
      // localStorage.setItem(server.ACC_PLAN_STA, result.data.acc_plan);
      router.push("/dashboard");
      return true;
    } else {
      alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
      // console.log("login log : " + "result error");
      return false;
    }
  } catch (error) {
    alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
    return false;
  }
};

const register = async (values) => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  if (result.data.result == "ok") {
    router.go(-1);
  } else {
    alert(JSON.stringify(result));
  }
};

const logoff = () => {
  localStorage.removeItem(server.TOKEN_KEY);
  router.push("/login");
};

export default {
  isLoggedIn,
  login,
  register,
  logoff,
  ...productApis,
  ...accountApis,
  ...customerApis,
  ...groupMenuApis,
  ...menuDetailApis,
  ...settingGroupMenuApis,
  ...settingMenuDetailApis,
  ...masterApis,
  ...caneType,
  ...caneVarieties,
  ...FertilizerFormula,
  ...FertilizerBand,
  ...LandActivity,
  ...CaneActivity,
  ...LandRentSpace,
  ...CaneCropyear,
  ...HarvestCarcut,
  ...CaneOwner,
  ...LandDLT,
  ...CanePlowType,
  ...CaneSprayType,
  ...CaneCutedType,
  ...WaterFertilizerType,
  ...SoilCondition,
  ...HarvestTruck,
  ...DriverUser,
  ...gisPlot,
  ...farmer,
  ...userType,
  ...LOGISTIC_SENDCANE,
  ...activityReport,
};
