<template>
  <div class="idTracking-box">
        <v-text-field :label="idTracking" id="idTracking" class="pr-4"></v-text-field>
        <v-btn class="success accent--text">{{ searchBtn }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "TrackingBox",
  data: () => ({
    searchBtn: "Buscar",
    idTracking: 'ID Tracking'
  }),
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>