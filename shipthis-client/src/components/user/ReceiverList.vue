<template>
  <v-row
    id="ReceiverList"
    justify="center"
    class="Receiver"
    :class="$vuetify.breakpoint.smAndUp ? 'text-center' : ''"
  >
    <v-col>
      <v-row>
        <v-col cols="12" class="secondary--text mt-4 d-flex justify-center">
          <h1
            class="white--text pa-0"
            :class="$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1'"
          >
            {{ $t("dashboard.receivers") }}
          </h1>
        </v-col>
      </v-row>
      <v-container>
        <ReceiverListCard></ReceiverListCard>
      </v-container>
    </v-col>
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
