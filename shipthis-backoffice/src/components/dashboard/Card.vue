<template>
  <v-card class="pa-4 mb-2 dashboard-card__item" @click="goRoute(route)">
    <div class="dashboard-card__info text-center">
      <v-icon class="dashboard-card__info-icon" size="70px">{{ icon }}</v-icon>
      <h4 class="dashboard-card__info-title">{{ name }}</h4>
    </div>
  </v-card>
</template>

<script>

import { EventBus } from "../../main.js";
export default {
  name: "DashboardCard",
  props: {
    name: String,
    description: String,
    icon: String,
    route: String,
    section: String
  },
  methods: {
    goRoute(route) {
      this.$router.push("/" + route);
      EventBus.$emit("emit-route", "/" + this.section);
    }
  },
  data: () => ({})
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
