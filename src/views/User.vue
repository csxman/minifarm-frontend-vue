<template>
  <v-card>
    <v-card-title>
      ข้อมูล พนักงาน
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
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
          <v-toolbar-title>รายการ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                + เพิ่ม พนักงาน
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
                        v-model="editedItem.user_full_name"
                        label="ชื่อ-สกุล"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        dense
                        :rules="commonRules"
                        :items="userRole"
                        v-model="editedItem.user_type_id"
                        item-value="id"
                        item-text="user_type_name"
                        label="เลือกสิทธิ์"
                        @change="changeUserRole"
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                  <!-- <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.user_role"
                        label="สิทธิ์"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.user_tel"
                        label="เบอร์โทร"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.user_address"
                        label="ที่อยู่"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        name="username"
                        label="Username"
                        id="username"
                        :disabled="isEditMode"
                        outlined
                        dense
                        v-model="editedItem.username"
                        :rules="usernameRules"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        outlined
                        dense
                        :disabled="isEditMode"
                        :append-icon="
                          isShowPassword ? 'visibility' : 'visibility_off'
                        "
                        @click:append="isShowPassword = !isShowPassword"
                        :type="isShowPassword ? 'text' : 'password'"
                        counter
                        v-model="editedItem.password"
                        :rules="passwordRules"
                      />
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
        <v-icon
          small
          class="mr-2"
          @click.prevent="$router.push('/reset-password/' + item.id)"
        >
          mdi-account-cog
        </v-icon>

        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
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
  name: "user",
  data: () => ({
    isShowPassword: false,
    userRole: [],
    isEditMode: false,
    commonRules: [(v1) => !!v1 || "This is required"],
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
        text: "รหัส",
        align: "start",
        value: "id",
      },
      { text: "ชื่อ-สกุล", value: "user_full_name" },
      { text: "สิทธิ์", value: "user_type_name" },
      { text: "เบอร์โทร", value: "user_tel" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      user_full_name: "",
      user_type_id: "",
      user_role: "",
      user_tel: "",
      user_address: "",
      username: "",
      password: "",
      user_created: 0,
      user_updated: 0,
    },
    editedItem2: {
      user_full_name: "",
      user_type_id: "",
      user_role: "",
      user_tel: "",
      user_address: "",
      username: "",
      password: "",
      user_updated: 0,
    },
    edit_item_id: 0,
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    fullPage: true,
    authorize_view: false,
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    authorize_id: 0,
  }),
  components: {
    SuccessDialog,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
    },
  },

  async mounted() {
    // const userId = localStorage.getItem(server.USER_ID);
    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
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
    await this.loadUserRole()();
  },

  methods: {
    async loadUserRole() {
      const result = await api.getUserType();
      this.userRole = result.data;
    },
    async changeUserRole(selectObj) {
      // console.log(selectObj)
      //   alert(selectObj);
      this.editedItem.user_type_id = selectObj;
      this.editedItem2.user_type_id = selectObj;
    },
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
      const res_get = await api.getAccounts();
      this.desserts = res_get.data;
      loader.hide();
      //   console.log("initialize desserts: " + JSON.stringify(res_get.data));
    },

    editItem(item) {
      this.isEditMode = true;
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      const res_del = await api.deleteAccount(this.edit_item_id);
      if (res_del.status == 200) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        this.initialize();
      } else {
        this.$store.state.global_dialog = true;
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
      this.isEditMode = false;
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
      this.isEditMode = false;
      if (this.editedIndex > -1) {
        this.editedItem2.user_updated = localStorage.getItem(server.USER_ID);
        this.editedItem2.user_full_name = this.editedItem.user_full_name;
        this.editedItem2.user_type_id = this.editedItem.user_type_id;
        this.editedItem2.user_role = this.editedItem.user_role;
        this.editedItem2.user_tel = this.editedItem.user_tel;
        this.editedItem2.user_address = this.editedItem.user_address;
        this.editedItem2.username = this.editedItem.username;
        this.editedItem2.password = this.editedItem.password;

        // console.log("user edit : ", JSON.stringify(this.editedItem2));

        const res_edit = await api.updateUserAccount(
          this.edit_item_id,
          this.editedItem2
        );
        if (res_edit.status == 200) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Edit data success",
            "text-h5 green--text text-center"
          );
          this.initialize();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            "Edit data Failed",
            "text-h5 red--text text-center"
          );
        }
      } else {
        // alert("create");
        this.editedItem.user_created = localStorage.getItem(server.USER_ID);

        const res_add = await api.createAccount(this.editedItem);
        if (res_add.status == 200 || res_add.status == 201) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
          );
          this.initialize();
        } else {
          this.$store.state.global_dialog = true;
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
