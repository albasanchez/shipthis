<template>
  <v-app>
    <Navbar />
    <v-container fluid class="ma-0 pa-0 page-content">
      <router-view class="mt-12 page-content"></router-view>
      <FABTelegram
        v-if="!$route.meta.hideBasicComponents"
        :loggedIn="loggedIn"
      />
    </v-container>
    <Footer />
    <Sidebar app id="Sidebar" v-if="loggedIn && $vuetify.breakpoint.mdAndUp">
      /></Sidebar
    >
  </v-app>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/dashboard/Sidebar.vue";
import FABTelegram from "./components/FABTelegram.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: { Sidebar, Navbar, Footer, FABTelegram },
  data: () => ({
    //
  }),
  computed: mapState({
    loggedIn: (state) => state.users.user.user_id != null,
  }),
};
</script>
<style lang="scss">
@import "./styles/main.scss";
</style>
