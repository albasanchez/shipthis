<template>
  <v-footer class="pa-0 ma-0">
    <v-row id="Footer" class="secondary py-8">
      <v-col cols="12" justify="center" align="center">
        <v-img src="../assets/home/logoPositive.png" max-width="200"></v-img>
        <v-spacer></v-spacer>
        <h3 class="success--text pt-2">&copy; {{ footerCopyright }}</h3>
      </v-col>
    </v-row></v-footer
  >
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    footerCopyright: "2020 Shipthis.",
  }),
};
</script>

<style lang="scss">
@import "../styles/main.scss";
</style>
