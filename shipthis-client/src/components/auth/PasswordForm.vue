<template>
  <v-container fluid>
    <v-row id="PasswordForm" align="center" justify="center">
      <v-col align="center"
        ><v-card
          max-width="400px"
          class="pt-6 mb-7 rounded-card"
          color="#F8F8FF"
        >
          <v-img
            alt="Shipthis Logo"
            class="shrink mb-2"
            src="../../assets/home/logo_oscuro.png"
            transition="scale-transition"
            max-width="300"
          />
          <p class="text-center mb-0">{{ $t("login.recoverPassword") }}</p>

          <v-card-text class="text-center">
            <v-form
              ref="password"
              v-model="valid"
              v-on="changePassword.prevent"
              lazy-validation
            >
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :label="$t('labels.password')"
                :hint="$t('errorMessages.minCharacters')"
                counter
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="confirmPassword"
                prepend-icon="lock"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.match]"
                :type="showConfirmPassword ? 'text' : 'password'"
                name="confirmPassword"
                :label="$t('labels.confirmPassword')"
                :hint="$t('errorMessages.minCharacters')"
                counter
                @click:append="showConfirmPassword = !showConfirmPassword"
                @keydown.enter="changePassword()"
              />
              <v-btn
                :disabled="!valid"
                block
                class="success secondary--text my-4"
                @click="changePassword()"
                :loading="loading"
                >{{ $t("labels.setPassword") }}</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card></v-col
      >
    </v-row>
    <v-snackbar v-model="alertSuccess" top :timeout="timeout" color="success">
      <strong class="secondary--text">{{
        $t("recoverPassword.success")
      }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text v-bind="attrs" @click="alertSuccess = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="alertError" top :timeout="timeout" color="error">
      <strong>{{ $t("recoverPassword.error") }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text v-bind="attrs" @click="alertError = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const AuthorizeRepository = Repository.get("authorize");

export default {
  name: "PasswordForm",
  data: ($v) => ({
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
    valid: true,
    loading: false,
    alertError: false,
    timeout: 4000,
    alertSuccess: false,
    rules: {
      required: (value) => !!value || $v.$t("errorMessages.input"),
      min: (v) => v.length >= 6 || $v.$t("errorMessages.minCharacters"),
      match: () =>
        $v.password == $v.confirmPassword ||
        $v.$t("errorMessages.notMatchingPasswords"),
    },
  }),
  methods: {
    validatePassword() {
      this.$refs.password.validate();
    },
    async changePassword() {
      let passwordForm = this.$refs.password.validate();
      if (passwordForm) {
        this.loading = true;
        try {
          const payload = {
            token: this.$route.params.token,
            password: this.password,
          };
          await AuthorizeRepository.setPassword(payload);
          this.loading = false;
          this.alertSuccess = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        } catch {
          this.loading = false;
          this.alertError = true;
        }
      }
    },
  },
  watch: {
    password() {
      if (this.confirmationPasswordChanged) {
        this.validatePassword();
      }
    },
    confirmPassword() {
      this.confirmationPasswordChanged = true;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#PasswordForm {
  background-image: url("../../assets/dashboard/colorful-background.jpg");
  background-size: cover;
}
</style>
