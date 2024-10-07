<template>
  <v-card>
    <v-card-title>
      Sales Oder
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search รหัสลูกค้า / ชื่อลูกค้า"
        single-line
        hide-details
        outlined
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1 ma-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>รายการ Sales Oder</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="primary" to="add-so">
                + New SO
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.sgm_name"
                        label="Setting Group Menu Name"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="mx-2" fab dark small color="cyan" to="/add-so">
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="error" to="/add-so">
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-card>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";
export default {
  name: "so-list",
  data: () => ({
    dialog: false,
    search: "",
    dialogDelete: false,
    dialogEdit: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    headers: [
      {
        text: "รหัสเอกสาร",
        align: "start",
        value: "id",
      },
      { text: "วันที่เอกสาร", value: "sgm_name" },
      { text: "รหัสลูกค้า", value: "sgm_name" },
      { text: "ชื่อลูกค้า", value: "sgm_name" },
      { text: "สถานะเอกสาร", value: "sgm_name" },
      { text: "ผู้บันทึก", value: "sgm_name" },
      { text: "แก้ไข", value: "actions", sortable: false },
    ],
    desserts: [],

    editedIndex: -1,
    editedItem: {
      sgm_name: "",
      user_create: 0,
      user_update: 0,
    },
    editedItem2: {
      sgm_name: "",
      user_update: 0,
    },
    edit_item_id: 0,
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    setting_menu_detail: {
      setting_group_menu_id: 0,
      group_menu_id: 0,
      menu_detail_id: 0,
      user_create: 0,
    },
    fullPage: true,
    checkDataLoop: false,
    mArrayInsertMenuDetail: [],
  }),
  components: {
    SuccessDialog,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    async initialize() {
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
      const res_get = await api.getSettingGroupMenu();
      this.desserts = res_get.data;
      loader.hide();
      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
    },

    async editItem(item) {
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

      this.edit_item_id = item.id;
      //   this.editedIndex = this.desserts.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      //   this.dialog = true;
      // Go To Setting Menu Detail

      const res_main_for_check = await api.getMenuDetail();
      console.log(
        "editItem res_main_for_check: " +
          JSON.stringify(res_main_for_check.data.count)
      );

      const res_check = await api.getSMD_ById(item.id);
      console.log(
        "editItem res_check: " + JSON.stringify(res_check.data.count)
      );
      console.log("editItem res_check: " + JSON.stringify(res_check.data.rows));

      if (res_check.data.count < res_main_for_check.data.count) {
        // alert("0");
        console.log(
          "editItem res_main_for_check: " +
            JSON.stringify(res_main_for_check.data.rows)
        );
        this.setting_menu_detail.user_create = localStorage.getItem(
          server.USER_ID
        );

        this.mArrayInsertMenuDetail = res_main_for_check.data.rows;

        // Start Loop Check Data
        for (let i = 0; i < res_main_for_check.data.count; i++) {
          this.checkDataLoop = false;
          console.log("Loop Data: " + this.mArrayInsertMenuDetail[i].id);
          this.setting_menu_detail.setting_group_menu_id = item.id;
          this.setting_menu_detail.group_menu_id = this.mArrayInsertMenuDetail[
            i
          ].group_menu_id;
          this.setting_menu_detail.menu_detail_id = this.mArrayInsertMenuDetail[
            i
          ].id;

          for (let i = 0; i < res_check.data.count; i++) {
            console.log(
              "Sub Loop Data menu_detail_id: " +
                this.setting_menu_detail.menu_detail_id +
                " compare id :" +
                res_check.data.rows[i].menu_detail_id
            );
            if (
              this.setting_menu_detail.menu_detail_id ==
              res_check.data.rows[i].menu_detail_id
            ) {
              console.log("Sub Loop Data True");
              this.checkDataLoop = true;
            }
            if (this.checkDataLoop == true) {
              break;
            }
          }

          console.log("Sub Loop Data End");
          console.log("Sub Loop checkDataLoop :" + this.checkDataLoop);
          if (this.checkDataLoop == false) {
            const res_add_stdt = await api.createSettingMenuDetail(
              this.setting_menu_detail
            );
            console.log("Loop Data " + i + ":" + res_add_stdt.status);
          }
        }
        // End Loop Check Data
        loader.hide();
        this.$router.push(`/setting-menu-detail/${item.id}`);
      } else {
        loader.hide();
        this.$router.push(`/setting-menu-detail/${item.id}`);
      }
    },

    deleteItem(item) {
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      const res_del = await api.deleteSettingGroupMenu(this.edit_item_id);
      if (res_del.status == 200) {
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        this.initialize();
      } else {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed",
          "text-h5 red--text text-center"
        );
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        // Go To Setting Menu Detail
      } else {
        // alert("create");
        this.editedItem.user_create = localStorage.getItem(server.USER_ID);
        const res_add = await api.createSettingGroupMenu(this.editedItem);
        if (res_add.status == 200) {
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
          );
          this.initialize();
        } else {
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Add data Failed",
            "text-h5 red--text text-center"
          );
        }
      }

      this.close();
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
