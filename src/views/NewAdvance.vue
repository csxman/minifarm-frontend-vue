<template>
  <v-card-title>
    <v-container class="pa-10">
      <!-- Summary section -->

      <!-- Table section -->
      <!-- <v-divider></v-divider> -->

      <v-card class="pa-10">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <span> Add Advance </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col class="text-right" cols="12" md="12">
            <span>No. 0000</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="text-right" cols="12" md="12">
            <span>Date. {{ dateCurrent }}</span>
          </v-col>
        </v-row>
        <br />
        <hr />
        <br />

        <v-simple-table>
          <template v-slot:default>
            <!-- <button @click="Addinputtable()">Add</button>-->
            <thead>
              <tr class="bg-colorth">
                <th class="text-left">
                  No
                </th>
                <th class="text-left">
                  Detail
                </th>
                <th class="text-left">
                  Withdraw Amount
                </th>
                <th class="text-left">
                  Clear Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <template>
                <tr v-for="(item, index) in desserts" :key="item">
                  <td>
                    <v-text-field
                      v-model="desserts[index].no"
                      @keydown.enter="Addinputtable(desserts[index])"
                      required
                      prepend-icon="mdi-file"
                      label="No"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      v-model="desserts[index].detail"
                      @keydown.enter="Addinputtable(desserts[index])"
                      required
                      prepend-icon="mdi-file-document-multiple-outline"
                      label="Detail"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      type="number"
                      v-model="desserts[index].withdrawamount"
                      @keyup="processmoney"
                      @keydown.enter="Addinputtable(desserts[index])"
                      required
                      prepend-icon="mdi-cash-multiple"
                      label="Withdraw Amount"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      type="number"
                      v-model="desserts[index].amountcleared"
                      @keyup="processmoney"
                      @keydown.enter="Addinputtable(desserts[index])"
                      required
                      prepend-icon="mdi-cash-multiple"
                      label="Amount Cleared"
                    ></v-text-field>
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
          <!-- table top section -->
          <template v-slot:top>
            <v-row class="row1 mt-3  pt-3">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="setusername"
                  outlined
                  disabled
                  dense
                  label="Employeename :"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="department"
                  outlined
                  disabled
                  dense
                  label="Department :"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="row1 mt-3  pt-3">
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  dense
                  label="For Customer :"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
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
                      label="DateClear :"
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
            </v-row>
            <br />
            <hr />
            <br />
          </template>
          <template v-slot:body.append>
            <tr>
              <td>
                <v-text-field outlined dense label="รหัสการเบิก"></v-text-field>
              </td>
              <td>
                <v-text-field outlined dense label="รายละเอียด"></v-text-field>
              </td>
              <td colspan="4">
                <v-text-field outlined dense label="จำนวนเงิน"></v-text-field>
              </td>
            </tr>
          </template>
        </v-simple-table>
        <br />
        <hr />
        <br />
        <v-row>
          <v-col class="text-right" cols="12" md="6">Total </v-col>
          <v-col class="text-right" cols="12" md="6">
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col class="text-right" cols="12" md="12">
                    <v-text-field
                      filled
                      disabled
                      outlined
                      dense
                      v-model="sumwithdrawamount"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col class="text-right" cols="12" md="12">
                    <v-text-field
                      filled
                      disabled
                      outlined
                      dense
                      v-model="sunamountcleared"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col class="text-right" cols="12" md="6">
                Total Left Over Amount
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  filled
                  disabled
                  outlined
                  dense
                  v-model="totalleftoveramount"
                ></v-text-field>
              </v-col>
              <v-col class="text-right" cols="12" md="2">
                Bath
              </v-col>
            </v-row>
          </v-col>
          <v-col class="text-right" cols="12" md="6"> </v-col>
        </v-row>
        <br />
        <hr />
        <br />

        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <v-radio-group v-model="radioGroup" @change="changeradio()">
              <v-radio
                v-for="name in radioType"
                :key="name"
                :label="`${name}`"
                :value="name"
              ></v-radio>
            </v-radio-group>
            <v-text-field
              :filled="!checkchequefilled"
              :disabled="!checkcheque"
              outlined
              dense
              label="เลขที่เช็ค"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="selectbankname"
                  :items="bankname"
                  label="โอนเข้าธนาคาร"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined dense label="เลขที่"></v-text-field>
              </v-col>
            </v-row>
            <br />
            <v-text-field outlined dense label="หมายเหตุ"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="center" cols="12" md="4">
            <v-row>
              <VueSignaturePad
                class="signature mb-15"
                width="96%"
                height="200"
                ref="signaturePaddefault"
                :options="options"
              />
            </v-row>
            <br />
            <hr />
            <!--<v-text-field  label="Signature"></v-text-field> -->
            <p class="text-center">Requester</p>
            <p class="text-center">Date {{ dateCurrent }}</p>
          </v-col>

          <v-col align="center" cols="12" md="4">
            <v-row :style="{ visibility: showsig1 ? 'visible' : 'hidden' }">
              <VueSignaturePad
                class="signature"
                width="96%"
                height="200"
                ref="firstsignaturePad"
                :options="options"
              />
              <v-row
                :style="{
                  visibility: showbuttonsavesig1 ? 'visible' : 'hidden',
                }"
              >
                <v-col align="center">
                  <v-btn depressed class="ml-5" @click="clearsig1()">
                    Clear
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    class="mr-5 mb-5 primary"
                    depressed
                    @click="savesig1()"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-row>
            <v-btn class="mr-2" @click="editsig1()">
              {{ defaultwordbuttonsig1 }}
              <v-icon right>mdi-border-color</v-icon>
            </v-btn>
            <br />
            <hr />
            <p class="text-center">Approver</p>
            <p class="text-center">Date {{ dateCurrent }}</p>
          </v-col>
          <v-col align="center" cols="12" md="4">
            <v-row :style="{ visibility: showsig2 ? 'visible' : 'hidden' }">
              <VueSignaturePad
                class="signature"
                width="96%"
                height="200"
                ref="secondsignaturePad"
                :options="options"
              />
              <v-row
                :style="{
                  visibility: showbuttonsavesig2 ? 'visible' : 'hidden',
                }"
              >
                <v-col align="center">
                  <v-btn depressed class="ml-5" @click="clearsig2()">
                    Clear
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    class="mr-5 mb-5 primary"
                    depressed
                    @click="savesig2()"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-row>
            <v-btn class="mr-2" @click="editsig2()">
              {{ defaultwordbuttonsig2 }}
              <v-icon right>mdi-border-color</v-icon>
            </v-btn>
            <br />
            <hr />
            <p class="text-center">Approver</p>
            <p class="text-center">Date {{ dateCurrent }}</p>
          </v-col>
        </v-row>
        <br />
        <hr />
        <br />
        <v-row>
          <v-col align="center" cols="12" md="12">
            <v-btn depressed class="mr-5 buttonblue">
              Save
            </v-btn>

            <v-btn depressed>
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-card-title>
</template>

<script>
import api from "@/services/api";
import { server } from "../services/constants";
import StockCard from "@/components/cards/StockCard";

export default {
  name: "NewAdvance",
  data() {
    return {
      options: {
        penColor: "#000000",
        backgroundColor: "rgb(255,255,255)",
      },
      initial_data2:
        "data:image/png;base64,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",
      initial_data1:
        "data:image/png;base64,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",
      initial_data:
        "data:image/png;base64,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",
      checkcheque: false,
      checkchequefilled: false,
      showsig1: false,
      showsig2: false,
      showbuttonsavesig1: false,
      showbuttonsavesig2: false,
      defaultwordbuttonsig1: "Signature",
      defaultwordbuttonsig2: "Signature",
      totalleftoveramount: 0.0,
      sumwithdrawamount: 0.0,
      sunamountcleared: 0.0,
      showallamount: "",
      desserts: [
        {
          no: "",
          detail: "",
          withdrawamount: 0,
          amountcleared: 0,
        },
      ],
      selectbankname: "",
      bankname: ["กรุงไทย", "ไทยพาณิชย์", "กสิกร"],
      radioType: ["cash", "cheque"],
      radioGroup: "",
      setusername: localStorage.getItem(server.USERNAME),
      department: "DCM",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateCurrent: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      // mDataArray: [{ id: "1", detail: "gg", amout: "1000" }],
      fullPage: true,
      headers: [
        {
          text: "No.",
          sortable: false,
          value: "no",
        },
        { text: "Details", value: "detail" },
        { text: "Withdraw Amount", value: "withdrawamount" },
        { text: "Amount Cleared", value: "amountcleared" },
      ],
    };
  },
  components: {
    StockCard,
  },
  computed: {
    version() {
      return this.initial_data;
    },
  },
  async mounted() {
    console.log("gg");
    this.$forceUpdate();
    this.showdefaultsignature();
    // let yourUrlString = window.location;
    // alert(yourUrlString);

    // let parser = document.createElement("a");
    // parser.href = yourUrlString;

    // parser.protocol; // => "http:"
    // parser.hostname; // => "example.com"
    // parser.port; // => "3000"
    // parser.pathname; // => "/pathname/"
    // parser.search; // => "?search=test"
    // parser.hash; // => "#hash"
    // parser.host; // => "example.com:3000"

    // alert(parser.pathname);

    const userId = localStorage.getItem(server.USER_ID);
    if (userId && api.isLoggedIn()) {
      // this.$router.push("/");
    } else {
      this.$store.state.isLogged = false;
      this.$router.push("/login");
    }
    // console.log("Login mounted : " + api.isLoggedIn());
    // console.log("Login mounted : " + userId);
    // await this.loadProducts();
  },

  methods: {
    submit() {
      let loader = this.$loading.show({
        // Optional parameters
        color: "green",
        loader: "dots",
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        width: 120,
        height: 120,
        backgroundColor: "#F1F4F7",
        opacity: 0.5,
        zIndex: 999,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 2000);
    },
    editsig1() {
      this.showsig1 = true;
      this.showbuttonsavesig1 = true;
      this.$refs.firstsignaturePad.openSignaturePad();
    },
    editsig2() {
      this.showsig2 = true;
      this.showbuttonsavesig2 = true;
      this.$refs.secondsignaturePad.openSignaturePad();
    },
    clearsig1() {
      this.$refs.firstsignaturePad.clearSignature();
    },
    clearsig2() {
      this.$refs.secondsignaturePad.clearSignature();
    },
    savesig1() {
      this.defaultwordbuttonsig1 = "Edit";
      const { isEmpty, data } = this.$refs.firstsignaturePad.saveSignature();
      this.showbuttonsavesig1 = false;
      this.$refs.firstsignaturePad.lockSignaturePad();
    },
    savesig2() {
      this.defaultwordbuttonsig2 = "Edit";
      const { isEmpty, data } = this.$refs.secondsignaturePad.saveSignature();
      this.showbuttonsavesig2 = false;
      this.$refs.secondsignaturePad.lockSignaturePad();
    },
    changeradio() {
      if (this.radioGroup === "cheque") {
        this.checkcheque = true;
        this.checkchequefilled = true;
      } else {
        this.checkcheque = false;
        this.checkchequefilled = false;
      }
    },
    showdefaultsignature() {
      this.$nextTick(() => {
        this.$refs.signaturePaddefault.fromDataURL(this.initial_data);
        this.$refs.signaturePaddefault.lockSignaturePad();
        this.$refs.firstsignaturePad.fromDataURL(this.initial_data1);
        // this.$refs.firstsignaturePad.lockSignaturePad();
        this.$refs.secondsignaturePad.fromDataURL(this.initial_data2);
        // this.$refs.secondsignaturePad.lockSignaturePad();
      });
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    editItem(item) {
      this.$router.push(`/stock-edit/${item.id}`);
    },
    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    Addinputtable(item) {
      if (
        item.no === "" ||
        item.detail === "" ||
        item.withdrawamount === "" ||
        item.amountcleared === ""
      ) {
        return;
      }
      this.desserts.push({
        id: "",
        detail: "",
        withdrawamount: 0,
        amountcleared: 0,
      });
      console.log(this.desserts);
    },
    processmoney() {
      this.sumwithdrawamount = 0.0;
      this.sunamountcleared = 0.0;
      let sumall = this.desserts.map(function(item) {
        return [
          parseFloat(item.withdrawamount),
          parseFloat(item.amountcleared),
        ];
      });

      sumall.forEach((x, index) => {
        this.sumwithdrawamount += x[0];
        this.sunamountcleared += x[1];
      });
      this.totalleftoveramount = this.sumwithdrawamount - this.sunamountcleared;
      this.totalleftoveramount = this.totalleftoveramount.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      // this.totalleftoveramount = this.totalleftoveramount.toFixed(2);
      this.sumwithdrawamount = this.sumwithdrawamount.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      this.sunamountcleared = this.sunamountcleared.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    async confirmDelete() {
      await api.deleteProduct(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProducts();
    },
    async loadProducts() {
      let result = await api.getProducts();
      this.mDataArray = result.data;
    },
  },
  async beforeCreate() {
    console.log("beforeCreate");
    this.$store.state.navMenu = true;
    // this.showdefaultsignature();
  },
  async created() {
    // this.showdefaultsignature();
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
.v-btn:not(.v-btn--round).v-size--default.buttonblue {
  background-color: #3d4c8f;
}
.v-autocomplete.v-input > .v-input__control > .v-input__slot {
  min-height: 10px;
}
</style>
