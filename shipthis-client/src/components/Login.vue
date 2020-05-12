<template>
  <v-row id="LoginForm" justify="center" align="center" class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0">
      <v-card class="ma-0">
              <v-window  class="ma-0">
                <v-window-item  class="ma-0">
                  <v-row class="ma-0">
                    <v-col cols="8" class="ma-0">
                      <v-card-text class="mt-3">
                        <h1 class="text-center display-5 accent--text text--accent-3">{{ title }}</h1>
                        <div class="account-icons">
                          <div class="text-center mt-4 d-inline" justify="center" v-for="icon in icons" :key="icon.id">
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>{{ icon.code }}</v-icon>
                            </v-btn>
                          </div>
                        </div>
                        <h4 class="text-center mt-4">{{ message }}</h4>
                        <v-form @submit.prevent="submit">
                          <v-text-field label="User" name="User" type="text" 
                          prepend-icon="person" color="primary accent-3" v-model.trim="$v.user.$model"
                          :class="{ 'is-invalid': $v.user.$error, 'is-valid': $v.user.$invalid } " />
                          <!-- <div v-if="!$v.user.required">Field is required</div> -->
                          <v-text-field id="Password" label="Password" name="Password" type="password" 
                          prepend-icon="lock" color="primary accent-3" />
                        
                        <h3 class="text-center mt-3 secondary--text">{{ forgotMyPassword }}</h3>
                      
                      <div class="text-center my-3">
                        <v-btn rounded type="submit" :disabled="submitStatus === 'PENDING'" color="success accent-3 accent--text" dark>{{ loginBtn }}</v-btn>
                      </div>
                      <p class="text-center" v-if="submitStatus === 'ERROR'">{{ submitMsg.error }}</p>
                      <p class="text-center" v-if="submitStatus === 'OK'">{{ submitMsg.ok }}</p>
                      <p class="text-center" v-if="submitStatus === 'PENDING'">{{ submitMsg.pending }}</p>
                      </v-form>
                      </v-card-text>
                    </v-col>             
                    <v-col cols="4" md="4" class="primary accent-3 center-img" justify="center" align="center" >
                      <img class="login-logo" src="../assets/home/logo.png" alt="" />
                      <div class="text-center my-6">
                        <v-btn rounded color="success accent-3 accent--text" outlined="">{{ signinBtn }}</v-btn>
                      </div>
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
        activeLogin: Boolean        
    },
    data: () => ({
      user: '',
      title: 'Ingresa a Shipthis',
      message: 'Usa tu e-mail para entrar',
      forgotMyPassword: 'Olvidé mi contraseña',
      loginBtn: 'Ingresa',
      signinBtn: 'Regístrate',
      submitMsg: {
        error: 'Por favor, rellena los campos',
        pending: 'Procesando la información...',
        ok: '¡Ok!'
      },
      icons: [
        { id: "1", network: "Facebook", code: "fab fa-facebook-f"},
        { id: "2", network: "Google", code: "fab fa-google-plus-g"}
      ]
    }),
    validations: {
      user: {
        required,
        minLength: minLength(5)
      }
    },
    methods: {
      submit() {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }
      }
    }
}
</script>

<style lang="scss">
    @import '../styles/main.scss';
</style>