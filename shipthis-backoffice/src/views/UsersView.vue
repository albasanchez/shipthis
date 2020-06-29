<template>
  <v-container fluid class="general-container">
    <Users></Users>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Users from '../components/users/Users.vue'
export default {
  name: "UsersView",
  components: {
    Users,
  }
};
</script>

<style lang="scss">
@import "../styles/abstracts/variables.scss";
@import "../styles/main.scss";
</style>