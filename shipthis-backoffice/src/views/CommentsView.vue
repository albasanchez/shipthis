<template>
  <v-container fluid class="general-container" :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : ''">
    <v-row>
      <v-col cols="12"  align="center" justify="center">
        <Comments></Comments>
      </v-col>
    </v-row>
     <v-row class="text-center mt-0">
          <v-col cols="12">
              <v-btn class="primary white--text" @click="goRoute('Home')">
                  Go Back
              </v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Comments from '../components/comments/Comments.vue';
import { EventBus } from "../main.js";
export default {
  name: "CommentsView",
  components: {
    Comments,
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
@import "../styles/abstracts/variables.scss";
@import "../styles/main.scss";
</style>
