<template>
  <div class="general-container pt-10">
    <v-row>
      <v-col cols="12"  align="center" justify="center">
        <ConfigurationCard></ConfigurationCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ConfigurationCard from "../components/Configuration/ConfigurationCard.vue";
export default {
  name: "Configuration",
  data: () => ({}),
  components: {
    ConfigurationCard
  }
};
</script>
