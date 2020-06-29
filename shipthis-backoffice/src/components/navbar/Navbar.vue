<template>
  <v-app-bar elevation="1" app class="navbar-color">
    <!-- Logo -->
    <v-img src="../../assets/logoPositive.png" id="imgNavbar" @click="goRoute(linkToHome)"></v-img>

    <v-spacer></v-spacer>

    <!-- Componente con links de navegación -->
    <SectionsList class="d-none d-md-flex" :loggedIn="loggedIn"></SectionsList>

    <div class="hidden-sm-and-up">
      <v-menu bottom :close-on-content-click="closeOnContentClick">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon class="white--text">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="section in sections" :key="section.id">
            <v-list-item-title @click="goRoute(section.link)">
              {{
              section.name
              }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script>
import { EventBus } from "../../main.js";
import SectionsList from "./SectionsList.vue";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  components: {
    SectionsList
  },
  data: () => ({
    login: "Acceder",
    linkToHome: "",
    drawer: false,
    sections: [
      { id: "1", name: "Dashboard", link: "#" },
      { id: "2", name: "Users", link: "Users" },
      { id: "3", name: "Shipments", link: "Shipments" },
      { id: "4", name: "Emails", link: "Emails" },
      {
        id: "5",
        name: "Configuration",
        link: "Configuration"
      }
    ]
  }),
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goRoute(route) {
      this.$router.push("/" + route);
      EventBus.$emit("emit-route", "/" + route);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
