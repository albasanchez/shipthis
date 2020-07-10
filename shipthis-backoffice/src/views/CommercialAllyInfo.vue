<template>
  <v-container fluid class="general-container px-5">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <CommercialAlliesCard></CommercialAlliesCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// @ is an alias to /src
import CommercialAlliesCard from "../components/commercialAllies/CommercialAllyCard.vue";
export default {
  name: "CommercialAllyInfo",
  components: {
    CommercialAlliesCard
  }
};
</script>
<style lang="scss">
@import "../styles/abstracts/variables.scss";
@import "../styles/main.scss";
</style> 