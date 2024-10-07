<template>
  <div cols="12" lg="6" md="6" sm="12" :align="mLoc">
    <v-row>
      <v-app-bar app color="#fbcc2c">
        <v-app-bar-nav-icon
          @click="$store.state.navMenu = !$store.state.navMenu"
        ></v-app-bar-nav-icon>

        <div v-if="!mobile_sta">
          <v-toolbar-title>{{ title }} V {{ version }} </v-toolbar-title>
        </div>

        <v-spacer></v-spacer>

        <span>{{ $store.getters["fullname"] | capitalize }}</span
        >&ensp;
        <span>{{ $store.getters["role"] | capitalize }}</span>
        <v-btn icon @click="onClickLogOff">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
    </v-row>

    <!-- <v-row v-if="!mobile_check">
      <v-app-bar app color="#fbcc2c">
        <v-app-bar-nav-icon
          @click="$store.state.navMenu = !$store.state.navMenu"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }} V {{ version }} </v-toolbar-title>
        <v-spacer></v-spacer>

        <span>{{ $store.getters["fullname"] | capitalize }}</span
        >&ensp;
        <span>{{ $store.getters["role"] | capitalize }}</span>
        <v-btn icon @click="onClickLogOff">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
    </v-row> -->
  </div>
</template>

<script>
export default {
  name: "Header",
  // created() {
  //   if (this.isMobile() == true) {
  //     this.mobile_sta = true;
  //   } else {
  //     this.mobile_sta = false;
  //   }
  //   // alert(this.mobile_sta);
  //   console.log(this.mobile_sta);
  // },

  mounted() {
    this.mobile_sta = this.isMobile();
    console.log(this.mobile_sta);
  },
  data: () => ({
    mobile_sta: false,
  }),
  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
    title() {
      return process.env.VUE_APP_TITLE;
    },
    getENV() {
      return process.env.NODE_ENV;
    },
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    onClickLogOff() {
      this.$store.state.navMenu = false;
      this.$store.dispatch("doLogout");
    },
  },
};
</script>

<style></style>
