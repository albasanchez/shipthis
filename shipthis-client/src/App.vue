<template>
  <v-app>
    <div class="app">
      <router-view name="Navbar"></router-view>
      <router-view></router-view>
      <router-view name="Footer"></router-view>
    </div>
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
