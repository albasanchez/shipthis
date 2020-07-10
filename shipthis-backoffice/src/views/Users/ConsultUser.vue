<template>
  <v-container fluid class="general-container" :class="$vuetify.breakpoint.smAndDown ? 'px-0' : ''">
    <UserTable></UserTable>
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
import UserTable from '../../components/users/UserTable';
import { EventBus } from "../../main.js";
export default {
  name: "ConsultUser",
  components: {
       UserTable
  },
  methods: {
        goRoute(route) {
        this.$router.push("/" + route);
        EventBus.$emit("emit-route", "/" + route);
        }
    },
};
</script>