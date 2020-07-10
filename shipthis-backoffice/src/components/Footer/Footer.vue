

<template>
  <v-footer dark padless>
    <v-card class="flex primary py-10" flat tile id="Footer" >
      <v-img src="../../assets/logoPositive.png" width="300"></v-img>
    <v-spacer></v-spacer>
    <h3 class="success--text pt-2"> &copy; {{ footerCopyright }}</h3>
    </v-card>
  </v-footer>
</template>

<script>
export default {   
    name: "Footer",
    data: () => ({     
      footerCopyright: '2020 Shipthis.'
    })
}
</script>

<style lang="scss">
@import '../../styles/main.scss'; 
</style>