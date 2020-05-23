<template>
  <v-row id="TrackSec">
        <v-col align-self="center" align="center">
          <!-- Componente de input para buscar según ID Tracking -->
          <TrackingBox></TrackingBox>
        </v-col>
      </v-row>
</template>

<script>
import TrackingBox from './TrackingBox.vue'

export default {
  name: "TrackSec",
  components: {
      TrackingBox
  },
  data: () => ({
    
  }),
}
</script>

<style lang="scss">
@import '../../styles/main.scss';

  #TrackSec {
    background-image: url('../../assets/home/truck.jpeg');
    height:500px;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position-y: -180px;
  }

</style>