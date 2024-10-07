<template>
  <v-container>
    <v-row class="pt-10">
      <v-col cols="12">
        <v-btn outlined color="indigo">
          <vue-excel-xlsx
            :data="data"
            :columns="columns"
            :file-name="'report-area-by-farmer'"
            :file-type="'xlsx'"
            :sheet-name="'report-area-by-farmer'"
          >
            Download Excel
          </vue-excel-xlsx>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="pa-10">
      <v-col cols="12">
        <v-data-table :headers="headers" :items="data" class="elevation-1">
          <template v-slot:header.name="{ header }">
            {{ header.text.toUpperCase() }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="onClickDetail(item)">
              mdi-information-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "report-area-by-farmer",

  async created() {
    await this.getReportAreaByFarmer();
  },

  data: () => ({
    headers: [
      {
        text: "โควต้า",
        align: "start",
        value: "quota_id",
      },
      { text: "ชาวไร่", value: "full_name" },
      { text: "อ้อยปลูก (ไร่)", value: "plot_area_1" },
      { text: "อ้อยตอ (ไร่)", value: "plot_area_2" },
      { text: "Actions", value: "actions" },
    ],
    data: [],
    columns: [
      {
        label: "โควต้า",
        field: "quota_id",
      },
      {
        label: "ชาวไร่",
        field: "full_name",
      },
      {
        label: "อ้อยปลูก (ไร่)",
        field: "plot_area_1",
      },
      {
        label: "อ้อยตอ (ไร่)",
        field: "plot_area_2",
      },
    ],
  }),
  methods: {
    onClickDetail(item) {
      //   alert(item.id);
      this.$router.push("/report-plot-detail/" + item.id);
    },
    async getReportAreaByFarmer() {
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
      const res_get = await api.getGISReport();
      this.data = res_get.data;
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
