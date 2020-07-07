<template>
  <!-- Navbar de la pagina -->
  <v-app-bar id="Navbar" app class="navbar-color">
    <!-- Logo -->
    <v-img
      v-if="$vuetify.breakpoint.mdAndUp"
      src="../../assets/home/logoNav.png"
      id="imgNavbar"
      @click="goRoute(linkToHome)"
      contain
      max-width="275"
    ></v-img>

    <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>

    <!-- Componente con links de navegación -->
    <SectionsList
      v-if="$vuetify.breakpoint.mdAndUp"
      :loggedIn="loggedIn"
    ></SectionsList>
    <v-menu height="40" v-else-if="$vuetify.breakpoint.smAndDown">
      <template v-slot:activator="{ on }">
        <v-btn text small v-on="on" id="menuNavbar">
          <v-icon x-large>mdi-menu</v-icon>
        </v-btn>
      </template>
      <SectionsList :loggedIn="loggedIn"></SectionsList>
    </v-menu>
    <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>

    <!-- Selector de idioma -->
    <v-col
      cols="5"
      lg="1"
      sm="2"
      class="mt-7"
      :class="$vuetify.breakpoint.mdAndUp ? 'mr-12' : 'mr-0'"
    >
      <Translator />
    </v-col>
  </v-app-bar>
</template>

<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script>
import SectionsList from "./SectionsList.vue";
import Translator from "./Translator.vue";
import jwt from "../../common/jwt.service";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  components: {
    SectionsList,
    Translator,
  },
  data: () => ({
    linkToHome: "#",
  }),
  props: {
    loggedIn: {
      type: Boolean,
      default: jwt.isTokenValid(),
    },
  },
  methods: {
    goRoute(route) {
      this.$router.push("/" + route);
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
