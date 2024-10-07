<template>
  <v-container fill-height fluid @click="onClickMainMap" class="pa-5">
    <v-layout>
      <v-row>
        <longdo-map @load="onLoadMainMap" :lastView="false">
          <longdo-map-menu-bar
            :button="[{ label: 'ตำแหน่งปัจจุบัน', value: 1 }]"
            :dropdown="[
              { label: 'ปิด', value: 2 },
              { label: 'เปิด', value: 3 },
            ]"
            :dropdownLabel="'ปิด'"
            :change="handlerMenuBarFunction"
          />
          <longdo-map-polygon
            v-for="(item, i) in polygons"
            :key="i"
            :location="item.location"
            :lineColor="item.lineColor"
            :fillColor="item.fillColor"
            :lineWidth="2"
            :label="item.label"
            :visibleRange="{ min: 8, max: 20 }"
          />
          <longdo-map-marker
            v-for="(item, i) in markers"
            :key="i"
            :location="item.location"
            :title="item.title"
            :detail="item.detail"
          />
        </longdo-map>
      </v-row>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="40%">
      <v-card>
        <v-card-title>
          <span class="text-h5">ข้อมูลแปลง</span>
        </v-card-title>
        <v-card-text>
          <v-row col="6" class="mt-5">
            <v-text-field
              label="PlotKey"
              v-model="plot_dialog.plot_key"
              outlined
              dense
              disabled
            ></v-text-field>
            <v-text-field
              label="เลขแปลง"
              v-model="plot_dialog.plot_no"
              outlined
              dense
              disabled
            ></v-text-field>
            <v-text-field
              label="ที่อยู่"
              v-model="plot_dialog.plot_address"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="พื้นที่"
              v-model="plot_dialog.plot_area"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="ปีการผลิต"
              v-model="plot_dialog.cane_cropyear_name"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="ประเภทอ้อย"
              v-model="plot_dialog.cane_type_name"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="สิทธิ์"
              v-model="plot_dialog.cane_owner_name"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="เช่าพื้นที่"
              v-model="plot_dialog.land_rent_space_name"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="เอกสารสิทธิ์"
              v-model="plot_dialog.ldlt_name"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="เลขที่ เอกสารสิทธิ์"
              v-model="plot_dialog.plot_deed_no"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="พันธุ์อ้อย"
              v-model="plot_dialog.varieties_name"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="จุดอ้างอิง"
              v-model="plot_dialog.plot_waypoint"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="ต้นทุน/ไร่"
              v-model="plot_dialog.plot_cost_per_rai"
              outlined
              dense
              disabled
            ></v-text-field>

            <v-text-field
              label="ต้นทุนรวม"
              v-model="plot_dialog.plot_cost_avg"
              outlined
              dense
              disabled
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { LongdoMap, LongdoMapPolygon } from "longdo-map-vue";
LongdoMap.init({ apiKey: "30883e60d2d7f862f65dfcf97f926801" });

import api from "@/services/api";
import { server } from "../services/constants";

export default {
  name: "Map",
  components: {
    LongdoMap,
    LongdoMapPolygon,
  },
  async mounted() {},
  data() {
    return {
      dialog: false,
      searchClient: "1",
      loopCheck: false,
      name1: "Flavio",
      main_map: null,
      input_name: "",
      tbm_data: [],
      polygons: [],
      markers: [
        {
          location: {
            lon: localStorage.getItem("longitude"),
            lat: localStorage.getItem("latitude"),
          },
          title: "ตำแหน่งปัจจุบัน",
          detail: "ตำแหน่งปัจจุบัน",
        },
      ],
      data_dialog: null,
      plot_dialog: {
        plot_key: "",
        plot_no: "",
        plot_address: "",
        plot_area: null,
        cane_cropyear_name: "",
        cane_type_name: "",
        cane_owner_name: "",
        land_rent_space_name: "",
        ldlt_name: "",
        plot_deed_no: "",
        varieties_name: "",
        plot_waypoint: "",
        plot_cost_per_rai: "",
        plot_cost_avg: "",
      },
    };
  },
  created() {
    window.addEventListener("wheel", this.handleWheel);

    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Do something with the position
      console.log("Map created: " + latitude + "," + longitude);
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
    };

    const error = (err) => {
      console.log("Map created: " + err);
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleWheel);
  },
  methods: {
    handlerMenuBarFunction(event) {
      // console.log(event);
      // alert(JSON.stringify(event));
      // alert(event.value);
      localStorage.setItem("auto_pan", event.value);
    },
    async loadMapByExtend(maxLon, minLon, maxLat, minLat) {
      let loader = this.$loading.show({
        // Optional parameters
        color: "green",
        loader: "dots",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        width: 120,
        height: 120,
        backgroundColor: "#ffffff",
        opacity: 0.5,
        zIndex: 999,
        onCancel: this.onCancel,
      });

      // const res_plot = await api.getGISPLOT();
      const res_plot = await api.getAllMapByExtend(
        maxLon,
        minLon,
        maxLat,
        minLat
      );
      // console.log("res_plot:", JSON.stringify(res_plot.data));
      var locationTMPMain = [];

      // ควรแสดงแปลงที่ระยะ zoom 13-15 จะได้ไม่หนักตอน load DB

      this.tbm_data = res_plot.data;
      this.tbm_data.forEach((item) => {
        var locationTMP2 = [];
        var tmp1 = item.plot_polygon;
        var tmp2 = [];
        var tmp3 = [];

        tmp1 = tmp1.replace("POLYGON((", "");
        tmp1 = tmp1.replace("))", "");
        // console.log("res_plot:", tmp1);
        tmp2 = tmp1.split(", ");

        tmp2.forEach((item2) => {
          tmp3 = item2.split(" ");
          locationTMP2.push({ lon: tmp3[0], lat: tmp3[1] });
        });

        var plot_color = "";
        var line_color = "rgba(0, 0, 0, 1)";
        if (item.cane_type_id == 2) {
          plot_color = "rgba(0, 204, 255, 0.4)";
        } else {
          plot_color = "rgba(0, 255, 0, 0.4)";
        }

        locationTMPMain.push({
          polygons: item.plot_polygon,
          lineWidth: 2,
          lineColor: line_color,
          fillColor: plot_color,
          label: item.plot_no,
          visibleRange: { min: 10, max: 20 },
          location: locationTMP2,
        });
        // console.log(JSON.stringify(locationTMPMain));
        // console.log("res_plot:", locationTMPMain);
      });

      this.polygons = locationTMPMain;

      loader.hide();
    },
    clearMap() {
      this.polygons = [];
    },
    handleWheel(event) {
      // Any code to be executed when the window is scrolled
      // console.log(JSON.stringify(event));
      console.log("map_event:", localStorage.getItem("map_event"));

      // console.log("map_event maxLat:", localStorage.getItem("maxLat"));
      // console.log("map_event maxLon:", localStorage.getItem("maxLon"));
      // console.log("map_event minLat:", localStorage.getItem("minLat"));
      // console.log("map_event minLon:", localStorage.getItem("minLon"));

      //maxLon, minLon, maxLat, minLat
      if (localStorage.getItem("map_event") == "onzoom") {
        if (localStorage.getItem("zoom_level") >= 13) {
          this.loadMapByExtend(
            localStorage.getItem("maxLon"),
            localStorage.getItem("minLon"),
            localStorage.getItem("maxLat"),
            localStorage.getItem("minLat")
          );
        } else {
          this.clearMap();
        }
      }

      console.log(event.isTrusted);
    },
    onClickMainMap() {
      // console.log(localStorage.getItem("locationWKT"));
      // this.dialog = true;
      console.log("map_event:", localStorage.getItem("map_event"));

      if (
        localStorage.getItem("map_event") == "onzoom" ||
        localStorage.getItem("map_event") == "onpan"
      ) {
        localStorage.setItem("auto_pan", localStorage.getItem("auto_pan"));
        if (localStorage.getItem("auto_pan") == 3) {
          console.log("map_event:", "zoomTo");
          this.main_map.location({
            lon: localStorage.getItem("longitude"),
            lat: localStorage.getItem("latitude"),
          });
          this.main_map.zoom(15);
        }
      }

      // console.log("map_event maxLat:", localStorage.getItem("maxLat"));
      // console.log("map_event maxLon:", localStorage.getItem("maxLon"));
      // console.log("map_event minLat:", localStorage.getItem("minLat"));
      // console.log("map_event minLon:", localStorage.getItem("minLon"));

      //maxLon, minLon, maxLat, minLat

      if (localStorage.getItem("map_event") == "onpan") {
        if (localStorage.getItem("zoom_level") >= 13) {
          this.loadMapByExtend(
            localStorage.getItem("maxLon"),
            localStorage.getItem("minLon"),
            localStorage.getItem("maxLat"),
            localStorage.getItem("minLat")
          );
        } else {
          this.clearMap();
        }
      }

      if (localStorage.getItem("map_event") == "onoverlayClick") {
        // this.dialog = true;
        var tmp_search = String(localStorage.getItem("locationWKT"));
        var tmp2 = [];
        var tmp_search2 = "";
        // tmp1 = tmp1.replace("POLYGON((", "");
        // tmp1 = tmp1.replace("))", "");
        // console.log("res_plot:", tmp1);
        tmp2 = tmp_search.split(",");

        tmp2.forEach((item2) => {
          console.log("data_dialog tmp2:", item2);
          tmp_search2 += item2 + ", ";
        });
        tmp_search2 = tmp_search2.replace(")),", "))");

        console.log("data_dialog search:", tmp_search2.trim() + "@");
        // console.log("data_dialog tbm_data:", JSON.stringify(this.tbm_data));

        this.data_dialog = this.tbm_data.filter(
          (p) => p.plot_polygon == tmp_search2.trim()
        );

        this.plot_dialog.plot_key = this.data_dialog[0].plot_key;
        this.plot_dialog.plot_no = this.data_dialog[0].plot_no;
        this.plot_dialog.plot_address = this.data_dialog[0].plot_address;
        this.plot_dialog.plot_area = this.data_dialog[0].plot_area;
        this.plot_dialog.cane_cropyear_name = this.data_dialog[0].cane_cropyear_name;
        this.plot_dialog.cane_type_name = this.data_dialog[0].cane_type_name;
        this.plot_dialog.cane_owner_name = this.data_dialog[0].cane_owner_name;
        this.plot_dialog.land_rent_space_name = this.data_dialog[0].land_rent_space_name;
        this.plot_dialog.ldlt_name = this.data_dialog[0].ldlt_name;
        this.plot_dialog.plot_deed_no = this.data_dialog[0].plot_deed_no;
        this.plot_dialog.varieties_name = this.data_dialog[0].varieties_name;
        this.plot_dialog.plot_waypoint = this.data_dialog[0].plot_waypoint;
        this.plot_dialog.plot_cost_per_rai = this.data_dialog[0].plot_cost_per_rai;
        this.plot_dialog.plot_cost_avg = this.data_dialog[0].plot_cost_avg;

        this.dialog = true;
        // console.log(
        //   "data_dialog:",
        //   JSON.stringify(this.data_dialog[0].plot_key)
        // );
      }
    },
    onLoadMainMap(map) {
      this.main_map = map;
      var toolState = null;
      var locationList = null;
      var locationListJson = null;
      var locationWKT = null;

      this.main_map.Event.bind("layerChange", function() {
        // alert(locationWKT);
        //do somethings
        // localStorage.setItem("map_event", "layerChange");
        console.log("layerChange", "layerChange");
      });

      this.main_map.Event.bind("loadTile", function() {
        // alert(locationWKT);
        //do somethings
        // localStorage.setItem("map_event", "layerChange");
        console.log("loadTile", "loadTile");
      });

      this.main_map.Event.bind("click", function() {
        // alert(locationWKT);
        //do somethings
        localStorage.setItem("map_event", "onclickEmpty");
        console.log("click", "click empty");
      });

      map.Event.bind("zoom", function() {
        // alert(JSON.stringify(map.bound()));
        //do somethings
        localStorage.setItem("zoom_level", map.zoom());
        localStorage.setItem("map_event", "onzoom");
        localStorage.setItem("maxLat", map.bound().maxLat);
        localStorage.setItem("maxLon", map.bound().maxLon);
        localStorage.setItem("minLat", map.bound().minLat);
        localStorage.setItem("minLon", map.bound().minLon);
        // console.log("zoom", map.bound());
        // console.log("zoom", map.bound().maxLat);
      });

      map.Event.bind("drop", function() {
        // alert(JSON.stringify(map.bound()));
        //do somethings

        localStorage.setItem("map_event", "onpan");
        localStorage.setItem("maxLat", map.bound().maxLat);
        localStorage.setItem("maxLon", map.bound().maxLon);
        localStorage.setItem("minLat", map.bound().minLat);
        localStorage.setItem("minLon", map.bound().minLon);

        console.log("drop", map.bound());
      });

      this.main_map.Event.bind("overlayClick", function(overlay) {
        // alert("overlayClick");

        localStorage.setItem("map_event", "onoverlayClick");
        console.log("overlayClick", "overlayClick");

        toolState = map.Ui.Toolbar.activeTool(); // Check the measurement tool state (default: null)
        locationList = overlay.location(); // Geometry location
        if (toolState !== "M") {
          locationListJson = JSON.stringify(locationList, undefined, 4);
          locationWKT = longdo.Util.overlayToWkt([overlay]);
        }
        this.searchClient = locationWKT;
        // console.log("locationListJson:" + locationListJson);
        // console.log("locationWKT:" + locationWKT);
        localStorage.setItem("locationWKT", locationWKT);
        // localStorage.setItem("locationListJson", locationListJson);
      });
    },
  },
};
</script>

<style></style>
