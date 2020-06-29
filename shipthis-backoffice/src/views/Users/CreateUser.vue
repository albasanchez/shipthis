<template>
  <v-container fluid class="general-container">
    <UserForm></UserForm>
  </v-container>
</template>

<script>
import UserForm from '../../components/users/UserForm';
export default {
  name: "CreateUser",
  components: {
       UserForm
  }
};
</script>

<style lang="scss">
@import "../../styles/abstracts/variables.scss";
@import "../../styles/main.scss";
</style>