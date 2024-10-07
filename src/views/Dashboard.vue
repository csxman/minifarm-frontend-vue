<template>
  <v-container>
    <!-- Summary section -->
    <v-row class="pt-10">
      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="ชาวไร่ (คน)"
          :subtitle="c_farmers"
          avatar_bg="#fc4a3e"
          avatar_ic="mdi-beekeeper"
          link="/farmer"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="All Area (ไร่)"
          avatar_ic="mdi-spa-outline"
          avatar_bg="#f39c12"
          :subtitle="c_all_area"
          link="/report-area-by-farmer"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="อ้อยปลูก (ไร่)"
          avatar_ic="mdi-sprout-outline"
          avatar_bg="#169b0a"
          :subtitle="c_plant_area"
          link="/report-area-by-farmer"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="อ้อยตอ (ไร่)"
          avatar_ic="mdi-sprout-outline"
          avatar_bg="#118aff"
          :subtitle="c_ratoon_area"
          link="/report-area-by-farmer"
        />
      </v-col>
    </v-row>

    <br />
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "../services/constants";
import StockCard from "@/components/cards/StockCard";

export default {
  name: "Dashboard",
  data() {
    return {
      c_farmers: 0,
      c_all_area: 0,
      c_plant_area: 0,
      c_ratoon_area: 0,
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      fullPage: true,
      headers: [
        {
          text: "Id",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" },
      ],
    };
  },
  components: {
    StockCard,
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

    await this.getDashboard();

    const userId = localStorage.getItem(server.USER_ID);
    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
    // console.log("Login mounted : " + api.isLoggedIn());
    // console.log("Login mounted : " + userId);
    // await this.loadProducts();

    // loader.hide();
  },
  methods: {
    async getDashboard() {
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

      //   alert("initialize");
      const res_get = await api.getDashboard();
      // this.desserts = res_get.data;

      res_get.data.forEach((item) => {
        this.c_farmers = item.all_farmer;
        this.c_all_area = item.all_area;
        this.c_plant_area = item.plant_area;
        this.c_ratoon_area = item.ratoon_area;
      });

      // loader.hide();
      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
      //   console.table(res_get.data);
    },
    submit() {
      let loader = this.$loading.show({
        // Optional parameters
        color: "green",
        loader: "dots",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        width: 120,
        height: 120,
        backgroundColor: "#F1F4F7",
        opacity: 0.5,
        zIndex: 999,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 2000);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    editItem(item) {
      this.$router.push(`/stock-edit/${item.id}`);
    },
    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteProduct(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProducts();
    },
    async loadProducts() {
      let result = await api.getProducts();
      this.mDataArray = result.data;
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
};
</script>

<style></style>
