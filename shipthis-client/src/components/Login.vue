<template>
  <!-- Modal para el inicio de sesión -->
  <v-row id="LoginForm" justify="center" align="center" class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0">
      <v-card class="ma-0">
        <v-window class="ma-0" v-model="step">
          <!-- Slide 1: Inicio de sesión -->
          <v-window-item class="ma-0" :value="1">
            <v-row class="ma-0">
              <v-col cols="8" class="ma-0">
                <v-card-text class="mt-3">
                  <!--Alerts -->
                  <v-alert v-model="alertError" type="error" dismissible>
                    <strong>{{ $t("login.logginErrorMessage") }}</strong>
                  </v-alert>
                  <h1 class="text-center display-5 accent--text text--accent-3">
                    {{ $t("login.loginTitle") }}
                  </h1>
                  <div class="account-icons">
                    <!-- Google -->
                    <GoogleLogin
                      class="g-signin-button "
                      :params="params"
                      :onSuccess="googleLogin"
                      :onFailure="onFailure"
                      ><v-icon>fab fa-google-plus-g</v-icon></GoogleLogin
                    >
                  </div>
                  <h4 class="text-center mt-4">
                    {{ $t("login.loginInstruction") }}
                  </h4>
                  <v-form ref="login_form" v-on:submit.prevent>
                    <v-text-field
                      :label="$t('labels.email')"
                      name="Email"
                      v-model="user_email"
                      type="text"
                      prepend-icon="email"
                      color="primary accent-3"
                      :rules="[rules.required]"
                    />
                    <v-text-field
                      id="Password"
                      :label="$t('labels.password')"
                      name="Password"
                      v-model="user_password"
                      type="password"
                      prepend-icon="lock"
                      color="primary accent-3"
                      :rules="[rules.required]"
                    />

                    <div class="text-center my-3">
                      <v-btn
                        @click="loginSubmit"
                        rounded
                        type="submit"
                        color="success accent-3 accent--text"
                        dark
                        >{{ $t("buttons.enter") }}</v-btn
                      >
                    </div>

                    <h3
                      class="text-center mt-3 secondary--text forgotPassword"
                      @click="step++"
                    >
                      {{ $t("login.forgotMyPassword") }}
                    </h3>
                  </v-form>
                </v-card-text>
              </v-col>
              <!-- Barra lateral para registro -->
              <v-col
                cols="4"
                md="4"
                class="primary accent-3 center-img"
                justify="center"
                align="center"
              >
                <img class="login-logo" src="../assets/home/logo.png" alt />
                <h3 class="success--text mt-4 mb-2" @click="step--">
                  {{ $t("login.noAccountQuestion") }}
                </h3>
                <div class="text-center my-6">
                  <v-btn
                    rounded
                    @click="goRegistry"
                    color="success accent-3 accent--text"
                    outlined
                    >{{ $t("buttons.signIn") }}</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Slide 2: Recuperar contraseña -->
          <v-window-item class="ma-0" :value="2">
            <v-row class="ma-0">
              <!-- Barra lateral para registro        -->
              <v-col
                cols="4"
                md="4"
                class="primary accent-3 center-img"
                justify="center"
                align="center"
              >
                <img class="login-logo" src="../assets/home/logo.png" alt />
                <h3 class="success--text mt-4 mb-2" @click="step--">
                  {{ $t("login.noAccountQuestion") }}
                </h3>
                <div class="text-center">
                  <v-btn
                    rounded
                    @click="goRegistry"
                    color="success accent-3 accent--text"
                    outlined
                    >{{ $t("buttons.signIn") }}</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="8" class="ma-0">
                <v-alert v-model="alertSuccess" type="success" dismissible>
                  <strong>{{ $t("login.successMessage") }}</strong>
                </v-alert>
                <v-card-text class="mt-3">
                  <h1 class="text-center display-5 accent--text text--accent-3">
                    {{ $t("login.recoverPassword") }}
                  </h1>
                  <h4 class="text-center mt-4">{{ $t("login.insertData") }}</h4>
                  <v-form ref="recover_form">
                    <v-text-field
                      :label="$t('labels.email')"
                      name="Correo electrónico"
                      v-model="user_email"
                      type="text"
                      prepend-icon="email"
                      color="primary accent-3"
                      :rules="[rules.required]"
                    />

                    <v-text-field
                      id="identification"
                      :label="$t('labels.idNumber')"
                      name="identification"
                      v-model="id_number"
                      type="text"
                      prepend-icon="person"
                      color="primary accent-3"
                      :rules="[rules.required]"
                    />

                    <div class="text-center my-3">
                      <v-btn
                        rounded
                        type="submit"
                        color="success accent-3 accent--text"
                        dark
                        @click="recoverPasswordSubmit"
                        >{{ $t("buttons.submit") }}</v-btn
                      >
                    </div>

                    <h3
                      class="text-center mt-3 secondary--text forgotPassword"
                      @click="step++"
                    >
                      {{ $t("buttons.goBack") }}
                    </h3>
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
import { required, minLength, between } from "vuelidate/lib/validators";
import axios from "../services/auth-connector";
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginForm",
  props: {
    activateLogin: Boolean,
  },
  data: () => ({
    alertError: false,
    user_email: "",
    user_password: "",
    id_number: "",

    googleSignInParams: {
      clientId:
        "966846708768-sku50cmo0oo2l1giks2qsvhktd2al2pq.apps.googleusercontent.com",
    },

    rules: {
      required: (value) => !!value || "This field cannot be empty.",
    },

    step: 1,
    alertSuccess: false,

    // Strings
    loginIcons: [
      {
        id: "1",
        network: "Facebook",
        code: "fab fa-facebook-f",
        action: "facebookLogin",
      },
      {
        id: "2",
        network: "Google",
        code: "fab fa-google-plus-g",
        action: "googleLogin",
      },
    ],
  }),
  props: {
    source: String,
  },
  components: {
    GoogleLogin,
  },
  methods: {
    async loginSubmit() {
      if (this.$refs.login_form.validate()) {
        const payload = {
          useremail: this.user_email,
          password: this.user_password,
        };
        axios
          .post("http://localhost:3000/shipthisapi/v1/auth/regularlogin", payload)
          .then((r) => {
            this.loginCommit(r.data);
            this.$router.push("/HomeUser");
          })
          .catch((e) => {
            this.alertError = true;
          });
      }
    },
    googleLogin(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      const googleInfo = googleUser.getBasicProfile();
      const payload = {
        email: googleInfo.Du,
        firstName: googleInfo.sW,
        lastName: googleInfo.tU,
        picture: googleInfo.SK,
        language: "en",
      };
      axios
        .post("/auth/regGoogle", payload)
        .then((r) => {
          this.loginCommit(r.data);
          this.$router.push("/HomeUser");
        })
        .catch((e) => {
          this.alertError = true;
        });
    },
    recoverPasswordSubmit() {
      if (this.$refs.recover_form.validate()) {
        console.log("submit!" + " email: " + this.user_email);
        this.alertSuccess = true;
      } else {
        console.log("Faltan campos");
      }
    },
    goRegistry() {
      this.$router.push("/Registry");
    },
    loginCommit(data) {
      console.log("data :>> ", data);
      this.$store.commit("login", { token: data.token, user: data.userdata });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/main.scss";
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
