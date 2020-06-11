<template>
  <v-card class="profile-form" align-self="center">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="userdata.email"
            :rules="emailRules"
            :label="$t('labels.email')"
            required
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-select
            v-model="userdata.def_language"
            :items="default_language_items"
            :rules="[v => !!v || 'Selecciona un lenguaje por defecto.']"
            :label="$t('labels.defaultLanguage')"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="3" cols="12">
          <v-text-field
            v-model="userdata.person.first_name"
            :rules="firstNameRules"
            :label="$t('labels.firstName')"
            required
          ></v-text-field>
        </v-col>
        <v-col md="3" cols="12">
          <v-text-field
            v-model="userdata.person.middle_name"
            :label="$t('labels.middleName')"
          ></v-text-field>
        </v-col>
        <v-col md="3" cols="12">
          <v-text-field
            v-model="userdata.person.last_name"
            :rules="lastNameRules"
            :label="$t('labels.lastName')"
            required
          ></v-text-field>
        </v-col>
        <v-col md="3" cols="12">
          <v-text-field
            v-model="userdata.person.second_last_name"
            :label="$t('labels.middleLastName')"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="4" cols="12">
          <v-text-field
            v-model="old_password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="actualPassword"
            :label="$t('labels.actualPassword')"
            hint="Al menos 6 caracteres"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-col md="4" cols="12">
          <v-text-field
            v-model="new_password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="new_password"
            :label="$t('labels.newPassword')"
            hint="Al menos 6 caracteres"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
        <v-col md="4" cols="12">
          <v-text-field
            v-model="user_password_confirm"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="confirm_password"
            :label="$t('labels.confirmPassword')"
            hint="Al menos 6 caracteres"
            counter
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2" cols="4">
          <v-text-field
            v-model="userdata.person.phone_code"
            :rules="phoneCodeRules"
            :label="$t('labels.areaCode')"
          ></v-text-field>
        </v-col>
        <v-col md="4" cols="8">
          <v-text-field
            v-model="userdata.person.phone_number"
            :rules="phoneNumberRules"
            :label="$t('labels.phoneNumber')"
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-checkbox
            v-model="userdata.person.receive_notifications"
            :label="$t('labels.receiveNotifications')"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row class="registry-buttons">
        <v-col class="hidden-sm-and-down"></v-col>
        <v-col cols="12" sm="4">
          <v-btn
            block
            :disabled="!valid"
            color="success secondary--text"
            class="mr-4"
            @click="validate"
          >
            {{ $t("buttons.saveChanges") }}
          </v-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn block color="error" class="mr-4" @click="reset">
            {{ $t("buttons.resetFields") }}
          </v-btn>
        </v-col>
        <v-col class="hidden-sm-and-down"></v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "ProfileForm",
  data: () => ({
    userdata: {},
    default_language_items: ["Español", "Inglés"],
    show1: false,
    show2: false,
    show3: false,
    valid: true,
    old_password: "admins",
    new_password: "",
    user_password_confirm: "",

    // Rules
    emailRules: [
      v => !!v || "El E-mail es obligatorio",
      v => /.+@.+\..+/.test(v) || "El E-mail debe ser válido"
    ],
    firstNameRules: [v => !!v || "El nombre es obligatorio"],
    lastNameRules: [v => !!v || "El apellido es obligatorio"],
    phoneCodeRules: [
      v =>
        (v && v.length >= 2) ||
        "El código de área debe tener al menos 2 dígitos."
    ],
    phoneNumberRules: [
      v => (v && v.length == 7) || "El número de teléfono debe tener 7 dígitos."
    ],
    password: "",
    rules: {
      required: value => !!value || "La contraseña es obligatoria.",
      min: v => v.length >= 6 || "Al menos 6 caracteres"
    }
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  beforeMount() {
    this.userdata = this.$store.getters["users/getUser"];
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
