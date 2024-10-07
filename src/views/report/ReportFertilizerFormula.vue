<template>
  <v-container>
    <v-row class="pt-10">
      <v-col cols="12">
        <v-btn outlined color="indigo">
          <vue-excel-xlsx
            :data="data"
            :columns="columns"
            :file-name="'cane-receive'"
            :file-type="'xlsx'"
            :sheet-name="'cane-receive'"
          >
            Download Excel
          </vue-excel-xlsx>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="data" class="elevation-1">
        <template v-slot:header.name="{ header }">
          {{ header.text.toUpperCase() }}
        </template>

        <template v-slot:[`item.driver_image`]="{ item }">
          <!-- <v-btn text color="#2561eb" @click="onclickToApprove(item)">
              {{ item.memo_no }}
            </v-btn> -->

          <v-img
            :lazy-src="item.driver_image"
            max-height="150"
            max-width="250"
            :src="item.driver_image"
            @click="onclickImage(item)"
          ></v-img>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="onClickEditStatus(item)"
            v-if="item.truck_status !== 'success'"
            color="primary"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-row>

    <v-dialog v-model="dialogEditStatus" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">แก้ไขข้อมูล</v-card-title>
        <!-- <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="editStatus.truck_status"
              label="สถานะ"
              outlined
            ></v-text-field>
          </v-col>
        </v-row> -->

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.truck_tun_fac"
                  type="number"
                  label="ตันอ้อย/จากโรงงาน"
                  outlined
                  @click:append-outer="increment"
                  @click:prepend="decrement"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.admin_desc"
                  label="หมายเหตุ/Admin"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditStatusDialog"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateAdminUpdateStatus"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogImage" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">รูป</v-card-title>
        <v-card-text>
          <v-img :lazy-src="popup_img" :src="popup_img"></v-img>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeImagePopupDialog"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "report-area-by-farmer",

  async mounted() {
    await this.getReportData();
  },

  data: () => ({
    popup_img: "",
    dialogImage: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    editedItem: {
      truck_status: "success",
      admin_date: new Date(),
      admin_desc: "",
      truck_tun_fac: 0,
    },
    dialogEditStatus: false,
    headers: [
      {
        text: "id",
        align: "center",
        value: "id",
      },
      {
        text: "plot_key",
        align: "center",
        value: "plot_key",
      },
      {
        text: "plot_no",
        align: "center",
        value: "plot_no",
      },
      {
        text: "act_id",
        align: "center",
        value: "act_id",
      },
      {
        text: "driver_id",
        align: "center",
        value: "driver_id",
      },
      {
        text: "register_id",
        align: "center",
        value: "register_id",
      },
      {
        text: "pay_type_id",
        align: "center",
        value: "pay_type_id",
      },
      {
        text: "plot_cost_per_rai",
        align: "center",
        value: "plot_cost_per_rai",
      },
      {
        text: "plot_cost_avg",
        align: "center",
        value: "plot_cost_avg",
      },
      {
        text: "desc",
        align: "center",
        value: "desc",
      },
    ],

    data: [],
    columns: [
      {
        label: "id",
        field: "id",
      },
      {
        label: "คนขับ",
        field: "driver_name",
      },
      {
        label: "ทะเบียนรถ",
        field: "license_plate",
      },
      {
        label: "เลขแปลง",
        field: "plot_no",
      },
      {
        label: "พื้นที่",
        field: "plot_area",
      },
      {
        label: "ชาวไร่",
        field: "farmer_full_name",
      },
      {
        label: "รหัสรถตัด",
        field: "carcut_name",
      },
      {
        label: "สถานะ",
        field: "truck_status",
      },
      {
        label: "ตันอ้อย/จากคนขับรถ",
        field: "truck_tun_driver",
      },
      {
        label: "ตันอ้อย/จากโรงงาน",
        field: "truck_tun_fac",
      },
      {
        label: "รหัสรถ bin",
        field: "bin_code",
      },
      {
        label: "รายละเอียด",
        field: "driver_desc",
      },
      {
        label: "สถานะผู้ดูแลระบบ",
        field: "admin_status",
      },
      {
        label: "รายละเอียดผู้ดูแลระบบ",
        field: "admin_desc",
      },
      {
        label: "วันที่เริ่ม",
        field: "date_start",
      },
      {
        label: "วันที่โรงงาน",
        field: "date_fac",
      },
      {
        label: "วันที่สิ้นสุด",
        field: "date_end",
      },
      {
        label: "วันที่ผู้ดูแลระบบ",
        field: "admin_date",
      },
    ],
    editedItem_id: 0,
  }),

  components: {
    SuccessDialog,
  },

  methods: {
    closeImagePopupDialog() {
      this.dialogImage = false;
    },
    onclickImage(item) {
      this.popup_img = item.driver_image;
      this.dialogImage = true;
    },
    closeEditStatusDialog() {
      this.dialogEditStatus = false;
    },
    async updateAdminUpdateStatus() {
      this.dialogEditStatus = false;

      if (
        this.editedItem.truck_tun_fac == null ||
        this.editedItem.truck_tun_fac == ""
      ) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "ผิดพลาด!!!",
          "กรุณากรอกข้อมูลตันอ้อย/จากโรงงาน",
          "text-h5 red--text text-center"
        );

        return;
      }

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

      await api.updateLOGISTIC_SENDCANE(this.editedItem_id, this.editedItem);
      await this.getReportData();

      loader.hide();

      this.$store.state.global_dialog = true;
      this.setupAlertDialog(
        true,
        "Success!!!",
        "Edit data success",
        "text-h5 green--text text-center"
      );

      // this.$store.dispatch("updateAdminUpdateStatus", {
      //   id: editedItem.id,
      //   admin_status: editedItem.admin_status,
      //   admin_desc: editedItem.admin_desc,
      // });
    },
    increment() {
      editedItem.truck_tun_fac = parseInt(editedItem.truck_tun_fac, 10) + 1;
    },
    decrement() {
      editedItem.truck_tun_fac = parseInt(editedItem.truck_tun_fac, 10) - 1;
    },
    onClickEditStatus(item) {
      // alert(item.id);
      // this.$router.push("/report-plot-detail/" + item.id);
      this.editedItem.truck_tun_fac = item.truck_tun_fac;
      this.editedItem_id = item.id;
      this.dialogEditStatus = true;
    },
    async getReportData() {
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
      // const res_get = await api.getLOGISTIC_SENDCANE();
      const res_get = await api.getActivityFertilizerFormula();
      this.data = res_get.data;

      //   res_get.data.forEach((element) => {
      //     var tmp = {
      //       id: 18,
      //       driver_user_id: 40,
      //       driver_name: "702146เอี่ยว",
      //       plot_no: "6034120004",
      //       plot_area: 29.58,
      //       farmer_pre: "นาย",
      //       farmer_name: "ไฉน",
      //       farmer_lname: "ศรีเชียงษา",
      //       farmer_full_name: "นาย ไฉน ศรีเชียงษา",
      //       carcut_name: "CH-10",
      //       license_plate: "2146",
      //       truck_status: "delivered",
      //       truck_tun_driver: 30,
      //       truck_tun_fac: null,
      //       bin_code: null,
      //       driver_desc: "ทดสอบ",
      //       driver_image: "image-1670041726656.png",
      //       bin_image: null,
      //       date_start: "2022-12-03T04:28:45.000Z",
      //       date_fac: null,
      //       date_end: null,
      //       admin_desc: null,
      //     };

      //     tmp.id = element.id;
      //     tmp.driver_user_id = element.driver_user_id;
      //     tmp.driver_name = element.driver_name;
      //     tmp.plot_no = element.plot_no;
      //     tmp.plot_area = element.plot_area;
      //     tmp.farmer_pre = element.farmer_pre;
      //     tmp.farmer_name = element.farmer_name;
      //     tmp.farmer_lname = element.farmer_lname;
      //     tmp.farmer_full_name = element.farmer_full_name;
      //     tmp.carcut_name = element.carcut_name;
      //     tmp.license_plate = element.license_plate;
      //     tmp.truck_status = element.truck_status;
      //     tmp.truck_tun_driver = element.truck_tun_driver;
      //     tmp.truck_tun_fac = element.truck_tun_fac;
      //     tmp.bin_code = element.bin_code;
      //     tmp.driver_desc = element.driver_desc;
      //     tmp.driver_image = `https://taokaemodernfarm-api.tk/api/image/${element.driver_image}`;
      //     tmp.bin_image = element.bin_image;
      //     tmp.date_start = element.date_start;
      //     tmp.date_fac = element.date_fac;
      //     tmp.date_end = element.date_end;
      //     tmp.admin_desc = element.admin_desc;

      //     this.data.push(tmp);
      //   });

      loader.hide();
      console.log("getReportData: " + JSON.stringify(this.data));
      //   console.table(res_get.data);
      //   console.table(this.data);
    },
    onSubmit() {
      console.log("submit");
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
  },
};
</script>

<style></style>
