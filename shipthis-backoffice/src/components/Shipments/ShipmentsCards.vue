<template>
  <v-row>
    <v-col cols="12" sm="6" v-for="(status, key) in deliveryStatus" :key="key">
      <v-card class="pa-4 elevation-2" rounded>
        <v-row>
         <v-icon size="50" class=" ml-5 success--text">{{ status.icon }}</v-icon>
         <p class="text-xl-h4 status-title mt-4 ml-2">{{ status.name }}</p>
        </v-row>
        <v-row class="mt-0">
          <v-col>
          <p class="text-right display-1  mb-1 mr-5">{{ status.value }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
  data: () => ({
    deliveryStatus: [
      {
        name: "Out for Delivered",
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
