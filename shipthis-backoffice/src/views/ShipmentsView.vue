<template>
  <v-container fluid class="general-container">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
      <v-row>
          <ShipmentCard v-for="(status, key) in deliveryStatus" :key="key" :status="status"></ShipmentCard>
      </v-row>
        <ShipmentsTable></ShipmentsTable>
        
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Repository from "../services/repositories/repositoryFactory";
const ShipmentsRepository = Repository.get("shipments");
import ShipmentCard from "../components/Shipments/ShipmentCard.vue";
import ShipmentsTable from "../components/Shipments/ShipmentsTable.vue";

export default {
  name: "Shipments",
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
    }
  },
  components: {
    ShipmentCard,
    ShipmentsTable
  }
};
</script>

<style lang="scss">
@import "../styles/main.scss";
</style>
