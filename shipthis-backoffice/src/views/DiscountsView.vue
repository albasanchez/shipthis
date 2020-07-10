<template>
  <div class="general-container">
    <v-row align="center" justify="center">
      <h1 class="text-center primary--text">Discounts</h1>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <div>
          <DiscountsList></DiscountsList>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center mt-0">
      <v-col cols="12">
        <v-btn class="primary white--text" @click="goRoute('Home')">
          Go Back
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DiscountsList from "../components/Discounts/DiscountsList.vue";
import {EventBus} from "../main"
export default {
  name: "DiscountsView",
  data: () => ({}),
  components: {
    DiscountsList,
  },
  methods:{
       goRoute(route) {
        this.$router.push("/" + route);
        EventBus.$emit("emit-route", "/" + route);
        },
  }
};
</script>
