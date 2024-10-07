<template dark>
  <v-navigation-drawer app permanent dark class="pt-6">
    <router-link to="/" exact>
      <v-img src="@/assets/logo.png" alt="" width="80%" contain />
    </router-link>
    <!-- <v-list shaped>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="tile"
          v-for="([icon, title, route], index) in menus"
          :key="index"
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list> -->

    <v-list>
      <v-list-group
        v-for="item in menus"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        color="#fc5d0b"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          class="tile"
          v-for="subItem in item.items"
          :key="subItem.title"
          @click="onClickMenuItem(subItem.route)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import api from "../../services/api";
import { server } from "../../services/constants";

export default {
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickMenuItem(link) {
      // alert(link);
      this.$router.push(link).catch((err) => {});
    },
  },
  async mounted() {
    // let loader = this.$loading.show({
    //   // Optional parameters
    //   color: "green",
    //   loader: "dots",
    //   container: this.fullPage ? null : this.$refs.formContainer,
    //   canCancel: false,
    //   width: 120,
    //   height: 120,
    //   backgroundColor: "#ffffff",
    //   opacity: 0.5,
    //   zIndex: 999,
    //   onCancel: this.onCancel,
    // });

    // //   alert("initialize");
    // // const res_get = await api.getSettingGroupMenu();
    // const res_get = await api.getListMenuDetailById(
    //   localStorage.getItem(server.AUTHORIZE_ID)
    // );

    // this.authorize = res_get.data;
    // // console.log("authorize: " + JSON.stringify(this.authorize));
    // loader.hide();

    this.menus[0].items.push({
      title: "Dashboard",
      route: "/dashboard",
    });

    // alert(localStorage.getItem(server.ROLE));
    if (
      localStorage.getItem(server.ROLE) == "ADMIN" ||
      localStorage.getItem(server.ROLE) == "Admin"
    ) {
      this.menus[1].items.push({
        title: "ข้อมูลพนักงาน",
        route: "/user",
      });

      this.menus[1].items.push({
        title: "ข้อมูลชาวไร่",
        route: "/farmer",
      });
    }

    this.menus[2].items.push(
      {
        title: "ประเภทอ้อย",
        route: "/cane-type",
      },
      {
        title: "พันธุ์อ้อย",
        route: "/cane-varieties",
      },
      {
        title: "สูตรปุ๋ย",
        route: "/fertilizer-formula",
      },
      {
        title: "ยี่ห้อปุ๋ย",
        route: "/fertilizer-band",
      },
      {
        title: "ประเภทกิจกรรม - ที่ดิน",
        route: "/land-activity",
      },
      {
        title: "ประเภทกิจกรรม - อ้อย",
        route: "/cane-activity",
      },
      {
        title: "สถานะแปลง",
        route: "/land-rent-space",
      },
      {
        title: "ปีการผลิต",
        route: "/cane-cropyear",
      },
      {
        title: "รถตัดอ้อย",
        route: "/harvest-carcut",
      },
      {
        title: "สถานะการครอบครองแปลง",
        route: "/cane-owner",
      },
      {
        title: "เอกสารสิทธิ์",
        route: "/land-dlt",
      },
      {
        title: "สถานะเตรียมแปลง",
        route: "/cane-plow-type",
      },
      {
        title: "ประเภทการพ่นยา",
        route: "/cane-spray-type",
      },
      {
        title: "ประเภทการตัด",
        route: "/cane-cuted-type",
      },
      {
        title: "ประเภทปุ๋ยน้ำ",
        route: "/water-fertilizer-type",
      },
      {
        title: "ประเภทดิน",
        route: "/soil-condition",
      },
      {
        title: "รถบรรทุก",
        route: "/harvest-truck",
      }
    );

    if (
      localStorage.getItem(server.ROLE) == "ADMIN" ||
      localStorage.getItem(server.ROLE) == "Admin"
    ) {
      this.menus[2].items.push({
        title: "คนขับรถบรรทุก",
        route: "/driver-user",
      });
    }

    this.menus[3].items.push({
      title: "Map Server",
      route: "/map",
    });

    this.menus[4].items.push(
      {
        title: "รายงานพื้นที่อ้อย",
        route: "/report-area-by-farmer",
      },
      {
        title: "รายงานอ้อยเข้าหีบ",
        route: "/report-cane-receive",
      },

      {
        title: "รายงานปรับพื้นที่",
        route: "/report-adjust",
      },

      {
        title: "รายงานแปลงตัด",
        route: "/report-canecut",
      },

      {
        title: "รายงาน Drone",
        route: "/report-drone",
      },

      {
        title: "รายงาน fertilizer-formula",
        route: "/report-fertilizer-formula",
      },

      {
        title: "รายงานอัดใบอ้อย",
        route: "/report-leaves",
      },

      {
        title: "รายงานการปลูกอ้อย",
        route: "/report-plant",
      },

      {
        title: "รายงานการตรวจแปลง",
        route: "/report-plot",
      },

      {
        title: "รายงาน plow",
        route: "/report-plow",
      },

      {
        title: "รายงาน point",
        route: "/report-point",
      },

      {
        title: "รายงาน ripper",
        route: "/report-ripper",
      }
    );

    this.authorize.forEach((item) => {
      if (item.cmd_route == "dashboard" && item.smd_view == 1) {
        this.menus[0].items.push({
          title: "Dashboard",
          route: "/dashboard",
        });
      }

      if (item.cmd_route == "employee" && item.smd_view == 1) {
        this.menus[1].items.push({
          title: "Employees",
          route: "/employee",
        });
      }

      if (item.cmd_route == "customer" && item.smd_view == 1) {
        this.menus[2].items.push({
          title: "Customers",
          route: "/customer",
        });
      }

      if (item.cmd_route == "group-menu" && item.smd_view == 1) {
        this.menus[3].items.push({
          title: "1.Group Menu",
          route: "/group-menu",
        });
      }

      if (item.cmd_route == "menu-detail" && item.smd_view == 1) {
        this.menus[3].items.push({
          title: "2.Menu Detail",
          route: "/menu-detail",
        });
      }

      if (item.cmd_route == "setting-group-menu" && item.smd_view == 1) {
        this.menus[3].items.push({
          title: "3.Setting Authorize",
          route: "/setting-group-menu",
        });
      }

      if (item.cmd_route == "report" && item.smd_view == 1) {
        this.menus[4].items.push({
          title: "Report",
          route: "/report",
        });
      }

      if (item.cmd_route == "so-list" && item.smd_view == 1) {
        this.menus[5].items.push({
          title: "SO List",
          route: "/so-list",
        });
      }

      if (item.cmd_route == "add-so" && item.smd_view == 1) {
        this.menus[5].items.push({
          title: "New so",
          route: "/add-so",
        });
      }

      if (item.cmd_route == "advance-list" && item.smd_view == 1) {
        this.menus[6].items.push({
          title: "Advancelist",
          route: "/advance-list",
        });
      }

      if (item.cmd_route == "new-advance" && item.smd_view == 1) {
        this.menus[6].items.push({
          title: "Add Advance",
          route: "/new-advance",
        });
      }

      if (item.cmd_route == "clearadvance-list" && item.smd_view == 1) {
        this.menus[6].items.push({
          title: "Clear Advancelist",
          route: "/clearadvance-list",
        });
      }

      if (item.cmd_route == "clearadvance-add" && item.smd_view == 1) {
        this.menus[6].items.push({
          title: "Clear Advance",
          route: "/clearadvance-add",
        });
      }
    });

    this.selectedMenu = this.menus.findIndex(
      (menu) =>
        menu.items.findIndex((item) => item.route == this.$route.path) != -1
    );
    // alert(this.selectedMenu);
  },
  data() {
    return {
      authorize: [],
      selectedMenu: 0,
      // menus: [
      //   ["mdi-apps-box", "Stock", "/stock"],
      //   ["mdi-chart-areaspline", "Report", "/report"],
      //   ["mdi mdi-account-multiple", "Employee", "/employee"],
      //   ["mdi mdi-account-multiple", "Customer", "/customer"],
      //   ["mdi mdi-account-convert", "Config", "/config"],
      //   ["mdi mdi-sitemap", "Menu setting", "/roleconfig"],
      // ],
      menus: [
        {
          action: "mdi-apps-box",
          title: "Dashboard",
          items: [],
        },
        {
          action: "mdi mdi-account-multiple",
          title: "ผู้ใช้",
          items: [],
        },
        {
          action: "mdi mdi-sitemap",
          title: "ตั้งค่าระบบ",
          items: [],
        },
        {
          action: "mdi mdi-map",
          title: "แผนที่",
          items: [],
        },
        {
          action: "mdi-chart-areaspline",
          title: "รายงาน",
          items: [],
        },
      ],
    };
  },
  watch: {
    $route(to, from) {
      // this.selectedMenu = this.menus.items.findIndex(
      //   (menu) => menu[2][1] == to.path
      // );

      this.selectedMenu = this.menus.findIndex(
        (menu) => menu.items.findIndex((item) => item.route == to.path) != -1
      );

      // alert(this.selectedMenu);
    },
  },
};
</script>

<style>
.v-list-item-group .v-list-item--active {
  color: #fff !important;
  font-weight: bold;
}

.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  opacity: 0.7;
}

.tile {
  margin: 5px;
  border-radius: 4px;
}
.tile:hover {
  background: green;
}
.tile:active {
  background: yellow;
}

/* .tile {
  color: white;
}

.tile:hover {
  background: green;
}

.tile:active {
  background: #05ab71;
} */
</style>
