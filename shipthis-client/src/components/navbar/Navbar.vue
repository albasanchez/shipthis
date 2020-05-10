<template>
    <v-app-bar
      absolute class="navbar-color " style="position: sticky"
      elevate-on-scroll scroll-target="#scrolling-techniques-7"
    >
      <v-img src="../../assets/home/logoNav.png" id="imgNavbar" href="#" style="width:100px"></v-img>

      <v-spacer></v-spacer>
      
      <SectionsList class="d-none d-md-flex "></SectionsList>
      <a href="#" class="navbar-sections__item">
              <v-icon class="icon mr-2 pb-1">fas fa-sign-in-alt</v-icon>{{ signin }}</a>

      <v-menu >
      <template v-slot:activator="{ on, attrs }" >
        <v-btn class="mr-12 ml-3 px-0"
          v-bind="attrs"
          v-on="on" flat
        >
          EN
        </v-btn>
      </template>

      <v-list v-for="language in languages" :key="language.id">
        <v-list-item @click="method">
          <v-list-item-title>{{ language.lang }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      
    </v-app-bar>
</template>

<script>
import SectionsList from "./SectionsList.vue";

export default {
    name: "Navbar",
    components: {
        SectionsList,
    },
    data: () => ({     
        signin: 'Acceder',
        languages: [
          { id: "1", lang: "ES" },
          { id: "2", lang: "EN" },
          { id: "3", lang: "FR" }
        ]       
    })
};
</script>

<style lang="scss">
    @import '../../styles/main.scss';

</style>