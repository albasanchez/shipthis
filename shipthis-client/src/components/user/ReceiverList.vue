<template>
  <v-row
    id="ReceiverList"
    justify="center"
    align="center"
    :class="$vuetify.breakpoint.smAndUp ? 'text-center Receiver' : 'Receiver'"
  >
    <v-col cols="12" class="secondary--text pt-4 pb-0 ma-4 d-flex justify-center">
      <v-icon class="d-inline display-1 white--text mr-2">{{
        RecieverListIcon
      }}</v-icon>
      <h1
        class="white--text pa-0 d-inline"
        :class="$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1'"
      >
        {{ $t("dashboard.receivers") }}
      </h1>
    </v-col>
    <ReceiverListCard class="ma-0 mb-12"></ReceiverListCard>
  </v-row>
</template>

<script>
import ReceiverListCard from "./ReceiverListCard";
export default {
  name: "RecieverList",
  data: () => ({
    RecieverListIcon: "mdi-account-group",
  }),
  components: {
    ReceiverListCard,
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.Receiver {
  background-image: url("../../assets/dashboard/colorful-background.jpg");
  background-size: cover;
}
</style>
