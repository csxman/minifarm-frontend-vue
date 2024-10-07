<template>
  <v-row class="pa-10">
    <v-col cols="12">
      <v-card class="mx-auto pa-5" outlined>
        <v-card-title> รีเซ็ต ยูสเซอร์ พาสเวิด</v-card-title>
        <v-divider></v-divider>
        <br />
        <v-form @submit.prevent="submit">
          <v-text-field
            outlined
            dense
            label="Username"
            v-model="account.username"
          />

          <v-text-field
            outlined
            dense
            label="Password"
            v-model="account.password"
          ></v-text-field>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click.prevent="cancel">
              ยกเลิก
            </v-btn>

            <v-btn color="success" type="submit">
              บันทึก
            </v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-col>

    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-row>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "@/services/constants";

export default {
  name: "reset-password",
  data: () => ({
    dialogAdd: false,
    text_color: "text-h5 green--text text-center",
    title: "green",
    message: "green",
    account: { username: "", password: "" },
  }),

  methods: {
    async submit() {
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

      const res_edit = await api.updateAccountPass(
        this.$route.params.id,
        this.account
      );
      if (res_edit.status == 200 || res_edit.status == 201) {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Success!!!",
          "Edit data success",
          "text-h5 green--text text-center"
        );
        this.$router.back();
      } else {
        this.$store.state.global_dialog = true;
        this.setupAlertDialog(
          true,
          "Failed!!!",
          "Edit data Failed",
          "text-h5 red--text text-center"
        );
      }

      //   await api.updatePassword(this.apikey.id, this.apikey);
      //   this.$router.back();

      loader.hide();
    },
    cancel() {
      this.$router.back();
    },
    setupAlertDialog(status, title, message, text_color) {
      this.title = title;
      this.message = message;
      this.dialogAdd = status;
      this.text_color = text_color;
    },
  },

  components: {
    SuccessDialog,
  },
};
</script>

<style></style>
