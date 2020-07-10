<template>
  <div>
    <v-list
      :id="$vuetify.breakpoint.mdAndUp ? 'sections-list' : ''"
      class="pa-0 ma-0"
    >
      <v-list-item v-for="section in sections" :key="section.id">
        <!-- Condicional para saber si el usuario está logueado o no -->
        <div v-if="section.activateLogin">
          <!-- Si está logueado, muestra "Escritorio" y no "Acceder" -->
          <div v-if="userLoggedIn">
            <a
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'sections-list__item'
                  : 'sections-menu__item'
              "
              @click="goRoute(section.link)"
            >
              {{ $t("sidebar." + section.alter) }}
            </a>
          </div>
          <div v-else>
            <a
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'sections-list__item'
                  : 'sections-menu__item'
              "
              @click.stop="loginDialog(true)"
            >
              {{ $t("sections." + section.name) }}
            </a>
          </div>
        </div>
        <div v-else>
          <a
            :class="
              $vuetify.breakpoint.mdAndUp
                ? 'sections-list__item'
                : 'sections-menu__item'
            "
            @click="goRoute('')"
            :href="section.link"
          >
            {{ $t("sections." + section.name) }}</a
          >
        </div>
      </v-list-item>
    </v-list>

    <!-- Modal de Login -->
    <v-dialog
      v-model="activateLogin"
      id="sections-list__loginForm"
      class="ma-0"
      width="750"
    >
      <LoginForm
        :activateLogin="activateLogin"
        @update="updateDialog"
      ></LoginForm>
    </v-dialog>
  </div>
</template>

<script>
import LoginForm from "../auth/Login.vue";
export default {
  name: "SectionsList",
  data: () => ({
    activateLogin: false,
    userLoggedIn: false,
    sections: [
      { id: "1", name: "home", link: "#", activateLogin: false },
      { id: "2", name: "us", link: "#Us", activateLogin: false },
      { id: "3", name: "tracking", link: "#", activateLogin: false },
      { id: "4", name: "services", link: "#Services", activateLogin: false },
      { id: "5", name: "contact", link: "#Contact", activateLogin: false },
      {
        id: "6",
        name: "access",
        alter: "desktop",
        link: "HomeUser",
        activateLogin: true,
      },
    ],
  }),
  components: {
    LoginForm,
  },
  created() {
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },
  methods: {
    goRoute(route) {
      this.$router.push("/" + route);
    },
    loginDialog(activate) {
      this.activateLogin = activate;
    },
    updateDialog(newData) {
      this.activateLogin = newData;
      this.userLoggedIn = true;
    },
    fetchData() {
      let res = this.$store.getters["users/getUser"];
      this.userLoggedIn = res.user_id != null;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
