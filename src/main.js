import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue2Filters from "vue2-filters";
import { imageUrl } from "@/services/constants";
import CountryFlag from "vue-country-flag";

import Notifications from "vue-notification";

import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueSignature from "vue-signature-pad";
import LongdoMap from "longdo-map-vue";
import VueExcelXlsx from "vue-excel-xlsx";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.component("country-flag", CountryFlag);
Vue.use(Vue2Filters);
Vue.use(VueLoading);
Vue.use(Notifications);
Vue.use(VueSignature);
Vue.use(VueExcelXlsx);

Vue.use(LongdoMap, {
  load: {
    apiKey: "30883e60d2d7f862f65dfcf97f926801",
  },
});

Vue.filter("imageUrl", function(image) {
  return `${imageUrl}/${image}?timestamp=${Date.now()}`;
});
