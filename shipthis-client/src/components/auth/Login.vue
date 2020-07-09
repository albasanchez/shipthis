<template>
  <!-- Modal para el inicio de sesión -->
  <v-row id="LoginForm" justify="center" align="center" class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0">
      <v-card class="ma-0">
        <v-window class="ma-0" v-model="step">
          <!-- Slide 1: Inicio de sesión -->
          <v-window-item class="ma-0" :value="1">
            <v-row class="ma-0">
              <v-col cols="12" sm="8" class="ma-0">
                <v-card-text class="mt-3 text-center">
                  <h1 class="text-center display-5 accent--text text--accent-3">
                    {{ $t("login.loginTitle") }}
                  </h1>

                  <h4 class="text-center mt-3">
                    {{ $t("login.loginSocialNetworks") }}
                  </h4>
                  <v-card-actions class="justify-center">
                    <v-btn
                      @click="loginFacebook"
                      rounded
                      dark
                      block
                      color="#3b5998"
                    >
                      <v-icon left color="white">mdi-facebook</v-icon>FACEBOOK
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions class="justify-center">
                    <v-btn
                      @click="loginGoogle"
                      rounded
                      dark
                      block
                      color="#ea4335"
                    >
                      <v-icon left color="white">mdi-google</v-icon>GOOGLE
                    </v-btn>
                  </v-card-actions>
                  <vs-divider class="mt-6" color="dark"
                    ><h4>{{ $t("login.loginCredentials") }}</h4></vs-divider
                  >
                  <v-form ref="login_form" v-on:submit.prevent>
                    <v-text-field
                      :label="$t('labels.email')"
                      name="Email"
                      v-model="user_email"
                      type="text"
                      prepend-icon="email"
                      color="primary accent-3"
                      :rules="[rules.required, emailRules[0]]"
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
                    <v-btn
                      @click="loginSubmit"
                      rounded
                      type="submit"
                      color="success accent-3 accent--text"
                      dark
                      block
                      >{{ $t("buttons.login") }}
                    </v-btn>
                    <v-card-actions width="400" class="text-center mt-3">
                      <p class="textButton" @click="step++">
                        {{ $t("login.forgotMyPassword") }}
                      </p>
                      <v-spacer></v-spacer>
                      <p class="textButton" @click="goRegistry">
                        {{ $t("buttons.newHere") + " " + $t("buttons.signUp") }}
                      </p>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-col>
              <!-- Barra lateral para registro -->
              <v-col
                cols="4"
                md="4"
                class="primary accent-3 center-img d-none d-sm-flex"
                justify="center"
                align="center"
              >
                <img class="login-logo" src="../../assets/home/logo.png" alt />
                <h3 class="success--text mt-4" @click="step--">
                  {{ $t("login.noAccountQuestion") }}
                </h3>
                <div class="text-center my-6">
                  <v-btn
                    rounded
                    @click="goRegistry"
                    color="success accent-3 accent--text"
                    outlined
                    >{{ $t("buttons.signUp") }}</v-btn
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
                class="primary accent-3 center-img d-none d-sm-flex"
                justify="center"
                align="center"
              >
                <img class="login-logo" src="../../assets/home/logo.png" alt />
                <h3 class="success--text mt-4 mb-2" @click="step--">
                  {{ $t("login.noAccountQuestion") }}
                </h3>
                <div class="text-center">
                  <v-btn
                    rounded
                    @click="goRegistry"
                    color="success accent-3 accent--text"
                    outlined
                    >{{ $t("buttons.signUp") }}</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" sm="8" class="ma-0">
                <v-card-text class="mt-3">
                  <h1 class="text-center display-5 accent--text text--accent-3">
                    {{ $t("login.recoverPassword") }}
                  </h1>
                  <v-form ref="recover_form" v-on:recoverPasswordSubmit.prevent>
                    <v-text-field
                      :label="$t('labels.email')"
                      name="Correo electrónico"
                      v-model="user_email"
                      type="text"
                      prepend-icon="email"
                      color="primary accent-3"
                      :rules="[rules.required, emailRules[0]]"
                    />

                    <v-text-field
                      id="identification"
                      :label="$t('labels.idNumber')"
                      name="identification"
                      v-model="document"
                      type="text"
                      prepend-icon="person"
                      color="primary accent-3"
                      :rules="identificationRules"
                      required
                      v-mask="'#########'"
                      @keydown.enter="recoverPasswordSubmit()"
                    />

                    <v-row>
                      <v-col>
                        <h3 class="mt-3 secondary--text" @click="step++">
                          {{ $t("login.goBack") }}
                        </h3> </v-col
                      ><v-col align="end">
                        <v-btn
                          rounded
                          color="success accent-3 accent--text"
                          dark
                          @click="recoverPasswordSubmit()"
                          >{{ $t("buttons.submit") }}</v-btn
                        ></v-col
                      >
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
      <v-snackbar v-model="alertError" top :timeout="timeout" color="error">
        <strong>{{ $t("login.logginErrorMessage") }}</strong>
        <template v-slot:action="{ attrs }">
          <v-btn icon dark text v-bind="attrs" @click="alertError = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="recoverAlertSuccess"
        top
        :timeout="timeout"
        color="success"
      >
        <strong class="secondary--text"
          >{{ $t("login.recoverAlertSuccess") }} {{ user_email }}</strong
        >
        <template v-slot:action="{ attrs }">
          <v-btn
            icon
            dark
            text
            v-bind="attrs"
            @click="recoverAlertSuccess = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="recoverAlertError"
        top
        :timeout="timeout"
        color="error"
      >
        <strong>{{ $t("login.recoverAlertError") }}</strong>
        <template v-slot:action="{ attrs }">
          <v-btn
            icon
            dark
            text
            v-bind="attrs"
            @click="recoverAlertError = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import Repository from "../../services/repositories/repositoryFactory";
const AuthorizeRepository = Repository.get("authorize");

export default {
  name: "LoginForm",
  props: {
    activateLogin: Boolean,
    source: String,
  },
  data: ($v) => ({
    error: "",

    user_email: "",
    user_password: "",
    document: "",

    newUser: "",

    rules: {
      required: (value) => !!value || "This field cannot be empty.",
    },
    emailRules: [
      (v) => /.+@.+\..+/.test(v) || $v.$t("errorMessages.validEmail"),
    ],
    identificationRules: [
      (v) => (v && v.length == 9) || $v.$t("errorMessages.idLength"),
    ],

    step: 1,
    alertError: false,
    timeout: 4000,
    alertSuccess: false,
    recoverAlertSuccess: false,
    recoverAlertError: false,
  }),
  methods: {
    async loginSubmit() {
      await this.$store.dispatch("users/resetError");
      this.error = "";
      this.alertError = false;
      if (this.$refs.login_form.validate()) {
        const user = {
          useremail: this.user_email,
          password: this.user_password,
        };
        await this.$store.dispatch("users/authorize", user);
        this.error = this.$store.getters["users/getError"].error;
        if (this.error !== "") this.alertError = true;
        else {
          this.$emit("update", false);
          this.newUser = this.$store.getters["users/getNewUser"];
          if (this.newUser && this.newUser === true) {
            this.$router.push("/UserProfile");
          } else this.$router.push("/HomeUser");
        }
      }
    },
    async loginGoogle() {
      await this.$store.dispatch("users/resetError");
      this.error = "";
      this.alertError = false;
      await this.$store.dispatch("users/authorizeGoogle");
      this.error = this.$store.getters["users/getError"].error;
      if (this.error !== "") this.alertError = true;
      else {
        this.$emit("update", false);
        this.newUser = this.$store.getters["users/getNewUser"];
        if (this.newUser && this.newUser === true) {
          this.$router.push("/UserProfile");
        } else this.$router.push("/HomeUser");
      }
    },
    async loginFacebook() {
      await this.$store.dispatch("users/resetError");
      this.error = "";
      this.alertError = false;
      await this.$store.dispatch("users/authorizeFacebook");
      this.error = this.$store.getters["users/getError"].error;
      if (this.error !== "") this.alertError = true;
      else {
        this.$emit("update", false);
        this.newUser = this.$store.getters["users/getNewUser"];
        if (this.newUser && this.newUser === true) {
          this.$router.push("/UserProfile");
        } else this.$router.push("/HomeUser");
      }
    },
    async recoverPasswordSubmit() {
      if (this.$refs.recover_form.validate()) {
        const userRecoveryData = {
          useremail: this.user_email,
          document: this.document,
        };
        try {
          await AuthorizeRepository.recoverUser(userRecoveryData);
          this.recoverAlertSuccess = true;
          this.step--;
          setTimeout(() => {
            this.document = "";
            this.$refs.recover_form.resetValidation();
          }, 2000);
        } catch (e) {
          this.recoverAlertError = true;
        }
      }
    },
    goRegistry() {
      this.$emit("update", false);
      this.$router.push("/Registry");
      this.resetForms();
    },
    loginCommit(data) {
      this.$store.commit("login", { token: data.token, user: data.userdata });
    },
    resetForms() {
      this.$refs.login_form.reset();
      if (this.$refs.recover_form !== undefined) {
        this.$refs.recover_form.reset();
      }
      this.step = 1;
    },
  },
  watch: {
    activateLogin(val) {
      !val && this.resetForms();
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
