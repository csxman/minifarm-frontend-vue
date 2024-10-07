<template>
  <v-card class="ma-3">
    <v-toolbar flat >
      <v-toolbar-title>ตั้งค่าข้อมูล</v-toolbar-title>
    </v-toolbar>
    <v-tabs fixed-tabs background-color="indigo" dark class="pl-2 pr-2" color="yellow">
      <v-tab>
        <v-icon left>
          mdi mdi-checkbox-multiple-marked-outline
        </v-icon>
        ตำแหน่ง
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi mdi-clipboard-flow
        </v-icon>
        แผนก
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi mdi-city
        </v-icon>
        บริษัท
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi mdi-note-text
        </v-icon>
        Job Title
      </v-tab>
      <!-- Start ตำแหน่ง-->
      <v-tab-item>
        <v-data-table
          :headers="position"
          :items="position_config"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dark color="blue " class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by Depart"
              ></v-select
              ><v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by Company"
              ></v-select>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    เพิ่มตำแหน่ง
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle_position }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.position_i_d"
                            label="ตำแหน่ง"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="department_i_d"
                            v-model="editedItem.department_i_d"
                            label="Department"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="company_i_d"
                            v-model="editedItem.company_i_d"
                            label="Company"
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
                    >แน่ใจต้องการลบตำแหน่ง?</v-card-title
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
      <!-- End ตำแหน่ง-->

      <!-- Start แผนก-->
      <v-tab-item>
        <v-data-table
          :headers="department"
          :items="department_config"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dark color="blue " class="mb-1">
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by Depart"
              ></v-select
              ><v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by Company"
              ></v-select>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    เพิ่มแผนก
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle_department }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.department_i_d"
                            label="แผนก"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="company_i_d"
                            v-model="editedItem.company_i_d"
                            label="Company"
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
                    >แน่ใจต้องการลบ แผนก?</v-card-title
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
      <!--End แผนก-->
      <!--Start บริษัท-->
      <v-tab-item>
        <v-data-table
          :headers="company"
          :items="company_config"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dark color="blue " class="mb-1">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    เพิ่มบริษัท
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle_company }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.company_i_d"
                            label="Company"
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
                    >แน่ใจต้องการลบ แผนก?</v-card-title
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
      <!--End บริษัท-->
      <!-- Start joptile -->
      <v-tab-item>
        <v-data-table
          :headers="joptitle"
          :items="joptitle_config"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dark color="blue " class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search joptile"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by Depart"
              ></v-select
              ><v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by Company"
              ></v-select>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    เพิ่ม joptitle
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle_joptitle}}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.joptitle_i_d"
                            label="joptitle"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="department_i_d"
                            v-model="editedItem.department_i_d"
                            label="Department"
                            solo
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="company_i_d"
                            v-model="editedItem.company_i_d"
                            label="Company"
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
                    >แน่ใจต้องการลบjoptitle?</v-card-title
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
      <!-- End joptile -->
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    position: [
      { text: "ตำแหน่ง", value: "position_i_d" },
      { text: "แผนก", value: "department_i_d" },
      { text: "บริษัท", value: "company_i_d" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    department: [
      { text: "แผนก", value: "department_i_d" },
      { text: "บริษัท", value: "company_i_d" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    company: [
      { text: "บริษัท", value: "company_i_d" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    joptitle: [
      { text: "joptitle", value: "joptitle_i_d" },
      { text: "แผนก", value: "department_i_d" },
      { text: "บริษัท", value: "company_i_d" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    position_config: [],
    department_config: [],
    company_config: [],
    joptitle_config: [],
    editedIndex: -1,
    editedItem: {
      position_i_d: "",
      department_i_d: "",
      company: "",
      joptitle: "",
    },
    defaultItem: {
      position_i_d: "",
      department_i_d: "",
      company: "",
      joptitle: "",
    },
  }),

  computed: {
    formTitle_position() {
      return this.editedIndex === -1 ? "เพิ่มตำแหน่ง" : "แก้ไขตำแหน่ง";
    },
    formTitle_department() {
      return this.editedIndex === -1 ? "เพิ่มแผนก" : "แก้ไขแผนก";
    },
    formTitle_company() {
      return this.editedIndex === -1 ? "เพิ่มบริษัท" : "แก้ไขบริษัท";
    },
    formTitle_joptitle() {
      return this.editedIndex === -1 ? "เพิ่มjoptitle" : "แก้ไขjoptitle";
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

  methods: {
    initialize() {
      // this.below get from database
      this.position_config = [
        {
          position_i_d: "Accouting",
          department_i_d: "IT",
          company_i_d: "Dejudom ltd.",
        },
        {
          position_i_d: "Progammer",
          department_i_d: "IT",
          company_i_d: "Digital comperate ltd.",
        },
      ];
      this.department_config = [
        {
          department_i_d: "IT",
          company_i_d: "Dejudom ltd.",
        },
        {
          department_i_d: "IT",
          company_i_d: "Digital comperate ltd.",
        },
      ];
      this.company_config = [
        {
          company_i_d: "Dejudom ltd.",
        },
        {
          company_i_d: "Digital comperate ltd.",
        },
      ];
      this.joptitle_config = [
        {
          joptitle_i_d: "joptitle",
          department_i_d: "IT",
          company_i_d: "Dejudom ltd.",
        },
        {
          joptitle_i_d: "joptitle",
          department_i_d: "IT",
          company_i_d: "Digital comperate ltd.",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.position_config.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.position_config.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.position_config.splice(this.editedIndex, 1);
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.position_config[this.editedIndex], this.editedItem);
      } else {
        this.position_config.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
