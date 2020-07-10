<template>
  <v-row id="Banner">
    <v-col align-self="center" align="center">
      <v-row
        ><v-col cols="12" align="center" align-self="center">
          <h2 class="font-weight-medium">{{ $t("banner.theBestIn") }}</h2>
          <h1 class="font-weight-bold">{{ $t("banner.packageAndPickUp") }}</h1>
          <h2 class="font-weight-medium">{{ $t("banner.andDelivery") }}</h2>
        </v-col></v-row
      >
      <v-row id="TrackSec">
        <v-col align-self="center" align="center"
          ><TrackingBox></TrackingBox> </v-col
      ></v-row>
    </v-col>
  </v-row>
</template>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
<script>
import TrackingBox from "./TrackingBox.vue";
export default {
  name: "Banner",
  components: {
    TrackingBox,
  },
  data: () => ({}),
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#Banner {
  background-image: url("./../../assets/home/truck.jpeg");
  background-position: bottom;
  margin: 0;
  background-size: cover;
  height: 500px;
  font-size: 22px;
  width: 100%;
}
</style>
