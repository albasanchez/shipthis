<template>
  <div class="idTracking-box">
        <v-text-field label="ID Tracking" id="idTracking" class="pr-4"></v-text-field>
        <v-btn class="success accent--text">{{ button }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "TrackingBox",
  data: () => ({
    button: "Buscar"
  }),
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>