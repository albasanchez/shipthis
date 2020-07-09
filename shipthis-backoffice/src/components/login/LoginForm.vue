<template>
  <v-container fluid class="gradient pa-0" fill-height>
    <v-col cols="12" xs="12" sm="5" md="5" >
    <v-row class="py-12" align="center" justify="center" >
      <v-card width="400px" class="pa-6 my-0  rounded-card" color="#F8F8FF">
          <v-card-actions class="justify-center">
            <v-img
                alt="Shipthis Logo"
                class="shrink mb-2"
                src="../../assets/logo_bo.png"
                transition="scale-transition"
                width="300"
            />
            
            </v-card-actions>
        <p class="text-center mb-0">{{$t("login.signIn")}}</p>
        
        <v-card-text class="text-center">
          <v-form>
            <div class="mx-auto mb-5 error-card" v-if="errors.length">
              <ul class="list">
                <li class="error-list" v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
            <v-text-field
              label="Email" class="mb-7"
              prepend-inner-icon="email"
              solo style="max-height: 50px;"
              v-model="user_email"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Password" class="mb-7"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-open"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              solo style="max-height: 50px;"
              v-model="password"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn block class="success primary--text my-4" @click="login()">Login</v-btn>
            <p class=" password-forgotten" @click="forgot_password_modal = true">{{$t("login.forgotMyPassword")}}</p>
          </v-form>
        </v-card-text>

      </v-card>
      <v-dialog v-model="forgot_password_modal" width="600">
          <v-card class="password-card">
              <v-card-text class="text-center">
                <v-form>
                    <p class="my-3">{{$t("login.insertData")}}</p>
                    <v-text-field
                    label="Email" class="mb-7 mt-4"
                    prepend-inner-icon="email"
                    solo style="max-height: 50px;"
                    v-model="user_email"
                    :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field
                    label="ID Document " class="mb-7"
                    prepend-inner-icon="person"
                    v-mask="'###########'"
                    solo style="max-height: 50px;"
                    v-model="document"
                    :rules="[rules.required]"
                    ></v-text-field>
                    <v-btn block class="success primary--text" @click="forgotMyPassword()">Submit</v-btn>
                </v-form>
            </v-card-text>
          </v-card>
          <v-snackbar v-model="snackbarNewPassword" top top:timeout="timeout" color="success primary--text">
            {{ $t("snacks.newPassword") }}
            <v-btn dark text @click="snackbarNewPassword = false" class="primary--text">{{ close }}</v-btn>
            </v-snackbar>
            <v-snackbar v-model="snackbarUserEmpty" top top:timeout="timeout" color="error">
            {{ $t("snacks.userEmpty") }}
            <v-btn dark text @click="snackbarUserEmpty = false" class="white--text">{{ close }}</v-btn>
            </v-snackbar>
            <v-snackbar v-model="snackbarDocumentEmpty" top top:timeout="timeout" color="error">
            {{ $t("snacks.documentEmpty") }}
            <v-btn dark text @click="snackbarDocumentEmpty = false" class="white--text">{{ close }}</v-btn>
            </v-snackbar>
            <v-snackbar v-model="snackbarNoRegistry" top top:timeout="timeout" color="error">
                {{ $t("snacks.noRegistry") }}
                <v-btn dark text @click="snackbarNoRegistry = false" class="white--text">{{ close }}</v-btn>
            </v-snackbar>
      </v-dialog>
      
        <v-snackbar v-model="snackbarUserEmpty" top top:timeout="timeout" color="error">
        {{ $t("snacks.userEmpty") }}
        <v-btn dark text @click="snackbarUserEmpty = false" class="white--text">{{ close }}</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbarPasswordEmpty" top top:timeout="timeout" color="error">
        {{ $t("snacks.passwordEmpty") }}
        <v-btn dark text @click="snackbarPasswordEmpty = false" class="white--text">{{ close }}</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbarNoRegistry" top top:timeout="timeout" color="error">
        {{ $t("snacks.noRegistry") }}
        <v-btn dark text @click="snackbarNoRegistry = false" class="white--text">{{ close }}</v-btn>
      </v-snackbar>
    </v-row>
    </v-col>
    </v-container>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const AuthorizeRepository = Repository.get("authorize");
export default {
  name: "LoginForm",
  data: ($v) => ({
      showPassword: false,
      forgot_password_modal: false,
      user_email: '',
      document: '',
      password: '',
      errors: [],
      error: null,
      snackbar: false,
      snackbarUserEmpty: false,
      snackbarPasswordEmpty: false,
      snackbarDocumentEmpty: false,
      snackbarNoRegistry: false,
      snackbarNewPassword: false,
      close: 'X',
      rules: {
      required: (value) => !!value || $v.errorMessages[0],
    },
    errorMessages: [
      "This field is required.",
    ],
  }),
  methods: {
    async login() {
      this.$store.dispatch("logout");
      if (this.user_email && this.password) { 
          const user = {
            useremail: this.user_email,
            password: this.password
          };
          await this.$store.dispatch("users/admin_authorize", user);
          this.error = this.$store.getters["users/getError"].error;
          if (this.error !== "") this.snackbarNoRegistry = true;
          else this.$router.push("/Home");
      } else {
        if (!this.user_email) this.snackbarUserEmpty = true;
        if (!this.password) this.snackbarPasswordEmpty = true;
      }
    },
    async forgotMyPassword() {
      if (this.user_email && this.document) { 
        const userRecoveryData = {
          useremail: this.user_email,
          document: this.document
        };
        try {
          await AuthorizeRepository.recoverUser(userRecoveryData);
          this.snackbarNewPassword = true;
          this.forgot_password_modal = false;
        } catch (e) {
          this.snackbarNoRegistry = true;
        }
      } else {
        if (!this.user_email) this.snackbarUserEmpty = true;
        if (!this.document) this.snackbarDocumentEmpty = true;
      }
    },
    goRoute(route) {
      this.$router.push("/" + route);
    },
    loginCommit(data) {
      this.$store.commit("login", { token: data.token, user: data.userdata });
    }

  },
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
.gradient {
  background: $primary-gradient;
  display: flex;
  justify-content: center;
}
.list {
  padding: 0px !important;
}
li {
  color: #3399ff;
  list-style-type: none;
  list-style-position: outside;
}
.login-buttons{
    display: flex;
    flex-direction: column;
}
.login-buttons .login-btn{
    width: 100%;
    border: 1px solid $primary-color;
}
.password-forgotten:hover{
    cursor: pointer;
    text-decoration: underline;
}
.password-card {
    padding: 8px;
}
</style>