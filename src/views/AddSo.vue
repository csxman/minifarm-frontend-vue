<template>
  <v-card class="mx-auto" max-width="1000">
    <v-card-title>
      <v-container>
        <!-- grey lighten-5 -->
        <v-form v-model="valid">
          <v-container>
            <!-- So no-->
            <v-row>
              <v-col cols="12" md="4">
                <v-icon fab left>
                  mdi mdi-file
                </v-icon>
                <span>SO No:{{ "S22-0001" }}</span>
              </v-col>
            </v-row>
            <!-- /End Sono-->
            <!-- So Date-->
            <v-row>
              <v-col cols="12" md="4">
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
                      label="SO DATE"
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
            <!-- /end so date----->
            <v-card class="pa-5" outlined tile>
              <v-row class="adjust0">
                <v-col cols="12" md="3">
                  <!-- auto select following select customer-name -->
                  <v-text-field
                    value="C00323"
                    outlined
                    disabled
                    dense
                    label="รหัสลูกค้า"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="9">
                  <v-select
                    v-model="e3"
                    :items="customer"
                    menu-props="auto"
                    label="ชื่อลูกค้า"
                    dense
                    hide-details
                    prepend-icon="mdi-account-box"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
              <!-- /collum1 -->
              <v-row class="adjust1">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="lastname"
                    label="Po No."
                    required
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="PO DATE"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="เลขที่ประจำตัวผู้เสียภาษี"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- /column2 -->
              <v-row class="adjust1">
                <v-col cols="12" md="3">
                  ที่อยู่ออก Invoice
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    label="ที่อยู่ออก Invoice"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- /collum1.1 -->
              <v-row class="adjust1">
                <v-col cols="12" md="3">
                  <!-- auto select following select customer-name -->
                  ที่อยู่ลูกค้า
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    label="ที่อยู่ส่งสินค้า"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- /column2 -->
              <v-row class="adjust1">
                <v-col cols="12" md="3">
                  ที่อยู่ออก Invoice
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    label="ที่อยู่ออก Invoice"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- /column3 -->
              <v-row class="adjust1">
                <v-col cols="12" md="4">
                  <!-- auto select following select customer-name -->
                  <v-select
                    v-model="e3"
                    :items="payment"
                    menu-props="auto"
                    label="Payment Term"
                    hide-details
                    prepend-icon="mdi-calendar-clock"
                    single-line
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="e3"
                    :items="currency"
                    menu-props="auto"
                    label="currency"
                    hide-details
                    prepend-icon="mdi-currency-btc"
                    single-line
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Delivery DATE"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <!-- colum4 -->
              <v-row class="adjust1">
                <v-col cols="12" md="4">
                  <v-file-input
                    chips
                    solo
                    multiple
                    show-size
                    small-chips
                    truncate-length="15"
                    label="Attached File"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="8">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="รายละเอียดเพิ่มเติม"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-form>
        <!-- end -->
      </v-container>
    </v-card-title>

    <v-card-actions>
      <v-btn color="orange lighten-2" text>
        Row Details
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-container>
          <v-row align="center" justify="end">
            <v-btn class="mx-2 " fab small dark right color="indigo">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
            <span class="subheading mr-2"></span>
          </v-row>
          <v-form v-model="valid">
            <v-container>
              <!-- /end so date----->
              <v-card class="pa-5" outlined tile>
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr class="bg-color0">
                        <th class="text-left">
                          ลำดับ
                        </th>
                        <th class="text-left">
                          รหัสสินค้า
                        </th>
                        <th class="text-left">
                          ชื่อสินค้า
                        </th>
                        <th class="text-left">
                          จำนวน
                        </th>
                        <th class="text-left">
                          หน่วย
                        </th>
                        <th class="text-left">
                          ราคา/หน่อย
                        </th>
                        <th class="text-left">
                          รวม
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>idxxxx</td>
                        <td>Consultant</td>
                        <td>2</td>
                        <td>ชม</td>
                        <td>3,000</td>
                        <td>6,000</td>
                        <td>
                          <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                          </v-icon>
                          <v-icon small @click="deleteItem(item)">
                            mdi-delete
                          </v-icon>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>id444</td>
                        <td>Create doucment</td>
                        <td>1</td>
                        <td>ea</td>
                        <td>3,000</td>
                        <td>3,000</td>
                        <td>
                          <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                          </v-icon>
                          <v-icon small @click="deleteItem(item)">
                            mdi-delete
                          </v-icon>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5"></td>
                        <td>สุทธิ</td>
                        <td>9,000</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="5"></td>
                        <td>Vat</td>
                        <td>630</td>
                        <td></td>
                      </tr>
                      <tr class="bg-color">
                        <td colspan="5"></td>
                        <td>รวม</td>
                        <td>9,630</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
              <div class="text-center pt-2">
                <v-btn rounded class="mr-2">
                  กลับ
                </v-btn>
                <v-btn
                  rounded
                  color="primary"
                  class="mr-2"
                  @click="toggleOrder"
                >
                  บันทึก
                </v-btn>
                <v-btn rounded color="error" @click="nextSort">
                  ยกเลิก
                </v-btn>
              </div>
            </v-container>
          </v-form>
          <!-- end -->
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    name: "add-so",
    show: true,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    e1: "Florida",
    e2: "Texas",
    e3: null,
    e4: null,
    payment: ["30day", "90Day", "120Day"],
    currency: ["THB", "USD"],
    customer: [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Federated States of Micronesia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Marshall Islands",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Palau",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  }),
};
</script>
<style>
.v-application .pa-5 {
  padding: 20px !important;
}
.adjust0 {
  padding-top: 5px;
  margin-bottom: -41px;
}
.adjust1 {
  margin-bottom: -41px;
}
.bg-color {
  background-color: #dcdcdc;
  color: #f00;
}
.bg-color0 {
  background-color: #dcdcdc;
  color: #f00;
}
</style>
