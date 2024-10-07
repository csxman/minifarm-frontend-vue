<template>
  <v-card>
    <v-row class="mt-5 ml-5 mr-5">
      <v-col cols="12" md="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Username, firstname ,lastname..."
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="search"
          :items="department_list"
          label="Department"
          filled
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="search"
          :items="position_list"
          label="Position"
          filled
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="3">
        <v-autocomplete
          v-model="search"
          :items="status_list"
          label="Status"
          filled
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1  ma-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row class="row1 mt-5  pt-5">
            <!-- <v-col cols="12" md="3">
              <v-select
                :items="department"
                v-model="editedItem.department_i_d"
                item-text="name"
                item-value="id"
                label="Department"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                :items="position"
                v-model="editedItem.position_i_d"
                item-text="name"
                item-value="id"
                label="Position"
                solo
              >
              </v-select>
            </v-col> -->
            <!-- <v-col cols="12" md="2">
              <v-select
                :items="emp_status"
                v-model="editedItem.emp_status"
                label="Status"
                solo
              ></v-select>
            </v-col> -->

            <!-- <v-col cols="12" md="2">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="dialog = true"
              >
                เพิ่มพนักงาน
              </v-btn>
            </v-col> -->
          </v-row>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="addEmp"
                :disabled="!authorize_add"
              >
                เพิ่มพนักงาน
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="prename_t_h"
                        v-model="editedItem.prename_t_h"
                        label="คำนำหน้า"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.firstname"
                        label="Firstname Thai"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Lastname Thai"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="prename_e_n"
                        v-model="editedItem.prename_e_n"
                        label="Title"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.firstname_e_n"
                        label="Firstname English"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.lastname_e_n"
                        label="Lastname English"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Phone Number"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.emp_i_d"
                        label="Employee Id"
                        outlined
                      ></v-text-field>
                    </v-col> -->

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.abbname_e_n"
                        label="Abb Name English"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="authorize"
                        v-model="editedItem.authorize_id"
                        item-value="id"
                        item-text="sgm_name"
                        label="Authorize"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="company"
                        v-model="editedItem.company_i_d"
                        item-value="id"
                        item-text="name"
                        label="Company Name"
                        @change="changeCompany"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          v-validate="'required'"
                          required
                          outlined
                          :rules="commonRules"
                          :items="department"
                          v-model="editedItem.department_i_d"
                          item-text="name"
                          item-value="id"
                          label="Department"
                          solo
                        ></v-select>
                      </v-col>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="position"
                        v-model="editedItem.position_i_d"
                        item-text="name"
                        item-value="id"
                        label="Position"
                        solo
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.emp_rate"
                        label="Rate"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          :items="emp_status"
                          v-model="editedItem.emp_status"
                          item-text="status_name"
                          item-value="id"
                          label="Status"
                          solo
                        ></v-select>
                      </v-col>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="User Name"
                        outlined
                        :disabled="!toggleDisable"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        type="password"
                        outlined
                        :disabled="!toggleDisable"
                      ></v-text-field>
                    </v-col>

                    <!-- <v-col cols="12" sm="4" md="4">
                      <v-file-input
                        label="image"
                        filled
                        prepend-icon="mdi-camera"
                        type="file"
                        @change="onFileSelected"
                      ></v-file-input>
                    </v-col> -->
                    <v-col cols="12" sm="4" md="4">
                      <input type="file" @change="onFileSelected" />
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-card>
                        <v-img
                          lazy-src="https://upload.wikimedia.org/wikipedia/en/2/24/Crystal_personal.svg"
                          max-height="150"
                          class="mt-3"
                          aspect-ratio="1.7"
                          contain
                          :src="getImage()"
                        ></v-img>
                      </v-card>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          v-if="authorize_edit"
        >
          mdi-pencil
        </v-icon>
        <!-- <v-icon small @click="deleteItem(item)" v-if="authorize_del">
          mdi-delete
        </v-icon> -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="loadAccounts">
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
import { imageUrl } from "@/services/constants";
export default {
  data: () => ({
    commonRules: [(v1) => !!v1 || "This is required"],
    usernameRules: [(v1) => !!v1 || "Username is required"],
    passwordRules: [
      (v1) => !!v1 || "Password is required",
      (v2) =>
        !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) ||
        "Minimum eight characters, at least one letter and one number",
    ],
    prename_t_h: ["นาย", "นาง", "นางสาว"],
    prename_e_n: ["Mr", "Miss", "Mrs."],
    emp_status: [
      { id: "A", status_name: "Active" },
      { id: "D", status_name: "Inactive" },
    ],
    status_list: ["Active", "Inactive"],
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    fullPage: true,
    search: "",
    headers: [
      //{ text: "คำนำหน้า", value: "prename_t_h" },
      {
        text: "ชื่อ",
        align: "start",
        sortable: false,
        value: "firstname",
      },
      { text: "นามสกุล", value: "lastname" },
      // { text: "เบอร์", value: "phone" },
      // { text: "username", value: "username" },
      // { text: "role", value: "role" },
      // { text: "รหัสพนักงาน", value: "emp_i_d" },
      // { text: "prename_e_n", value: "prename_e_n" },
      { text: "ชื่อ-อังกฤษ", value: "firstname_e_n" },
      { text: "สกุล-อังกฤษ", value: "lastname_e_n" },
      //{ text: "abbname_e_n", value: "abbname_e_n" },
      { text: "บริษัท", value: "company_name" },
      { text: "แผนก", value: "department_name" },
      { text: "ตำแหน่ง", value: "position_name" },
      //{ text: "Rate", value: "emp_rate" },
      { text: "สถานะ", value: "emp_status_name" },
      //{ text: "email", value: "email" },
      // { text: "password", value: "password" },
      //{ text: "image", value: "image" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    position: [],
    department: [],
    department_list: [],
    position_list: [],
    company: [],
    editedIndex: -1,
    editedItemDel: {
      emp_status: "D",
      user_update: 0,
    },
    editedItem: {
      prename_t_h: "",
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      emp_i_d: "",
      prename_e_n: "",
      firstname_e_n: "",
      lastname_e_n: "",
      abbname_e_n: "",
      company_i_d: 0,
      department_i_d: 0,
      position_i_d: 0,
      authorize_id: 0,
      emp_rate: 0.0,
      emp_status: "A",
      email: "",
      password: "",
      image: null,
      role: "",
      filename: "demo.png",
    },
    defaultItem: {
      prename_t_h: "",
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      role: "",
      emp_i_d: "",
      prename_e_n: "",
      firstname_e_n: "",
      lastname_e_n: "",
      abbname_e_n: "",
      company_i_d: 0,
      department_i_d: 0,
      position_i_d: 0,
      emp_rate: 0.0,
      emp_status: "",
      email: "",
      password: "",
      image: "",
    },
    imageURL: null,
    toggleDisable: true,
    edit_item_id: 0,
    userId: 0,
    authorize: [],
    authorize_view: false,
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    authorize_id: 0,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มพนักงาน" : "แก้ไขข้อมูลพนักงาน";
    },

    filteredData() {
      return this.desserts.filter((row) => {
        const name = row.firstname?.toLowerCase();
        const lastname = row.lastname?.toLowerCase();
        const username = row.username?.toLowerCase();
        const keyword = this.search.toLowerCase();

        return (
          name.includes(keyword) ||
          lastname.includes(keyword) ||
          username.includes(keyword)
        );
      });
    },
  },
  components: {
    SuccessDialog,
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
    this.initialize();
  },

  async mounted() {
    // ----------------- Check Authorize ---------------------------
    this.userId = localStorage.getItem(server.USER_ID);
    let yourUrlString = window.location;
    // alert(yourUrlString);

    let parser = document.createElement("a");
    parser.href = yourUrlString;

    this.authorize_id = localStorage.getItem(server.AUTHORIZE_ID);
    // alert("authorize_id:" + this.authorize_id);
    if (this.authorize_id == null || this.authorize_id == 0) {
      // this.$router.push("/login");
      this.$store.state.global_dialog = true;
      this.setupAlertDialog(
        true,
        "Authorize Failed!!!",
        "Please Logout And Login Again!!!",
        "text-h5 red--text text-center"
      );
      this.$router.back();
    }

    const router_path = parser.pathname.replace("/", "");

    const res_auth = await api.getAuthorize(this.userId, router_path);

    // console.log("res_auth:" + JSON.stringify(res_auth.data));

    this.authorize_view = res_auth.data[0].smd_view >= 1 ? true : false;
    this.authorize_add = res_auth.data[0].smd_add >= 1 ? true : false;
    this.authorize_edit = res_auth.data[0].smd_edit >= 1 ? true : false;
    this.authorize_del = res_auth.data[0].smd_del >= 1 ? true : false;

    // console.log("res_auth:" + JSON.stringify(res_auth.data));
    // console.log("authorize_view:" + this.authorize_view);
    // console.log("authorize_add:" + this.authorize_add);
    // console.log("authorize_edit:" + this.authorize_edit);
    // console.log("authorize_del:" + this.authorize_del);
    // this.$router.back();

    if (!this.authorize_view) {
      this.$router.back();
    }

    // ----------------- Check Authorize ---------------------------

    let comp_id = localStorage.getItem(server.COMPANYID);
    await this.loadCompanyMaster(comp_id);
    await this.loadDepartmentMaster(comp_id);
    await this.loadPositionMaster(comp_id);
    await this.loadAuthorize();
    await this.loadAccounts();
    // this.userId = localStorage.getItem(server.USER_ID);
    if (this.userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
  },

  methods: {
    async changeCompany(selectObj) {
      // console.log(selectObj)
      // alert(selectObj);
      await this.loadDepartmentMaster(selectObj);
      await this.loadPositionMaster(selectObj);
    },
    addEmp() {
      this.toggleDisable = true;
    },
    getImage() {
      // console.log(`url_img : ${imageUrl}/${this.editedItem.image}`);
      return `${imageUrl}/${this.editedItem.image}`;
    },
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // for preview image
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      // for upload image
      this.editedItem.image = event.target.files[0];

      // console.log("result image body : ", this.editedItem.image);
    },
    async loadAccounts() {
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

      const result = await api.getAccounts();
      this.desserts = result.data;

      loader.hide();
    },

    async loadCompanyMaster(id) {
      const result = await api.getCompanyMaster(id);
      this.company = result.data;
    },

    async loadDepartmentMaster(id) {
      const result = await api.getDepartmentMaster(id);
      // console.log("result.data : ", JSON.stringify(result.data));
      this.department = result.data;

      result.data.forEach((item) => {
        this.department_list.push(item.name);
      });
    },
    async loadAuthorize() {
      const res_get = await api.getSettingGroupMenu();
      // console.log("res loadAuthorize : ", JSON.stringify(res_get));
      this.authorize = res_get.data;
    },

    async loadPositionMaster(id) {
      const result = await api.getPositionMaster(id);
      // console.log("result.data : ", JSON.stringify(result.data));
      this.position = result.data;

      result.data.forEach((item) => {
        this.position_list.push(item.name);
      });
    },

    async loadDetailAccount(id) {
      // console.log("loadDetailAccount:", id + "//");
      const result = await api.getAccountDetail(id);
      // console.log("loadDetailAccount result: ", JSON.stringify(result));
      this.editedItem = Object.assign({}, result.data[0]);
    },

    initialize() {
      this.desserts = [
        {
          prename_t_h: "prename_t_h",
          firstname: "firstname",
          lastname: "lastname",
          emp_i_d: "emp_i_d",
          prename_e_n: "prename_e_n",
          firstname_e_n: "firstname_e_n",
          lastname_e_n: "lastname_e_n",
          abbname_e_n: "abbname_e_n",
          company_i_d: "company_i_d",
          department_i_d: "department_i_d",
          position_i_d: "position_i_d",
          emp_rate: "emp_rate",
          emp_status: "emp_status",
          role: "",
        },
      ];
    },

    editItem(item) {
      this.toggleDisable = false;
      this.loadDetailAccount(item.id);
      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // alert(item.company_i_d);
      // alert(item.department_i_d);
      // alert(item.position_i_d);

      this.loadDepartmentMaster(item.company_i_d);
      this.loadPositionMaster(item.company_i_d);

      this.dialog = true;
    },

    deleteItem(item) {
      // this.editedIndex = this.desserts.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;

      this.edit_item_id = item.id;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      // const account = this.desserts[this.editedIndex];
      // const result = await api.deleteUserAccount(account.id);
      // this.closeDelete();

      this.editedItemDel.user_update = this.userId;
      this.desserts.splice(this.editedIndex, 1);
      const res_del = await api.deleteUserAccount(
        this.edit_item_id,
        this.editedItemDel
      );
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
      await this.loadAccounts();
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
      // alert("save");

      if (this.editedItem.prename_t_h == "") {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter pre name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.firstname == "") {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter first name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.lastname == "") {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter last name",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.username == "") {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter username",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.password == "") {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please enter password",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.authorize_id == 0) {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select authorize",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.company_i_d == 0) {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select company",
          "text-h5 red--text text-center"
        );
        return;
      }
      if (this.editedItem.department_i_d == 0) {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select department",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.position_i_d == 0) {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Please select position",
          "text-h5 red--text text-center"
        );
        return;
      }

      let formData = new FormData();
      formData.append("emp_i_d", this.editedItem.emp_i_d);
      formData.append("user_role", this.editedItem.role);
      formData.append("username", this.editedItem.username);
      formData.append("password", this.editedItem.password);
      formData.append("email", this.editedItem.email);
      formData.append("phone", this.editedItem.phone);
      formData.append("prename_t_h", this.editedItem.prename_t_h);
      formData.append("firstname", this.editedItem.firstname);
      formData.append("lastname", this.editedItem.lastname);
      formData.append("prename_e_n", this.editedItem.prename_e_n);
      formData.append("firstname_e_n", this.editedItem.firstname_e_n);
      formData.append("lastname_e_n", this.editedItem.lastname_e_n);
      formData.append("abbname_e_n", this.editedItem.abbname_e_n);
      formData.append("company_i_d", this.editedItem.company_i_d);
      formData.append("department_i_d", this.editedItem.department_i_d);
      formData.append("position_i_d", this.editedItem.position_i_d);
      formData.append("emp_rate", this.editedItem.emp_rate);
      formData.append("emp_status", this.editedItem.emp_status);
      formData.append("authorize_id", this.editedItem.authorize_id);
      formData.append("image", this.editedItem.image);
      // console.log("formData : ", formData);

      if (this.editedIndex > -1) {
        formData.append("user_update", this.userId);

        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        const id = this.desserts[this.editedIndex].id;
        // alert(id);
        // const payload = this.editedItem;
        const res_edit = await api.updateUserAccount(id, formData);

        // console.log("res_edit : ", JSON.stringify(res_edit.data));
        // alert(res_edit.status);

        // if (res_edit.status == 200 || res_edit.status == 201) {
        //   this.setupAlertDialog(
        //     true,
        //     "Success!!!",
        //     "Edit data success",
        //     "text-h5 green--text text-center"
        //   );
        //   this.loadAccounts();
        // } else {
        //   this.setupAlertDialog(
        //     true,
        //     "Failed!!!",
        //     "Edit data Failed",
        //     "text-h5 red--text text-center"
        //   );
        // }

        if (res_edit.data.message) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_edit.data.message,
            "text-h5 red--text text-center"
          );
          await this.loadAccounts();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Edit data success",
            "text-h5 green--text text-center"
          );
          await this.loadAccounts();
        }
      } else {
        formData.append("user_create", this.userId);

        // Insert
        const res_add = await api.addUserAccount(formData);

        // console.log("res_add : ", JSON.stringify(res_add.data));
        // alert(res_add.status);

        // if (res_add.status === 201 || res_add.status === 200) {
        //   this.setupAlertDialog(
        //     true,
        //     "Success!!!",
        //     "Add data success",
        //     "text-h5 green--text text-center"
        //   );
        //   // this.initialize();
        //   this.loadAccounts();
        // } else {
        //   this.setupAlertDialog(
        //     true,
        //     "Failed!!!",
        //     "Add data Failed",
        //     "text-h5 red--text text-center"
        //   );
        // }

        if (res_add.data.message) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_add.data.message,
            "text-h5 red--text text-center"
          );
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Add data success",
            "text-h5 green--text text-center"
          );
          await this.loadAccounts();
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
<style>
.row1 {
  padding-top: 20px;
}
</style>
