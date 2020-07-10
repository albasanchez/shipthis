<template>
  <v-container fluid class="general-container">
    <v-row>
      <UserForm></UserForm>
    </v-row>
    <v-row class="text-center mt-0 mb-3">
          <v-col cols="12">
              <v-btn class="primary white--text" @click="goRoute('Users')">
                  Go Back
              </v-btn>
          </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserForm from '../../components/users/UserForm';
import { EventBus } from "../../main.js";
export default {
  name: "CreateUser",
  components: {
       UserForm
  },
  methods: {
        goRoute(route) {
        this.$router.push("/" + route);
        EventBus.$emit("emit-route", "/" + route);
        }
    },
};
</script>

<style lang="scss">
@import "../../styles/abstracts/variables.scss";
@import "../../styles/main.scss";
</style>
