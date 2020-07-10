<template>
  <v-card>
    <v-navigation-drawer
      app
      v-model="drawer"
      :right="right"
      :expand-on-hover="expandOnHover"
      :mini-variant.sync="mini"
      permanent
      class="no-radius secondary"
    >
      <v-list-item class="px-2 pt-2">
        <v-list-item-avatar>
          <v-img
            v-if="userdata.picture_url === null"
            src="../../assets/dashboard/guest.png"
          ></v-img>
          <v-img v-else :src="userdata.picture_url"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="white--text"
          >{{ userdata.first_name }} {{ userdata.last_name }}</v-list-item-title
        >

        <v-btn icon @click.stop="mini = !mini">
          <v-icon class="white--text">{{ minimizeIcon }}</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          class="sidebar-item"
          v-for="item in sidebarItems"
          :key="item.title"
          link
          @click="goRoute(item.route)"
        >
          <v-list-item-icon>
            <v-icon class="white--text sidebar-item-icon">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text sidebar-item-title">
              {{ $t("sidebar." + item.title) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      sidebarItems: [
        { title: "desktop", icon: "dashboard", route: "HomeUser" },
        { title: "myProfile", icon: "mdi-account", route: "UserProfile" },
        { title: "historial", icon: "mdi-history", route: "ShippingHistory" },
        { title: "newOrder", icon: "local_shipping", route: "NewOrder" },
        { title: "receivers", icon: "mdi-account-group", route: "Receivers" },
        { title: "signOff", icon: "cancel", route: "" },
      ],
      mini: true,
      right: true,
      expandOnHover: true,
      minimizeIcon: "mdi-chevron-left",
    };
  },
  methods: {
    goRoute(route) {
      if (route == "") {
        this.$store.dispatch("logout");
        this.$router.push("/");
      } else {
        this.$router.push("/" + route);
      }
    },
  },
  computed: {
    userdata() {
      return this.$store.getters["users/getUser"].person;
    },
  },
};
</script>
<style lang="scss">
@import "../../styles/main.scss";
.no-radius {
  border-radius: 0px !important;
  border: none;
}
.sidebar-item:hover {
  background-color: $primary-color !important;
}
</style>
