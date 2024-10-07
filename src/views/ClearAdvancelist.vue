<template>
  <v-container class="pa-10">
    <v-card class="pa-10">
      <!-- <v-row>
        <v-col cols="12" md="10"> </v-col>
        <v-col class="text-right" cols="12" md="2">
          <v-select
            fluid
            @change="changelange"
            item-text="name"
            item-value="name"
            v-model="defaultlanguage"
            :items="chooselanguage"
            outlined
            dense
          >
            <template v-slot:selection="{ item }">
              {{ item.name }}
              <country-flag :country="item.flag" size="small" />
            </template>
            <template v-slot:item="{ item }">
              {{ item.name }}
              <country-flag :country="item.flag" size="small" />
            </template>
          </v-select>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title class="text-h5">Clear Advancelist</v-card-title>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search : Name ,Customername"
            single-line
            hide-details
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end mb-6">
          <v-btn class="mr-2" @click="showsearchmore">
            {{ setlanguage.adddata }}
            <v-icon right>{{ seticonsearchmore.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-show="toggleEnable">
        <v-col cols="12" md="3"> </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="DateFrom"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="DateTo"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            v-model="selectstatus"
            :items="status"
            label="Status"
            outlined
            dense
          ></v-autocomplete>
        </v-col>
      </v-row>
      <hr />
      <br />

      <v-card class="pa-5" outlined tile>
        <v-data-table
          dense
          :search="search"
          :headers="headers"
          :items="mDataArray"
          class="elevation-1  ma-5 595959"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              depressed
              class="mx-2"
              color="blue-grey"
              x-small
              @click="onClickLogOff"
            >
              Clear
            </v-btn>
          </template>
          <!--     <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template> -->
        </v-data-table>
      </v-card>

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
    </v-card>
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";
import { language } from "./language/Advancelist.js";

export default {
  name: "advance-list",
  data() {
    return {
      toggleEnable: false,
      selectstatus: "",
      status: ["Approved", "Unapproved"],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateCurrent: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      seticonsearchmore: { icon: "mdi mdi-chevron-down", action: false },
      setlanguage: language.en,
      defaultlanguage: "en",
      // regexlang: "th",
      chooselanguage: [
        { name: "en", flag: "gb" },
        { name: "th", flag: "th" },
      ],
      aa: "สวัสดี",
      dialogEdit: false,
      dialogDelete: false,
      mDataArray: [
        {
          no: 1,
          date: "1/11/2022",
          name: "testname",
          customer: "ABS co Ltd",
          amount: "10,000",
          status: "Unapproved",
        },
        {
          no: 2,
          date: "2/11/2022",
          name: "testname2",
          customer: "ABS co Ltd",
          amount: "3,000",
          status: "Approved",
        },
      ],
      headers: [
        {
          text: "Document No.",
          value: "no",
          class: "bg-colorth",
        },
        {
          text: "Date",
          value: "date",
          class: "bg-colorth",
        },
        {
          text: "Name",
          value: "name",
          class: "bg-colorth",
        },
        {
          text: "customer",
          value: "customer",
          class: "bg-colorth",
        },
        {
          text: "Amount",
          value: "amount",
          class: "bg-colorth",
        },
        {
          text: "Status",
          value: "status",
          class: "bg-colorth",
        },
        {
          text: "",
          value: "actions",
          class: "bg-colorth",
        },
      ],
    };
  },
  async beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
  },
  async created() {
    // this.headers = language.en.headertable;
    // this.initialize();
  },
  beforeUpdate() {},
  methods: {
    editItem() {},
    changelange: function(newVal, oldVal) {
      if (this.defaultlanguage === "en") {
        console.log(language.en.headertable);
        this.headers = language.en.headertable;

        // this.headers[0].text = language.en.headertable.no;

        this.setlanguage = Object.assign({}, language.en);
      } else {
        this.headers = language.th.headertable;
        this.setlanguage = Object.assign({}, language.th);
      }
      console.log("เช็คภาษา ===");
      console.log(this.headers);
    },
    showsearchmore() {
      this.toggleEnable = !this.toggleEnable;
      this.seticonsearchmore.action = !this.seticonsearchmore.action;
      if (this.seticonsearchmore.action === true) {
        this.seticonsearchmore.icon = "mdi mdi-chevron-up";
      } else {
        this.seticonsearchmore.icon = "mdi mdi-chevron-down";
      }
    },
  },
};
</script>

<style>
.bg-colorth {
  background-color: #595959;
  color: red;
}
.text-left {
  color: aliceblue;
}
</style>
