<template>
  <v-list id="sections-list" class="pa-0 ma-0">
    <v-list-item v-for="section in sections" :key="section.id">
      <!-- Condicional para saber si el usuario está logueado o no -->
      <div>
        <a
          @click="goRoute(section.link)"
          v-if="section.link == route"
          class="sections-list__itemactive success--text"
          >{{ section.name }}</a
        >
        <a class="sections-list__item" v-else @click="goRoute(section.link)">{{
          section.name
        }}</a>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
import { EventBus } from "../../main.js";
import { mapState } from "vuex";
export default {
  name: "SectionsList",
  data: () => ({
    route: "",
    URLactual: "",
    sections: [
      { id: "1", name: "Dashboard", link: "/" },
      { id: "2", name: "Users", link: "/Users" },
      { id: "3", name: "Shipments", link: "/Shipments" },
      { id: "4", name: "Emails", link: "/Emails" },
      {
        id: "5",
        name: "Configuration",
        link: "/Configuration"
      }
    ]
  }),
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState({
    idToken: state => state.idToken
  }),
  created() {
    EventBus.$on("emit-route", data => {
      this.route = data;
    });
  },
  mounted() {
    this.route = window.location.pathname;;
  },
  methods: {
    goRoute(route) {
      this.route = route;
      this.$router.push(route);
    }
  }
};
</script>
<style lang="scss">
@import "../../styles/main.scss";
</style>
