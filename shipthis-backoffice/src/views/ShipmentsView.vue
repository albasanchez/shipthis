<template>
  <v-container fluid class="general-container">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
      <v-row>
          <ShipmentsCard v-for="(status, key) in deliveryStatus" :key="key" :status="status"></ShipmentsCard>
      </v-row>
        <ShipmentsTable></ShipmentsTable>
        
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row class="text-center mt-0">
          <v-col cols="12">
              <v-btn class="primary white--text" @click="goRoute('Home')">
                  Go Back
              </v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Repository from "../services/repositories/repositoryFactory";
const ShipmentsRepository = Repository.get("shipments");
import ShipmentsCard from "../components/Shipments/ShipmentCard.vue";
import ShipmentsTable from "../components/Shipments/ShipmentsTable.vue";
import { EventBus } from "../main.js";
export default {
  name: "ShipmentsView",
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

  async mounted() {
    this.loadShipmentsbyStatus();
  },
  methods: {
    async loadShipmentsbyStatus() {
      let response;
      response = await ShipmentsRepository.getShipmentsbyStatus();
      this.Shipments = response;
      this.deliveryStatus[0].value = this.Shipments.delivery;
      this.deliveryStatus[1].value = this.Shipments.inTransit;
      this.deliveryStatus[2].value = this.Shipments.delivered;
      this.deliveryStatus[3].value = this.Shipments.total;
    },
    goRoute(route) {
        this.$router.push("/" + route);
        EventBus.$emit("emit-route", "/" + route);
        }
  },
  components: {
    ShipmentsCard,
    ShipmentsTable
  },

};
</script>

<style lang="scss">
@import "../styles/abstracts/variables.scss";
@import "../styles/main.scss";
</style>
