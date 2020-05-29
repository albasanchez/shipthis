<template>
    <!-- Navbar de la pagina -->
    <v-app-bar id="Navbar"
      absolute class="navbar-color " style="position: sticky"
      elevate-on-scroll text
    >

      <!-- Logo -->
      <v-img src="../../assets/home/logoNav.png" id="imgNavbar" @click="goRoute(linkToHome)" style="width:100px"></v-img>

      
      <v-spacer></v-spacer>

      <!-- Componente con links de navegación -->
      <SectionsList class="d-none d-md-flex" :loggedIn="loggedIn"></SectionsList>

      

      <!-- Selector de idioma -->
      <v-col cols="4" md="2" lg="1" sm="2" class="mt-8 mr-12" >
        <v-select
          v-model="$i18n.locale"
          :items="languages" 
          :label="$i18n.locale" solo
        ></v-select> 
      </v-col>
      
    </v-app-bar>   
</template>

<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script>
import SectionsList from "./SectionsList.vue";
import {mapState} from 'vuex';
export default {
    name: "Navbar",
    components: {
        SectionsList        
    },
    data: () => ({     
        login: 'Acceder',
        activeLogin: false,
        languages: [
          "EN",
          "ES" 
        ],
        linkToHome: '#'       
    }),
    props: {
      loggedIn: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goRoute(route) {
      this.$router.push('/'+route);     
    }
    },  
    
};
</script>

<style lang="scss">
    @import '../../styles/main.scss';

</style>