<template>
  <v-row>
    <v-col cols="6" sm="3" v-for="(status, key) in deliveryStatus" :key="key">
      <div class="pa-4 elevation-2 white">
        <h4 class="black--text text-center">{{ status.name }}</h4>
        <span class="d-flex align-center justify-center">
          <v-icon size="50" class="mr-1 success--text">{{ status.icon }}</v-icon>
          <b class="display-1 mb-1 ml-5">{{ status.value }}</b>
        </span>
        <v-progress-linear
          class="mt-2"
          :value="(value * 100) / total"
          background-color="black"
          background-opacity="0.2"
          color="rgb(149, 193, 74)"
        ></v-progress-linear>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
  data: () => ({
    deliveryStatus: [
      {
        name: "Out For Delivery",
        icon: "mdi-package-variant-closed",
        value: "0"
      },
      {
        name: "In Transit",
        icon: "mdi-car-estate",
        value: "0"
      },
      {
        name: "Delivered",
        icon: "mdi-package-variant",
        value: "0"
      },
      {
        name: "Total",
        icon: "mdi-package",
        value: "0"
      }
    ]
  }),
  methods: {},
  components: {}
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
@import "../../styles/abstracts/variables.scss";
</style>
