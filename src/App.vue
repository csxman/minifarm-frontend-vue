<template>
  <v-app>
    <Header v-if="$store.state.isLogged" />
    <!-- v-if="$store.state.isLogged" -->
    <Menu v-if="$store.state.navMenu" />
    <!-- <Menu v-if="$store.state.isLogged" /> -->
    <Content />
  </v-app>
</template>

<script>
import Header from "@/components/core/Header";
import Menu from "@/components/core/Menu";
import Content from "@/components/core/Content";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  },
};
</script>

<style>
.signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #0730e9, #0730e9);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
.bg-colorth {
  background-color: #595959;
  color: red;
}
</style>
