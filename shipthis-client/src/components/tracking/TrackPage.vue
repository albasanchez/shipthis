<template>
  <div id="TrackingPage">
    <v-row>
      <v-col cols="12" class="text-center secondary--text pt-4 pb-0">
        <h1 class="white--text pa-0 d-inline">
          {{ $t("tracking.trackingTitle") }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <TrackCard class="ma-0" :ship="ship"></TrackCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TrackCard from "./TrackCard";

import Repository from "../../services/repositories/repositoryFactory";
const OrderRepository = Repository.get("order");

export default {
  name: "TrackPage",
  data: () => ({
    ship: null,
    errorMsg: null
  }),
  components: {
    TrackCard
  },
  methods: {
    async loadOrderDetail() {
      const orderId = { tracking_id: this.$route.params.id };
      let response;
      try {
        response = await OrderRepository.searchOrderDetail(orderId);
        this.ship = response;
        this.ship.trajectories.check_points = this.ship.trajectories.check_points.sort(
          (a, b) => (a.check_point_order > b.check_point_order ? 1 : -1)
        );
      } catch {
        this.alertError = true;
      }
    }
  },
  async mounted() {
    await this.loadOrderDetail();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#TrackingPage {
  margin: 0;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
  min-height: 450px;
  background-color: $second-color;
}
</style>
