<template>
  <v-container>
    <v-row align="center" justify="center" class="pt-10">
      <v-card style="width:50%;" color="#F1F4F7">
        <v-img
          class="white--text align-end"
          aspect-ratio="1.4"
          src="@/assets/logo.png"
          contain
        >
        </v-img>
        <v-card-title primary-title>
          Login
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- Username -->
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
            />

            <!-- Password -->
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="account.password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter
            />

            <v-row class="justify-space-between px-3 pt-5">
              <v-btn
                v-if="false"
                text
                @click.prevent="$router.push('/register')"
                >Register</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn type="submit" color="success">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>

    <notifications group="auth" position="center" />

    <SuccessDialog
      :status="dialogAdd"
      :text_color="text_color"
      :title="title"
      :message="message"
    />
  </v-container>
</template>

<script>
import SuccessDialog from "@/components/cards/SuccessDialog";
import api from "@/services/api";
import { server } from "../services/constants";

export default {
  mounted() {
    const userId = localStorage.getItem(server.USER_ID);

    console.log("Login mounted : " + api.isLoggedIn());
    console.log("Login mounted : " + userId);
    if (userId && api.isLoggedIn()) {
      this.$router.push("/");
    }
  },
  components: {
    SuccessDialog,
  },
  data() {
    return {
      isShowPassword: false,
      account: {
        username: "",
        password: "",
      },
      fullPage: true,
    };
  },
  methods: {
    submit() {
      // this.$notify({
      //   group: "auth",
      //   type: "warn",
      //   title: "<h1>Login Failed</h1>",
      //   text: "<h3>Please check your username and password</h3>",
      //   duration: 1000,
      //   speed: 500,
      //   width: "100%",
      // });

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

      // this.$router.push("/dashboard");
      this.$store
        .dispatch({
          type: "doLogin",
          username: this.account.username,
          password: this.account.password,
        })
        .then(() => {
          // console.log("Login success : " + this.$store.getters["isLogin"]);
          loader.hide();
          // this.$router.push("/stock");
        });
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
};
</script>

<style></style>
