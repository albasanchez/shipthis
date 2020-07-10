<template>
  <div id="TrackingPage">
    <v-row justify="center" class="py-4">
      <v-col cols="12" class="text-center secondary--text pt-4 pb-0">
        <h1 class="white--text pa-0 d-inline display-1">
          {{ $t("tracking.trackingTitle") }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center" class="mx-2">
      <v-col cols="12" sm="10">
        <TrackCard class="ma-0 pa-3" v-if="ship" :ship="ship"></TrackCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TrackCard from "./TrackCard";
import Repository from "../../services/repositories/repositoryFactory";
const OrderRepository = Repository.get("order");
const CommercialAllyRepository = Repository.get("commercialAlly");

export default {
  name: "TrackPage",
  data: () => ({
    ship: null,
  }),
  components: {
    TrackCard,
  },
  methods: {
    async loadOrderDetail() {
      const orderId = { tracking_id: this.$route.params.id };
      let response;
      try {
        if (this.$route.meta.type == "order") {
          response = await OrderRepository.searchOrderDetail(orderId);
        } else if (this.$route.meta.type == "pickup") {
          response = await CommercialAllyRepository.searchPickupDetail(orderId);
        }
        this.ship = response;
        this.ship.trajectory.check_points = this.ship.trajectory.check_points.sort(
          (a, b) => (a.check_point_order > b.check_point_order ? 1 : -1)
        );
      } catch {
        this.$router.push("/");
      }
    },
  },
  async mounted() {
    await this.loadOrderDetail();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
