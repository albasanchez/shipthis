<template>
  <v-row
    id="RegistryForm"
    class="pt-0"
    justify="center"
    align="center"
    align-self="center"
  >
    <v-card class="registry-form admin-form px-12">
      <v-form
        ref="sigin_form"
        v-model="valid"
        v-on="signinSubmit.prevent"
        lazy-validation
      >
        <h1 class="text-center primary--text registry-title">
          {{ $t("registry.registryUser") }}
        </h1>

        <v-row class="mb-0 pb-0">
          <v-col md="6" cols="12">
            <v-text-field
              v-model="payload.first_name"
              :rules="[rules.required]"
              :label="$t('labels.firstName')"
              outlined
              placeholder="John"
              required
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
            :class="$vuetify.breakpoint.smAndDown ? 'mt-n2 pt-0' : ''"
          >
            <v-text-field
              v-model="payload.middle_name"
              :label="$t('labels.middleName')"
              placeholder="Robert"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col md="6" cols="12">
            <v-text-field
              v-model="payload.last_name"
              :rules="[rules.required]"
              :label="$t('labels.lastName')"
              placeholder="Doe"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
            :class="$vuetify.breakpoint.smAndDown ? 'mt-n2 pt-0' : ''"
          >
            <v-text-field
              v-model="payload.second_last_name"
              :label="$t('labels.middleLastName')"
              placeholder="Smith"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col cols="12">
            <v-text-field
              v-model="payload.useremail"
              :rules="[rules.required, emailRules[0]]"
              :label="$t('labels.email')"
              placeholder="johndoe@gmail.com"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col cols="12">
            <v-text-field
              cols="2"
              v-model="payload.document"
              :rules="identificationRules"
              :label="$t('labels.idNumber')"
              placeholder="1234567"
              v-mask="'#########'"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col md="12">
            <v-text-field
              v-model="payload.phone_number"
              :rules="phoneNumberRules"
              :label="$t('labels.phoneNumber')"
              placeholder="+1 (123) 456-7890"
              v-mask="'+1 (###) ###-####'"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col cols="12">
            <!-- Modal para la fecha -->
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  :label="$t('registry.birthDate')"
                  outlined
                  :placeholder="dateFormat"
                  persistent-hint
                  readonly
                  required
                  :rules="[rules.required]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                :max="maxDate()"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col cols="12">
            <label for="gender">{{ $t("registry.gender") }}</label>
            <v-radio-group
              v-model="payload.gender"
              row
              required
              :rules="[rules.required]"
              name="gender"
              class="mt-2 pt-0"
            >
              <v-radio :label="$t('registry.male')" value="M"></v-radio>
              <v-radio :label="$t('registry.female')" value="F"></v-radio>
              <v-radio :label="$t('registry.other')" value="O"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row class="mb-0 pb-0 mt-n5 pt-0">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="payload.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              :label="$t('labels.password')"
              outlined
              :hint="errorMessages[2]"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
            :class="$vuetify.breakpoint.smAndDown ? 'mt-n2 pt-0' : ''"
          >
            <v-form ref="password">
              <v-text-field
                v-model="repeat_password"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.match]"
                :type="show2 ? 'text' : 'password'"
                name="repeat_password"
                :label="$t('labels.confirmPassword')"
                outlined
                :hint="errorMessages[2]"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-snackbar
          v-model="alertSuccess"
          top
          :timeout="timeout"
          color="success"
          class="primary--text"
        >
          <strong class="body-1 registry-snackbar font-weight-bold">{{
            $t("snacks.success")
          }}</strong>
          <v-btn dark text @click="alertSuccess = false" class="primary--text"> X </v-btn>
        </v-snackbar>

        <v-snackbar
          v-model="alertError"
          type="error"
          top
          top:timeout="timeout"
          color="error"
        >
          <strong class="body-1 registry-snackbar font-weight-bold">{{
            $t("registry.registryErrorMessage")
          }}</strong>
          <v-btn dark text @click="alertError = false" class="white--text"> X </v-btn>
        </v-snackbar>

        <v-snackbar
          v-model="passwordError"
          type="error"
          top
          top:timeout="timeout"
          color="error"
        >
          <strong class="body-1 registry-snackbar font-weight-bold">{{
            $t("snacks.passwordError")
          }}</strong>
          <v-btn dark text @click="passwordError = false" class="white--text"> X </v-btn>
        </v-snackbar>
        <v-row class="registry-buttons">
          <v-col cols="12">
            <v-btn
              :disabled="!valid"
              block
              color="success primary--text"
              class="mr-4"
              @click="signinSubmit()"
              :loading="loading"
            >
              Register  
            </v-btn>
          </v-col>
          <v-col class="hidden-sm-and-down"></v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-row>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const AuthorizeRepository = Repository.get("authorize");
export default {
  name: "RegistryLogin",
  data: ($v) => ({
    payload: {
      useremail: null,
      password: "",
      document: null,
      first_name: null,
      middle_name: null,
      last_name: null,
      second_last_name: null,
      gender: null,
      phone_number: "",
      date_of_birth: null,
      def_language: "EN",
      receive_notifications: false,
    },
    loading: false,
    alertError: false,
    alertSuccess: false,
    passwordError: false,
    valid: true,
    errorMessages: [
      "This field is required.",
      "You must agree.",
      "At least 6 characters.",
      "Use a valid email",
      "Passwords don´t match",
      "Not a valid phone number (must have 10 digits)",
      "At least 7 characters",
    ],
    emailRules: [(v) => /.+@.+\..+/.test(v) || $v.errorMessages[3]],
    phoneNumberRules: [(v) => (v && v.length == 17) || $v.errorMessages[5]],
    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || $v.errorMessages[0],
      min: (v) => v.length >= 6 || $v.errorMessages[2],
      match: () =>
        $v.payload.password == $v.repeat_password || $v.errorMessages[4],
    },
    repeat_password: "",
    identificationRules: [(v) => (v && v.length > 6) || $v.errorMessages[6]],
    date: null,
    dateFormat: "yyyy-mm-dd",
    menu1: false,
    confirmationPasswordChanged: false,
    error: null,
    timeout: 7000,
  }),
  methods: {
    async signinSubmit() {
      if (this.$refs.sigin_form.validate() && this.passwordMatch()) {
        // this.loading = true;
        let userData = this.payload;  
        await AuthorizeRepository.admin_registration(userData)
            .then(() => {
                this.alertSuccess = true;
                setTimeout(() => {
                    this.$router.push("/Users");
                }, 2000);
                })
            .catch(() => {
                    this.alertError = true;
                });
        this.loading = false;
      }
    }, 
    maxDate() {
      let date = new Date();
      return (
        date.getFullYear() -
        18 +
        "-" +
        (date.getMonth() + 1 < 10 ? "0" : "") +
        (date.getMonth() + 1) +
        "-" +
        date.getDate()
      );
    },
    reset() {
      this.$refs.sigin_form.reset();
    },
    passwordMatch() {
      return this.payload.password == this.repeat_password;
    },
    validatePassword() {
      this.$refs.password.validate();
    },
  },
  computed: {
    password() {
      return this.payload.password;
    },
  },
  watch: {
    date() {
      this.payload.date_of_birth = this.date;
    },
    password() {
      if (this.confirmationPasswordChanged) {
        this.validatePassword();
      }
    },
    repeat_password() {
      this.confirmationPasswordChanged = true;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
@media only screen and (max-width: 500px){
    .admin-form{
        width: 95% !important;
    }
    .registry-title{
        font-size: 18px;
    }
}
</style>