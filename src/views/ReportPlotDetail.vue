<template>
  <v-row class="pa-10">
    <v-col cols="12">
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:header.name="{ header }">
          {{ header.text.toUpperCase() }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "report-plot-detail",

  async created() {
    await this.getGISReportPlotDetail(this.$route.params.id);
  },

  data: () => ({
    headers: [
      {
        text: "โควต้า",
        align: "start",
        value: "quota_id",
      },
      { text: "ชาวไร่", value: "full_name" },
      { text: "เลขแปลง", value: "plot_no" },
      { text: "ประเภทอ้อย", value: "cane_type_name" },
      { text: "พื้นที่ (ไร่)", value: "plot_area" },
    ],
    desserts: [],
  }),
  methods: {
    onClickDetail(item) {
      alert(item.id);
    },
    async getGISReportPlotDetail(id) {
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

      //   alert("initialize");
      const res_get = await api.getGISReportPlotDetail(id);
      this.desserts = res_get.data;
      loader.hide();
      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
      //   console.table(res_get.data);
    },
    onSubmit() {
      console.log("submit");
    },
  },
};
</script>

<style></style>
