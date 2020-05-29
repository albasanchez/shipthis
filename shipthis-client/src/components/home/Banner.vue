<template>
  <v-row id="Banner">
        <v-col cols="12" align="center" align-self="center">
          <h2 class="font-weight-medium">{{  $t("banner.theBestIn") }}</h2>
          <h1 class="font-weight-bold">{{ $t("banner.packageAndPickUp") }}</h1>
          <h2 class="font-weight-medium">{{ $t("banner.andDelivery") }}</h2>
        </v-col>
      </v-row>
</template>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
<script>
export default {
name: "Banner",
  data: () => ({

  }),
};
</script>

<style lang="scss">
@import '../../styles/main.scss';
  #Banner {
    background-image: url('./../../assets/home/deliveryman.jpg');
    margin:0;
    background-size: cover;
    height: 550px;
    font-size: 22px;
    width: 100%;
  }
</style>