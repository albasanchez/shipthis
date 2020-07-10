<template>
  <div id="NewOrderForm">
    <v-row class="pa-4" justify="center">
      <v-col cols="12" class="text-center secondary--text mt-2 pa-2">
        <h1 class="white--text pa-0 d-inline display-1">
          {{ $t("newOrder.newOrderTitle") }}
        </h1>
      </v-col>
      <NewOrderFormCard class="ma-0"></NewOrderFormCard>
    </v-row>
  </div>
</template>

<script>
import NewOrderFormCard from "./NewOrderFormCard";
export default {
  name: "NewOrderForm",
  components: {
    NewOrderFormCard,
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
