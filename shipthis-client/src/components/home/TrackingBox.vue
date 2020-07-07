<template>
  <div class="idTracking-box">
    <v-row align="center" justify="center">
      <v-col cols="12" md="10">
        <v-text-field
          :label="$t('tracking.idTracking')"
          id="idTracking"
          class="pr-4"
          v-model="tracking_id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          class="success accent--text"
          @click="searchOrder(tracking_id)"
          @keyup.enter="searchOrder(tracking_id)"
          >{{ $t("tracking.search") }}</v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar v-model="alertNoOrder" top :timeout="timeout" color="error">
      <strong>{{ $t("tracking.alertNoOrder") }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text v-bind="attrs" @click="alertNoOrder = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const OrderRepository = Repository.get("order");
const CommercialAllyRepository = Repository.get("commercialAlly");

export default {
  name: "TrackingBox",
  data: () => ({
    tracking_id: "",
    alertNoOrder: false,
    timeout: 4000,
  }),
  methods: {
    goTracking(id) {
      this.$router.push("./tracking/" + id);
    },
    goPickup(id) {
      this.$router.push("./pickup/" + id);
    },
    async searchOrder(id) {
      const orderId = {
        tracking_id: id,
      };
      try {
        await OrderRepository.searchOrderDetail(orderId);
        this.goTracking(id);
      } catch {
        try {
          await CommercialAllyRepository.searchPickupDetail(orderId);
          this.goPickup(id);
        } catch {
          this.alertNoOrder = true;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
