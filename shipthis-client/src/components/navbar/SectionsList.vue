<template>
  <div>
    <v-list id="sections-list" class="pa-0 ma-0">
      <v-list-item 
      v-for="section in sections" :key="section.id">
        <!-- Condicional para saber si el usuario está logueado o no -->
        <div v-if="section.activateLogin">
          <!-- Si está logueado, muestra "Escritorio" y no "Acceder" -->
          <div v-if="loggedIn">
            <a class="sections-list__item d-none"  @click="activateLogin = true">
            {{ section.name }} </a>
            <a class="sections-list__item"  @click="goRoute(section.link)">
            {{ section.alter }} </a>
          </div>
          <div v-else>
            <a class="sections-list__item"  @click="activateLogin = true">
            {{ section.name }} </a>
          </div>
        </div>
        <div v-else>
          <a class="sections-list__item" @click="goRoute('')" :href="section.link" >{{ section.name }}</a>
        </div>       
      </v-list-item>
    </v-list>

    <!-- Modal de Login -->
    <v-dialog v-model="activateLogin" id="sections-list__loginForm" class="ma-0" width="750">
      <LoginForm></LoginForm>
    </v-dialog>
  </div>
  
</template>

<script>
import LoginForm from '../Login.vue';
export default {
  name: "SectionsList",
  data: () => ({
    activateLogin: false,
    sections: [
      { id: "1", name: 'Inicio', link: '#', activateLogin: false },
      { id: "2", name: 'Nosotros', link: '#Us', activateLogin: false },
      { id: "3", name: 'Rastreo', link: '#TrackSec', activateLogin: false },
      { id: "4", name: 'Servicios', link: '#Services', activateLogin: false },
      { id: "5", name: 'Contacto', link: '#Contact', activateLogin: false },
      { id: "6", name: 'Acceder', alter:'Escritorio', link: 'HomeUser' , activateLogin: true }
    ],
    activeColor: '',
    loggedIn: false,
  }),
  components: {
    LoginForm
  },
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
  }
};
</script>
<style lang="scss">
    @import '../../styles/main.scss';
</style>