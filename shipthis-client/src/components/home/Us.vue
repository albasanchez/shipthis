<template>
  <v-row id="Us" class="px-12 py-12">
    <v-col>
      <v-row>
        <v-col class="us-logo sm-12 md-6" align-self="center" align="center">
          <v-img
            class="logo"
            max-height="100"
            contain
            src="../../assets/home/logo.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="us-info text-center sm-12 md-6" align-self="center">
          <p class="py-3 ma-0">{{ $t("us.usMessage1") }}</p>
          <hr />
          <p class="py-3 ma-0">{{ $t("us.usMessage2") }}</p>
          <hr />
          <p class="py-3 ma-0">{{ $t("us.usMessage3") }}</p>
          <v-btn
            :small="$vuetify.breakpoint.smAndDown"
            class="success secondary--text"
            @click="activateLogin = true"
            >{{ $t("us.usButton") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
    <v-dialog
      v-model="activateLogin"
      id="sections-list__loginForm"
      class="ma-0"
      width="750"
    >
      <!-- Componente de formulario de login -->
      <LoginForm></LoginForm>
    </v-dialog>
  </v-row>
</template>

<script>
import LoginForm from "../auth/Login.vue";
export default {
  name: "Us",
  data: () => ({
    activateLogin: false,
  }),
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
