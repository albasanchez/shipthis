<template>
    <v-row id="Us" class="px-12 py-6">
        <v-col class="us-logo sm-12 md-6" align-self="center" align="center">
          <v-img class="logo" src="../../assets/home/logo.png"></v-img>
        </v-col>
        <v-col class="us-info text-center sm-12 md-6 pr-12" align-self="center">
          <p class="py-3 ma-0">{{ message1 }}</p>
          <hr>
          <p class="py-3 ma-0">{{ message2 }}</p>
          <hr>
          <p class="py-3 ma-0">{{ message3 }}</p>
          <v-btn class="success secondary--text"  @click="activeLogin = true">{{ message4 }}</v-btn>
        </v-col>
        <v-dialog v-model="activeLogin" id="sections-list__loginForm" class="ma-0" width="750">
      <LoginForm></LoginForm>
    </v-dialog>
    </v-row>
    
</template>

<script>
import LoginForm from '../Login.vue';
export default {
name: "Us",
  data: () => ({
    message1: "Somos los líderes en paquetería y envío, ¡tu mejor aliado!",
    message2: "Envía a tus productos a cualquier parte de los Estados Unidos.",
    message3: "No dudes en consultar por el presupuesto de tu pedido.",
    message4: "¿Qué esperas?",
    activeLogin: false
  }),
  components: {
    LoginForm
  }
};
</script>

<style lang="scss">
@import '../../styles/main.scss';

</style>