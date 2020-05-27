<template>
  <!-- Modal para el inicio de sesión -->
  <v-row id="LoginForm" justify="center" align="center" class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0">
      <v-card class="ma-0">
              <v-window  class="ma-0" v-model="step">

                <!-- Slide 1: Inicio de sesión -->
                <v-window-item  class="ma-0" :value="1">
                  <v-row class="ma-0">
                    <v-col cols="8" class="ma-0">
                      <v-card-text class="mt-3">
                        <h1 class="text-center display-5 accent--text text--accent-3">{{ loginTitle }}</h1>
                        <div class="account-icons">
                          <div class="text-center mt-4 d-inline" justify="center" v-for="icon in loginIcons" :key="icon.id">
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>{{ icon.code }}</v-icon>
                            </v-btn>
                          </div>
                        </div>
                        <h4 class="text-center mt-4">{{ loginInstuction }}</h4>
                        <v-form ref="login_form">
                          <v-text-field :label="email" name="Email" v-model="user_email" type="text" 
                          prepend-icon="email" color="primary accent-3" :rules="[rules.required]" 
                          />
                          <v-text-field id="Password" :label="password" name="Password" v-model="user_password" type="password" 
                          prepend-icon="lock" color="primary accent-3" :rules="[rules.required]"/>
                                             
                          <div class="text-center my-3">
                            <v-btn @click="loginSubmit" rounded type="submit" color="success accent-3 accent--text" dark>{{ loginBtn }}</v-btn>
                          </div>

                          <h3 class="text-center mt-3 secondary--text forgotPassword" @click="step++">{{ forgotMyPassword }}</h3>        
                        </v-form>
                      </v-card-text>
                    </v-col> 
                    <!-- Barra lateral para registro -->
                    <v-col cols="4" md="4" class="primary accent-3 center-img" justify="center" align="center" >
                      <img class="login-logo" src="../assets/home/logo.png" alt="" />
                      <div class="text-center my-6">
                        <v-btn rounded @click="goRegistry" color="success accent-3 accent--text" outlined="">{{ loginSignInBtn }}</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>

                <!-- Slide 2: Recuperar contraseña -->
                <v-window-item  class="ma-0" :value="2">
                  <v-row class="ma-0">   
                    <!-- Barra lateral para registro        -->
                    <v-col cols="4" md="4" class="primary accent-3 center-img" justify="center" align="center" >
                      <img class="login-logo" src="../assets/home/logo.png" alt="" />
                      <h3 class="success--text mt-4 mb-2" @click="step--">{{ noAccountQuestion }}</h3>
                      <div class="text-center">
                        <v-btn rounded @click="goRegistry" color="success accent-3 accent--text"  outlined="">{{ loginSignInBtn }}</v-btn>
                      </div>
                    </v-col> 
                    <v-col cols="8" class="ma-0">
                      <v-alert v-model="alertSuccess" type="success" dismissible>
                        <strong>{{successMessage}}</strong>
                      </v-alert>
                      <v-card-text class="mt-3">
                        <h1 class="text-center display-5 accent--text text--accent-3">{{ recoverPassword }}</h1>
                        <h4 class="text-center mt-4">{{ loginInsertData }}</h4>
                        <v-form ref="recover_form">
                          <v-text-field :label="email" name="Correo electrónico" v-model="user_email" type="text" 
                          prepend-icon="email" color="primary accent-3" :rules="[rules.required]"
                          />
                          
                          <v-text-field id="identification" :label="idNumber" name="identification" v-model="id_number" type="text" 
                          prepend-icon="person" color="primary accent-3" :rules="[rules.required]" />
                      
                      <div class="text-center my-3">
                        <v-btn rounded type="submit" color="success accent-3 accent--text" dark @click="recoverPasswordSubmit">{{ submit }}</v-btn>
                      </div>

                      <h3 class="text-center mt-3 secondary--text forgotPassword" @click="step++">{{ goBack }}</h3>
                      
                      </v-form>
                      </v-card-text>
                    </v-col>   
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
    </v-col>
  </v-row>
</template>
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script>
import { required, minLength, between } from 'vuelidate/lib/validators';
export default {
    name: "LoginForm",
    props: {
        activateLogin: Boolean        
    },
    data: () => ({
      user_email: '',
      user_password: '',

      rules: {
        required: value => !!value || 'Este campo no puede estar vacío.',
      },
      
      id_number: '',
      step: 1,
      alertSuccess: false,

      // Strings
      loginTitle: 'Ingresa a Shipthis',
      loginInstuction: 'Usa tu e-mail para entrar',
      forgotMyPassword: 'Olvidé mi contraseña',
      email: "Correo electrónico",
      password: "Contraseña",
      idNumber: "Número de identidad",
      loginBtn: 'Ingresa',
      loginSignInBtn: 'Regístrate',
      loginInsertData: 'Introduce tus datos',
      goBack: 'Regresar',
      submit: 'Enviar',
      noAccountQuestion: '¿No tienes cuenta?',
      recoverPassword: 'Recuperar mi contraseña',
      loginIcons: [
        { id: "1", network: "Facebook", code: "fab fa-facebook-f"},
        { id: "2", network: "Google", code: "fab fa-google-plus-g"}
      ],
      successMessage: "Se ha enviado un link a su correo para reestablecer su contraseña.",
    }),
    props: {
      source: String
    },
    methods: {

      loginSubmit() {
        if (this.$refs.login_form.validate()) {
          console.log('submit!' + ' email: ' + this.user_email)
          this.$router.push('/HomeUser');
        }else{
          console.log('Faltan campos');
        }
      },
      recoverPasswordSubmit() {
        if (this.$refs.recover_form.validate()) {
          console.log('submit!' + ' email: ' + this.user_email);
          this.alertSuccess = true
        }else{
          console.log('Faltan campos');
        }
      },
      goRegistry() {
        this.$router.push('/Registry');
      }
    }
      
}
</script>

<style lang="scss">
    @import '../styles/main.scss';
</style>