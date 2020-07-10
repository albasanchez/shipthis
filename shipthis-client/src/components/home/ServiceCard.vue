<template>
  <v-card class="pa-4 ma-0 service-card__item">
    <img
      :src="resolve_img_url(serviceIcon)"
      class="service-card__image"
      alt="icono"
    />
    <div class="service-card__info text-center">
      <h4 class="service-card__info-title">{{ serviceName }}</h4>
      <p class="service-card__info-text">{{ serviceDescription }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ServiceCard",
  props: {
    serviceName: String,
    serviceDescription: String,
    serviceIcon: String,
  },
  methods: {
    resolve_img_url: function (path) {
      let images = require.context(
        "../../assets/home/",
        false,
        /\.png$|\.jpg$/
      );
      return images("./" + path);
    },
  },
  data: () => ({}),
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
