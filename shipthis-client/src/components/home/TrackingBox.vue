<template>
  <div class="idTracking-box">
        <v-text-field :label='$t("tracking.idTracking")'  id="idTracking" class="pr-4"></v-text-field>
        <v-btn class="success accent--text">{{ $t("tracking.search") }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "TrackingBox",
  data: () => ({


  }),
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>