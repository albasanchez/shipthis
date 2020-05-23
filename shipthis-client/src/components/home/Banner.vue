<template>
  <v-row id="Banner">
        <v-col cols="12" align="center" align-self="center">
          <h2 class="font-weight-medium">{{ bannerMessage1 }}</h2>
          <h1 class="font-weight-bold">{{ bannerMessage2 }}</h1>
          <h2 class="font-weight-medium">{{ bannerMessage3 }}</h2>
        </v-col>
      </v-row>
</template>

<script>
export default {
name: "Banner",
  data: () => ({

    // Strings
    bannerMessage1: "Los mejores en",
    bannerMessage2: "recolección y entrega",
    bannerMessage3: "de paquetes"
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