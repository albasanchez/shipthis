<template>
  <v-row id="NewOrderForm" justify="center" align="center">
    <v-col cols="12" class="text-center secondary--text pt-2 pb-0">
      <!-- <v-icon class="d-inline display-1 white--text mb-12 pb-12 mr-2">{{ newOrderIcon }}</v-icon> -->
      <h1 class="white--text pa-0 d-inline">
        {{ $t("newOrder.newOrderTitle") }}
      </h1>
    </v-col>
    <NewOrderFormCard class="ma-0"></NewOrderFormCard>
  </v-row>
</template>

<script>
import NewOrderFormCard from "./NewOrderFormCard";
export default {
  name: "NewOrderForm",
  data: () => ({
    newOrderIcon: "local_shipping"
  }),
  components: {
    NewOrderFormCard
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#NewOrderForm {
  margin: 0;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
  background-color: $second-color;
}
</style>
