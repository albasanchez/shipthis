<template>
  <div id="ShippingHistory">
    <v-row justify="center" class="py-4">
      <v-col cols="12" class="text-center secondary--text pt-4 pb-0">
        <h1 class="white--text pa-0 d-inline display-1">
          {{ $t("shippingHistory.shippingHistoryTitle") }}
        </h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col align="center" class="pt-0">
        <v-btn
          @click="goNewOrder()"
          small
          class="success secondary--text mb-4"
          >{{ $t("sidebar.newOrder") }}</v-btn
        >
      </v-col>
    </v-row>
    <!-- Ordenar por Status -->
    <div v-for="status in status_list" :key="status.name">
      <v-row
        class="status-title"
        @click="status.show = !status.show"
        align="center"
        justify="center"
      >
        <v-col>
          <h4 class="white--text text-center text-uppercase">
            {{ $t("status." + status.name) }}
          </h4>
        </v-col>
      </v-row>
      <v-expand-transition>
        <v-row class="ma-0 pa-0" v-show="status.show">
          <v-col class="ma-0 pa-0">
            <v-row
              justify="center"
              v-for="order in shipOrders"
              :key="order.ordersheet_id"
            >
              <v-col
                cols="12"
                class="text-center centered py-0"
                v-if="order.status == status.name"
              >
                <ShippingCard :shipOrder="order"></ShippingCard>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-expand-transition>
    </div>
  </div>
</template>

<script>
import ShippingCard from "./ShippingCard.vue";

import Repository from "../../services/repositories/repositoryFactory";
const OrderRepository = Repository.get("order");
export default {
  name: "ShippingHistory",
  data: () => ({
    userdata: {},
    status_list: [
      {
        name: "DELIVERY",
        show: true,
      },
      {
        name: "TRANSIT",
        show: true,
      },
      {
        name: "DELIVERED",
        show: true,
      },
    ],

    shipOrders: [],
  }),
  components: {
    ShippingCard,
  },
  methods: {
    goNewOrder() {
      this.$router.push("/NewOrder");
    },
    async loadOrders() {
      const userEmail = {
        useremail: this.userdata.email,
      };
      let response;
      response = await OrderRepository.getOrdersByUser(userEmail);
      this.shipOrders = response;
    },
  },
  async mounted() {
    this.userdata = this.$store.getters["users/getUser"];
    await this.loadOrders();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#ShippingHistory {
  margin: 0;
  font-size: 22px;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  background-color: $second-color;
}
.orders-list {
  width: 100% !important;
}
.centered {
  display: flex;
  justify-content: center;
}
.status-title {
  cursor: pointer;
  transition: 0.5s !important;
}
.status-title:hover {
  background-color: $primary-color;
}
</style>
