<template>
  <div id="UserHistory">
    <v-row justify="center" class="py-4">
      <v-col cols="12" class="text-center secondary--text pt-2 pb-0">
        <h1
          class="primary--text pa-0 d-inline"
          :class="$vuetify.breakpoint.smAndUp ? 'display-1' : 'headline'"
        >
          Orders by {{ userdata }}
        </h1>
      </v-col>
    </v-row>
    <!-- Ordenar por Status -->
    <div v-for="status in status_list" :key="status.name">
      <h4 class="primary--text text-center text-uppercase">
        {{ $t("status." + status.name) }}
      </h4>
      <v-row
        justify="center"
        v-for="order in shipOrders"
        :key="order.ordersheet_id"
      >
        <v-col
          cols="12"
          class="text-center centered"
          v-if="order.status == status.name"
        >
          <UserHistoryCard :shipOrder="order"></UserHistoryCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import UserHistoryCard from "./UserHistoryCard.vue";
import Repository from "../../services/repositories/repositoryFactory";
const OrderRepository = Repository.get("order");
export default {
  name: "UserHistory",
  data: () => ({
    userdata: {},
    status_list: [
      {
        name: "DELIVERY",
        count: 0
      },
      {
        name: "TRANSIT",
        count: 0
      },
      {
        name: "DELIVERED",
        count: 0
      }
    ],
    shipOrders: []
  }),
  components: {
    UserHistoryCard
  },
  methods: {
    async loadOrders() {
      const userEmail = {
        useremail: this.userdata
      };
      let response;
      response = await OrderRepository.getOrdersByUser(userEmail);
      this.shipOrders = response;
    }
  },
  async mounted() {
    this.userdata = this.$route.params.user;
    await this.loadOrders();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#ShippingHistory {
  margin: 0;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
  min-height: 450px;
  background-color: $second-color;
}
.orders-list {
  width: 100% !important;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>
