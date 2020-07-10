<template>
  <v-card class="pa-4 ma-0 dashboard-card__item" @click="goRoute(route)">
    <img
      :src="resolve_img_url(icon)"
      class="dashboard-card__image"
      alt="icono"
    />
    <div class="dashboard-card__info text-center">
      <h4 class="dashboard-card__info-title">{{ name }}</h4>
      <p class="dashboard-card__info-text">{{ description }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    name: String,
    description: String,
    icon: String,
    route: String,
  },
  methods: {
    resolve_img_url: function (path) {
      let images = require.context(
        "../../assets/dashboard/",
        false,
        /\.png$|\.jpg$/
      );
      return images("./" + path);
    },
    goRoute(route) {
      this.$router.push("/" + route);
    },
  },
  data: () => ({}),
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
