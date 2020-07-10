<template>
  <span>
    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp"
      class="mr-12"
      color="blue"
      fab
      dark
      fixed
      bottom
      right
      edge
      :href="bot"
      target="_blank"
    >
      <v-icon color="white" size="28px">mdi-telegram</v-icon>
    </v-btn>
    <v-btn
      v-else
      color="blue"
      fab
      dark
      fixed
      bottom
      right
      edge
      href="bot"
      target="_blank"
    >
      <v-icon color="white" size="28px">mdi-telegram</v-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  name: "FABTelegram",
  data: () => ({
    bot: process.env.VUE_APP_BOT_URL,
  }),
};
</script>
