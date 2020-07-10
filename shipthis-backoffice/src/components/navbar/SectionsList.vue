<template>
  <v-list id="sections-list" class="pa-0 ma-0">
    <v-list-item v-for="section in sections" :key="section.id">
      <!-- Condicional para saber si el usuario está logueado o no -->
      <div class="section-space text-center">
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
      { id: "1", name: "Dashboard", link: "/Home" },
      { id: "2", name: "Users", link: "/Users" },
      { id: "3", name: "Shipments", link: "/Shipments" },
      { id: "4", name: "Comments", link: "/Comments" },
      {
        id: "5",
        name: "Allies",
        link: "/CommercialAllies"
      },
      {
        id: "6",
        name: "Configuration",
        link: "/Configuration"
      },
      {
        id: "8",
        name: "Discounts",
        link: "/Discounts"
      },
      {
        id: "7",
        name: "Sign Out",
        link: ""
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
      if (route == "") {
        this.$store.dispatch("logout");
        this.$router.push("/");
      } else {
        this.route = route;
        this.$router.push("" + route);
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../styles/main.scss";
.section-space{
  min-width: 70px;
  margin: 0 auto;
}
</style>