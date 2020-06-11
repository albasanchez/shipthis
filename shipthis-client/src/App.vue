<template>
  <v-app>
    <router-view name="Navbar"></router-view>
    <router-view></router-view>
    <router-view name="Footer"></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
