<template>
  <v-container fluid class="general-container" :class="$vuetify.breakpoint.smAndDown ? 'px-0' : ''">
    <UserHistory></UserHistory>
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
import UserHistory from "../../components/users/UserHistory.vue";
export default {
  name: "ConsultOrder",
  components: {
    UserHistory,
  },
  methods: {
        goRoute(route) {
        this.$router.push("/" + route);
        }
    },
};
</script>
<style></style>
