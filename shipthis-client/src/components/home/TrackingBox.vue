<template>
  <div class="idTracking-box">
        <v-alert v-model="alertNoOrder" type="error" dismissible>
          <strong class="secondary--text">{{ $t("tracking.alertNoOrder") }}:  {{ tracking_id }}</strong>
        </v-alert>
        <v-text-field :label='$t("tracking.idTracking")'  
        id="idTracking" class="pr-4" v-model="tracking_id"></v-text-field>
        <v-btn class="success accent--text" @click="searchOrder(tracking_id)">{{ $t("tracking.search") }}</v-btn>
  </div>
</template> 

<script>
import axios from 'axios'
export default {
  name: "TrackingBox",
  data: () => ({
    tracking_id: "",
    alertNoOrder: false,
  }),
  methods: {
    goTracking(id) {
      this.$router.push("./tracking/"+id);
    },
    async searchOrder(id) {
        const payload = {
          tracking_id: id,
        };
        console.log(payload);
        axios
          .post("http://localhost:3000/shipthisapi/v1/ordersheet/detail", payload)
          .then(() => {
            this.goTracking(id);
          })
          .catch(() => {
            this.alertNoOrder = true;
          });
      }
  },
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>