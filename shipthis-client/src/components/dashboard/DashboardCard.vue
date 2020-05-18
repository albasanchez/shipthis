<template>
    <v-card class="pa-4 ma-0 dashboard-card__item">
    <img :src="resolve_img_url(icon)" class="dashboard-card__image" alt="icono"/>
    <div class="dashboard-card__info text-center">
        <h4 class="dashboard-card__info-title">{{ name }}</h4>
        <p class="dashboard-card__info-text">{{ description }}</p>
    </div>  
  </v-card>
</template>

<script>
export default {
name: "DashboardCard",
    props: {
            name: String,
            description: String,
            icon: String         
        },
    methods: {
    resolve_img_url: function (path) {
      let images = require.context('../../assets/dashboard/', false, /\.png$|\.jpg$/)
      return images("./"+path)
        }
    },
    data: () => ({     
                   
    })
}
</script>

<style lang="scss">
@import '../../styles/main.scss';

</style>