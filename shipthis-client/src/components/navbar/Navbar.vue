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
      <v-menu >
        <template v-slot:activator="{ on, attrs }" >
          <v-btn class="mr-12 ml-3 px-0"
            v-bind="attrs"
            v-on="on" 
          >
            EN
          </v-btn>
        </template>
        <v-list v-for="language in languages" :key="language.id">
          <v-list-item>
            <v-list-item-title>{{ language.lang }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>   
    </v-app-bar>   
</template>

<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script>
import SectionsList from "./SectionsList.vue";

export default {
    name: "Navbar",
    components: {
        SectionsList        
    },
    data: () => ({     
        login: 'Acceder',
        activeLogin: false,
        languages: [
          { id: "1", lang: "ES" },
          { id: "2", lang: "EN" },
          { id: "3", lang: "FR" }
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