import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: "",
    fullname: "",
    role: "",
    isRegister: false,
    altLogin: false,
    navMenu: false,
    loadMenu: false,
    meetSta: false,
    company_id: 0,
    company_name: "",
    department_id: 0,
    department_name: "",
    position_id: 0,
    position_name: "",
    meet_name: "",
    meet_email: "",
    rooms: [],
    page_reload: false,
    verify_status: false,
    global_dialog: false,
  },
  getters: {
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return state.username;
    },
    fullname(state) {
      return state.fullname;
    },
    altlogin(state) {
      return state.altLogin;
    },
    role(state) {
      return state.role;
    },
    company_id(state) {
      return state.company_id;
    },
    // company_name(state) {
    //   return state.company_name;
    // },
    department_id(state) {
      return state.department_id;
    },
    // department_name(state) {
    //   return state.department_name;
    // },
    position_id(state) {
      return state.position_id;
    },
    // position_name(state) {
    //   return state.position_name;
    // },
  },
  mutations: {
    SET_LOGGED_IN(state) {
      state.isLogged = true;
      state.altLogin = false;
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
      state.navMenu = false;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    },
    SET_FULLNAME(state, value) {
      state.fullname = value;
    },
    SET_LOGIN_FAILED(state) {
      state.altLogin = true;
    },
    SET_ROLE(state, value) {
      state.role = value;
    },
    SET_COMPANYID(state, value) {
      state.company_id = value;
    },
    // SET_COMPANY_NAME(state, value) {
    //   state.company_name = value;
    // },
    SET_DEPARTMENT_ID(state, value) {
      state.department_id = value;
    },
    // SET_DEPARTMENT_NAME(state, value) {
    //   state.department_name = value;
    // },

    SET_POSITION_ID(state, value) {
      state.position_id = value;
    },
    // SET_POSITION_NAME(state, value) {
    //   state.position_name = value;
    // },
  },
  actions: {
    async doLogin({ commit, dispatch }, { username, password }) {
      let result = await api.login({ username, password });
      if (result == true) {
        let FULLNAME = localStorage.getItem(server.FULLNAME);
        let role = localStorage.getItem(server.ROLE);
        let company_id = localStorage.getItem(server.COMPANYID);

        // let company_name = localStorage.getItem(server.COMPANY_NAME);
        let department_id = localStorage.getItem(server.DEPARTMENT_ID);
        // let department_name = localStorage.getItem(server.DEPARTMENT_NAME);
        let position_id = localStorage.getItem(server.POSITION_ID);
        // let position_name = localStorage.getItem(server.DEPARTMENT_NAME);

        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_FULLNAME", FULLNAME);
        commit("SET_ROLE", role);
        commit("SET_COMPANYID", company_id);
        // commit("SET_COMPANY_NAME", company_name);
        commit("SET_DEPARTMENT_ID", department_id);
        commit("SET_POSITION_ID", position_id);
        // commit("SET_DEPARTMENT_NAME", department_name);
        // commit("SET_POSITION_NAME", position_name);
      } else {
        // alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
        dispatch("doLogout", {});
        commit("SET_LOGIN_FAILED");
      }
    },
    doLogout({ commit }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
      commit("SET_FULLNAME", "");
      commit("SET_ROLE", "");
      commit("SET_COMPANYID", "");
      // commit("SET_COMPANY_NAME", "");
      commit("SET_DEPARTMENT_ID", "");
      // commit("SET_DEPARTMENT_NAME", "");
      commit("SET_POSITION_ID", "");
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        let FULLNAME = localStorage.getItem(server.FULLNAME);
        let role = localStorage.getItem(server.ROLE);
        let company_id = localStorage.getItem(server.COMPANYID);

        // let company_name = localStorage.getItem(server.COMPANY_NAME);
        let department_id = localStorage.getItem(server.DEPARTMENT_ID);
        // let department_name = localStorage.getItem(server.DEPARTMENT_NAME);
        let position_id = localStorage.getItem(server.POSITION_ID);

        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        commit("SET_FULLNAME", FULLNAME);
        commit("SET_ROLE", role);
        commit("SET_COMPANYID", company_id);
        // commit("SET_COMPANY_NAME", company_name);
        commit("SET_DEPARTMENT_ID", department_id);
        commit("SET_POSITION_ID", position_id);
        // commit("SET_DEPARTMENT_NAME", department_name);
      }
    },
  },
  modules: {},
});
