<template>

    <v-col cols="12" sm="6">
      <v-card class="pa-4 elevation-2 shipments-cards" rounded>
        <v-row>
          <v-icon size="50" class="ml-5 success--text">{{ status.icon }}</v-icon>
          <b class="text-xl-h4 status-title mt-4 ml-2">{{ status.name }}</b>
        </v-row>
        <v-row class="mt-0">
          <v-col>
            <v-container class="centered-input form-container2 ma-0 pa-0">
              <p class="status-value ma-0 mr-3 text-right">{{ status.value }}</p>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

</template>

<script lang="ts">
export default {
  name: "Dashboard",
  props: ["status"]
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
