<template>
  <div>
    <v-list id="sections-list" class="pa-0 ma-0">
      <v-list-item 
      v-for="section in sections" :key="section.id">
        <div v-if="section.activateLogin">
          <a class="sections-list__item"  @click="activeLogin = true">
            <!-- <v-icon class="icon mr-2 pb-1">fas fa-sign-in-alt</v-icon>  -->
            {{ section.name }} </a>
        </div>
        <div v-else>
          <a class="sections-list__item" :href="section.link" >{{ section.name }}</a>
        </div>
        
      </v-list-item>
    </v-list>
    <v-dialog v-model="activeLogin" id="sections-list__loginForm" class="ma-0" width="750">
      <LoginForm></LoginForm>
    </v-dialog>
  </div>
  
</template>

<script>
import LoginForm from '../Login.vue';
export default {
  name: "SectionsList",
  data: () => ({
    activeLogin: false,
    sections: [
      { id: "1", name: 'Inicio', link: '#', activateLogin: false },
      { id: "2", name: 'Nosotros', link: '#Us', activateLogin: false },
      { id: "3", name: 'Rastreo', link: '#TrackSec', activateLogin: false },
      { id: "4", name: 'Servicios', link: '#Services', activateLogin: false },
      { id: "5", name: 'Contacto', link: '#Contact', activateLogin: false },
      { id: "6", name: 'Acceder', link: '' , activateLogin: true}
    ],
    activeColor: ''
  }),
  components: {
    LoginForm
  }
};
</script>
<style lang="scss">
    @import '../../styles/main.scss';
</style>