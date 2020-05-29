<template>
  <div class="idTracking-box">
        <v-text-field :label='$t("tracking.idTracking")'  
        id="idTracking" class="pr-4" v-model="tracking_id"></v-text-field>
        <v-btn class="success accent--text" @click="goTracking(tracking_id)">{{ $t("tracking.search") }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "TrackingBox",
  data: () => ({
    tracking_id: "",

  }),
  methods: {
    goTracking(id) {
      this.$router.push("./tracking/"+id);
    }
  }
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>