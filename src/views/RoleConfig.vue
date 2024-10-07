<template>
  <v-card class="ma-3">
    <v-toolbar flat>
      <v-toolbar-title>ตั้งค่าข้อมูล Authorize</v-toolbar-title>
    </v-toolbar>
    <v-tabs
      fixed-tabs
      centered
      background-color="blue-grey darken-4"
      dark
      class="pl-2 pr-2"
      color="yellow"
    >
      <v-tab>
        <v-icon left>
          mdi mdi-menu
        </v-icon>
        Menu
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi mdi-group
        </v-icon>
        Group
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi mdi-read
        </v-icon>
        Role Authorize
      </v-tab>
      <!-- Start menu-->
      <v-tab-item>
        <v-data-table
          :headers="menu"
          :items="menu_config"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dark color="teal darken-1" class="mb-1">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    เพิ่มเมนู
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle_menu }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="editedItem.menu_i_d"
                            label="เมนู"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            :items="menutype"
                            v-model="editedItem.menutype"
                            label="ประเภทเมนู"
                            solo
                          ></v-select>
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
                    >แน่ใจต้องการลบเมนู?</v-card-title
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
      </v-tab-item>
      <!-- End menu-->

      <!-- Start Group-->
      <v-tab-item>
        <v-data-table
          :headers="group"
          :items="group_config"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dark color="teal darken-1" class="mb-1">
              <v-dialog v-model="dialog1" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    เพิ่ม group
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle_group }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem1.group_i_d"
                            label="Group Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="userlist"
                            v-model="editedItem1.user_i_d"
                            label="User"
                            attach
                            chips
                            multiple
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close1">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save1">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete1" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >แน่ใจต้องการลบ Group?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete1"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm1"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem1(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem1(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-tab-item>
      <!--End Group-->

      <!-- Start Role -->
      <v-tab-item>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  เมนู
                </th>
                <th class="text-left">
                  Group
                </th>
                <th class="text-left">
                  สิทธิ์
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Home</td>
                <td>Staff Account</td>
                <td>
                  <v-row>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Add"
                        color="red"
                        value="add"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Edit"
                        color="indigo"
                        value="edit"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Delete"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="ReadOnly"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Staff IT</td>
                <td>
                  <v-row>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Add"
                        color="red"
                        value="add"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Edit"
                        color="indigo"
                        value="edit"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Delete"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="ReadOnly"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td>Report</td>
                <td>Staff Account</td>
                <td>
                  <v-row>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Add"
                        color="red"
                        value="add"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Edit"
                        color="indigo"
                        value="edit"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Delete"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="ReadOnly"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Staff IT</td>
                <td>
                  <v-row>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Add"
                        color="red"
                        value="add"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Edit"
                        color="indigo"
                        value="edit"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="Delete"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-checkbox
                        v-model="ex4"
                        label="ReadOnly"
                        color="orange"
                        value="delete"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <!-- End Role -->
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    dialogDelete: false,
    dialogDelete1: false,
    menu: [
      { text: "เมนู", value: "menu_i_d" },
      { text: "ประเภท", value: "menutype" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    menutype: ["Menu", "Sub-menu"],
    userlist: ["Jeep", "Plam", "Guvanch", "ruzee"],
    getmenu: ["home", "report", "config", "role"],
    gg: ["IT", "Accout", "adminIT", "View"],
    group: [
      { text: "Group Name", value: "group_i_d" },
      { text: "User", value: "user_i_d" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    menu_config: [],
    group_config: [],
    editedIndex: -1,
    editedIndex1: -1,
    editedItem: {
      menu_i_d: "",
      menutype: "",
      user_i_d: "",
    },
    defaultItem: {
      menu_i_d: "",
      menutype: "",
      user_i_d: "",
    },
    editedItem1: {
      menu_i_d: "",
      menutype: "",
      user_i_d: "",
    },
    defaultItem1: {
      menu_i_d: "",
      menutype: "",
      user_i_d: "",
    },
  }),

  computed: {
    formTitle_menu() {
      return this.editedIndex === -1 ? "เพิ่มเมนู" : "แก้ไขเมนู";
    },
    formTitle_group() {
      return this.editedIndex1 === -1 ? "เพิ่มกลุ่ม" : "แก้ไขกลุ่ม";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialog1(val) {
      val || this.close1();
    },
    dialogDelete1(val) {
      val || this.closeDelete1();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // this.below get from database
      this.menu_config = [
        {
          menu_i_d: "รายงาน ลา",
          menutype: "Sub-menu",
        },
        {
          menu_i_d: "Menusetting",
          menutype: "Menu",
        },
      ];
      this.group_config = [
        {
          group_i_d: "Staff Account",
          user: ["Jeep", "Plam", "Guvanch"],
        },
        {
          group_i_d: "Menusetting",
          user: ["Jeep", "Guvanch"],
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.menu_config.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem1(item) {
      this.editedIndex1 = this.group_config.indexOf(item);
      this.editedItem1 = Object.assign({}, item);
      this.dialog1 = true;
    },

    deleteItem(item) {
      this.editedIndex = this.menu_config.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItem1(item) {
      this.editedIndex1 = this.group_config.indexOf(item);
      this.editedItem1 = Object.assign({}, item);
      this.dialogDelete1 = true;
    },

    deleteItemConfirm() {
      this.menu_config.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    deleteItemConfirm1() {
      this.group_config.splice(this.editedIndex1, 1);
      this.closeDelete1();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    close1() {
      this.dialog1 = false;
      this.$nextTick(() => {
        this.editedItem1 = Object.assign({}, this.defaultItem1);
        this.editedIndex1 = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete1() {
      this.dialogDelete1 = false;
      this.$nextTick(() => {
        this.editedItem1 = Object.assign({}, this.defaultItem1);
        this.editedIndex1 = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.menu_config[this.editedIndex], this.editedItem);
      } else {
        this.menu_config.push(this.editedItem);
      }
      this.close();
    },
    save1() {
      if (this.editedIndex1 > -1) {
        Object.assign(this.group_config[this.editedIndex1], this.editedItem1);
      } else {
        this.group_config.push(this.editedItem1);
      }
      this.close1();
    },
  },
};
</script>
