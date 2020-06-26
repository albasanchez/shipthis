<template>
  <v-app>
    <Navbar v-if="!$route.meta.hideBasicComponents" />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer v-if="!$route.meta.hideBasicComponents" />
  </v-app>
</template>

<script>
// @ is an alias to /src
import Navbar from "./components/navbar/Navbar.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>
