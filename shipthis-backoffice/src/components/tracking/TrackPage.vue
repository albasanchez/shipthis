<template>
  <div id="TrackingPage">
    <v-row justify="center" class="py-4">
     
      <v-col cols="8" class="d-flex justify-start text-center secondary--text pt-4 pb-0">
        <h1 class="dark-text-color pa-0 d-inline pl-4">
          Tracking
        </h1>
      </v-col>
      
      <v-col cols="2" class="d-flex justify-center align-center text-center secondary--text pt-4 pb-0">
       <v-btn class="primary white--text" @click="goBack()">
                  Go Back
            </v-btn>
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
       
        response = await CommercialAllyRepository.searchPickupDetail(orderId);
        this.ship = response;
        this.ship.trajectory.check_points = this.ship.trajectory.check_points.sort(
          (a, b) => (a.check_point_order > b.check_point_order ? 1 : -1)
        );
      } catch {
        this.$router.push("/");
      }
    },
    goBack(){
      this.$router.push({name:'CommercialAllyInfo'});
    }
  },
  async mounted() {
    await this.loadOrderDetail();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
