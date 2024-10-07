<template>
  <v-card class="ma-3">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="fullname"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>พนักงาน : </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search by username, firstname and lastname..."
            single-line
            outlined
            hide-details
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                :disabled="!authorize_add"
              >
                Add Customer
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row align="center" justify="center">
                    <!-- <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="cust_account"
                        v-model="editedItem.cust_account"
                        label="คำนำหน้า"
                        solo
                        outlined
                      ></v-select>
                    </v-col> -->
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="ชื่อ-ลูกค้า"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <!-- :rules="[rules.required, rules.max]" -->

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-validate="'required'"
                        required
                        outlined
                        :rules="commonRules"
                        :items="company"
                        v-model="editedItem.company_id"
                        item-value="id"
                        item-text="name"
                        label="เลือกบริษัท"
                        solo
                      ></v-select>
                    </v-col>

                    <!-- <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.company_id"
                        label="company_id"
                        outlined
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.address"
                        label="ที่อยู่"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.provice"
                        label="จังหวัด"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.zipcode"
                        label="รหัสไปรษณีย์"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.tel"
                        label="เบอร์โทรศัพท์"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.contact"
                        label="ที่ติดต่อ"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.taxid"
                        label="Tax ID"
                        outlined
                        :rules="[rules13.required, rules13.max]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.branch"
                        label="Branch"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItem.payment_term"
                        label="Payment Term"
                        outlined
                        :rules="[rules2.required, rules2.max]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          :items="emp_status"
                          v-model="editedItem.status"
                          item-text="status_name"
                          item-value="id"
                          label="Status"
                          outlined
                          solo
                        ></v-select>
                      </v-col>
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
  data: () => ({
    prename_t_h: ["นาย", "นาง", "นางสาว"],
    prename_e_n: ["Mr", "Miss", "Mrs."],
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "รหัส", value: "cust_account" },
      { text: "ชื่อ", value: "name" },
      { text: "ชื่อบริษัท", value: "company_name" },
      // { text: "address", value: "address" },
      // { text: "provice", value: "provice" },
      // { text: "zipcode", value: "zipcode" },
      { text: "เบอร์โทร", value: "tel" },
      { text: "ติดต่อ", value: "contact" },
      // { text: "taxid", value: "taxid" },
      // { text: "บริษัท", value: "company_i_d" },
      // { text: "branch", value: "branch" },
      // { text: "payment_term", value: "payment_term" },
      { text: "Status", value: "status_name" },
      // { text: "inserted_at", value: "inserted_at" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      cust_account: "",
      name: "",
      company_id: "",
      address: "",
      provice: "",
      zipcode: "",
      tel: "",
      contact: "",
      taxid: 0,
      branch: "",
      payment_term: 0,
      status: 0,
      inserted_at: 0,
      user_create: 0,
    },
    editedItem2: {
      name: "",
      company_id: "",
      address: "",
      provice: "",
      zipcode: "",
      tel: "",
      contact: "",
      taxid: 0,
      branch: "",
      payment_term: 0,
      status: 0,
      user_update: 0,
    },
    defaultItem: {
      cust_account: "",
      name: "",
      company_id: "",
      address: "",
      provice: "",
      zipcode: "",
      tel: "",
      contact: "",
      taxid: "",
      branch: "",
      payment_term: 0,
      status: 0,
      inserted_at: 0,
    },
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    fullPage: true,
    authorize_view: false,
    authorize_add: false,
    authorize_edit: false,
    authorize_del: false,
    authorize_id: 0,
    company: [],
    commonRules: [(v1) => !!v1 || "This is required"],
    rules: {
      required: (value) => !!value || "Required.",
      max: (v) => v.length <= 8 || "Max 8 characters",
    },
    rules2: {
      required: (value) => !!value || "Required.",
      max: (v) => v.length <= 2 || "Max 2 characters",
    },
    rules13: {
      required: (value) => !!value || "Required.",
      max: (v) => v.length <= 13 || "Max 13 characters",
    },
    emp_status: [
      { id: "A", status_name: "Active" },
      { id: "D", status_name: "Inactive" },
    ],
    editedItemDel: {
      status: "D",
      user_update: 0,
    },
  }),
  components: {
    SuccessDialog,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มพนักงาน" : "แก้ไขข้อมูลพนักงาน";
    },

    filteredData() {
      return this.desserts.filter((row) => {
        const cust_account = row.cust_account?.toLowerCase();
        const name = row.name?.toLowerCase();
        const company_id = row.company_id?.toLowerCase();
        const keyword = this.search.toLowerCase();

        return (
          cust_account.includes(keyword) ||
          name.includes(keyword) ||
          company_id.includes(keyword)
        );
      });
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
  created() {
    this.initialize();
  },
  async mounted() {
    // ----------------- Check Authorize ---------------------------
    const userId = localStorage.getItem(server.USER_ID);
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

    const res_auth = await api.getAuthorize(userId, router_path);

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

    let token = localStorage.getItem(server.USER_ID);
    await this.loadData();

    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }

    let comp_id = localStorage.getItem(server.COMPANYID);
    await this.loadCompanyMaster(comp_id);
  },

  methods: {
    async loadCompanyMaster(id) {
      const result = await api.getCompanyMaster(id);
      this.company = result.data;
    },
    async loadData() {
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

      const result = await api.getAllCustomerList();
      this.desserts = result.data;
      // console.log(this.desserts);
      loader.hide();
    },
    initialize() {
      this.desserts = [
        {
          cust_account: "",
          name: "",
          company_id: "",
          address: "",
          provice: "",
          zipcode: "",
          tel: "",
          contact: "",
          taxid: "",
          branch: "",
          payment_term: 0,
          status: 0,
          inserted_at: 0,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      // const cus = this.desserts[this.editedIndex];
      // const result = await api.deleteCustomer(cus.id);
      const id = this.desserts[this.editedIndex].id;
      this.editedItemDel.user_update = localStorage.getItem(server.USER_ID);

      // alert(id);
      const res_del = await api.updateCustomer(id, this.editedItemDel);
      if (res_del.status == 200) {
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Delete data success",
          "text-h5 green--text text-center"
        );
        await this.loadData();
      } else {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Delete data Failed",
          "text-h5 red--text text-center"
        );
      }

      // this.initialize();
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
      if (this.editedItem.name == "") {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "กรุณากรอกชื่อลูกค้า",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedItem.company_id == 0) {
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "กรุณาเลือกบริษัทลูกค้า",
          "text-h5 red--text text-center"
        );
        return;
      }

      if (this.editedIndex > -1) {
        this.editedItem2.name = this.editedItem.name;
        this.editedItem2.company_id = this.editedItem.company_id;
        this.editedItem2.address = this.editedItem.address;
        this.editedItem2.provice = this.editedItem.provice;
        this.editedItem2.zipcode = this.editedItem.zipcode;
        this.editedItem2.tel = this.editedItem.tel;
        this.editedItem2.contact = this.editedItem.contact;
        this.editedItem2.taxid = this.editedItem.taxid;
        this.editedItem2.branch = this.editedItem.branch;
        this.editedItem2.payment_term = this.editedItem.payment_term;
        this.editedItem2.status = this.editedItem.status;
        this.editedItem2.user_update = localStorage.getItem(server.USER_ID);

        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        const id = this.desserts[this.editedIndex].id;

        const res_edit = await api.updateCustomer(id, this.editedItem2);
        if (res_edit.data.message) {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Failed!!!",
            res_edit.data.message,
            "text-h5 red--text text-center"
          );
          await this.loadData();
        } else {
          this.$store.state.global_dialog = true;
          this.setupAlertDialog(
            true,
            "Success!!!",
            "Edit data success",
            "text-h5 green--text text-center"
          );
          await this.loadData();
        }
      } else {
        // Insert Customer

        this.editedItem.user_create = localStorage.getItem(server.USER_ID);
        const res_add = await api.addCustomer(this.editedItem);
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
          await this.loadData();
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
