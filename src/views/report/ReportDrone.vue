<template>
  <v-container>
    <v-row class="pt-10">
      <v-col cols="12">
        <v-btn outlined color="indigo">
          <vue-excel-xlsx
            :data="data"
            :columns="columns"
            :file-name="'report-drone'"
            :file-type="'xlsx'"
            :sheet-name="'report-drone'"
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

        <template v-slot:[`item.image`]="{ item }">
          <!-- <v-btn text color="#2561eb" @click="onclickToApprove(item)">
              {{ item.memo_no }}
            </v-btn> -->

          <v-img
            :lazy-src="item.image"
            max-height="150"
            max-width="250"
            :src="item.image"
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
        text: "เลขแปลง",
        align: "center",
        value: "plot_no",
      },
      {
        text: "พื้นที่",
        align: "center",
        value: "plot_area",
      },
      {
        text: "โควต้า",
        align: "center",
        value: "quota_id",
      },
      {
        text: "ชื่อชาวไร่",
        align: "center",
        value: "quota_name",
      },
      {
        text: "กิจกรรม",
        align: "center",
        value: "act_name",
      },
      {
        text: "ประเภท Drone",
        align: "center",
        value: "drone_type_name",
      },
      {
        text: "สูตรปุ๋ย",
        align: "center",
        value: "fertilizer_formula_name",
      },
      {
        text: "พขร",
        align: "center",
        value: "driver_user_name",
      },
      {
        text: "ชื่อ Drone",
        align: "center",
        value: "drone_",
      },
      {
        text: "รูป",
        align: "center",
        value: "image",
      },
    ],

    data: [],
    columns: [
      {
        label: "id",
        field: "id",
      },
      {
        label: "plot_key",
        field: "plot_key",
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
        label: "โควต้า",
        field: "quota_id",
      },
      {
        label: "กิจกรรม",
        field: "act_name",
      },

      {
        label: "ประเภท Drone",
        field: "drone_type_name",
      },
      {
        label: "สูตรปุ๋ย",
        field: "fertilizer_formula_name",
      },
      {
        label: "พขร",
        field: "driver_user_name",
      },
      {
        label: "ชื่อ Drone",
        field: "drone_",
      },

      {
        label: "ต้นทุน/ไร่",
        field: "cost_rai",
      },
      {
        label: "ต้นทุน/รวม",
        field: "cost_avg",
      },
      {
        label: "รายละเอียด",
        field: "desc",
      },
      {
        label: "วันที่สร้าง",
        field: "created_at",
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
      this.popup_img = item.image;
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
      const res_get = await api.getActivityDrone();
      // this.data = res_get.data;

      res_get.data.forEach((element) => {
        var tmp = {
          id: 2,
          plot_key: null,
          plot_no: null,
          plot_area: null,
          quota_id: null,
          quota_name: "0 null",
          act_name: "โดรน",
          drone_type_name: "โดรนปุ๋ย",
          fertilizer_formula_name: "46-0-0",
          driver_user_name: "พขร ที่1",
          drone_: "678",
          water: 2,
          cost_rai: 123,
          cost_avg: 2452.62,
          image: "image-1654920725965.png",
          desc: "นนน",
          user_created: "นาย วิทยา จันทร์ฟอง",
          created_at: "2022-06-11T04:12:07.000Z",
        };

        tmp.id = element.id;
        tmp.plot_key = element.plot_key;
        tmp.plot_no = element.plot_no;
        tmp.plot_area = element.plot_area;
        tmp.quota_id = element.quota_id;
        tmp.quota_name = element.quota_name;
        tmp.act_name = element.act_name;
        tmp.drone_type_name = element.drone_type_name;
        tmp.fertilizer_formula_name = element.fertilizer_formula_name;
        tmp.driver_user_name = element.driver_user_name;
        tmp.drone_ = element.drone_;
        tmp.water = element.water;
        tmp.cost_rai = element.cost_rai;
        tmp.cost_avg = element.cost_avg;
        tmp.image = `https://taokaemodernfarm-api.tk/api/image/${element.image}`;
        tmp.desc = element.desc;
        tmp.user_created = element.user_created;
        tmp.created_at = element.created_at;

        this.data.push(tmp);
      });

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
