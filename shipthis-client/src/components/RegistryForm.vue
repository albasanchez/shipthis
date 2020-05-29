<template>
    <v-row id="RegistryForm" class="success" justify="center" align="center" align-self="center">
        <v-card class="registry-form">
        <v-form
            ref="sigin_form"
            v-model="valid" v-on="signinSubmit.prevent"
            lazy-validation
        >

        <h1 class="text-center secondary--text">{{ $t("registry.registryTitle") }}</h1>

        <v-row>
            <v-col md="3" cols="12">
                <v-text-field
                    v-model="payload.first_name"
                    :rules="firstNameRules"
                    :label='$t("labels.firstName")'
                    required
                    ></v-text-field>
            </v-col>
            <v-col md="3" cols="12">
                <v-text-field 
                    v-model="payload.middle_name"                   
                    :label='$t("labels.middleName")'                   
                ></v-text-field>
            </v-col>

            <v-col md="3" cols="12">
                <v-text-field
                    v-model="payload.last_name"
                    :rules="lastNameRules"
                    :label='$t("labels.lastName")'
                    required
                    ></v-text-field>
            </v-col>
            <v-col md="3" cols="12">
                <v-text-field 
                    v-model="payload.second_last_name"                  
                    :label='$t("labels.middleLastName")'                 
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="2">
                <v-select 
                v-model="payload.nationality_type"
                :items="identification_type_items"
                :rules="[v => !!v || 'El tipo es obligatorio.']"
                :label='$t("labels.idType")' 
                required
            ></v-select>
            </v-col>
            <v-col md="4" cols="8">
                <v-text-field cols="2"
                    v-model="payload.document"
                    :rules="identificationRules"
                    :label='$t("labels.idNumber")'
                    required
                    ></v-text-field>
            </v-col>
            <v-col md="6">
                <v-text-field cols="2"
                    v-model="payload.useremail"
                    :rules="emailRules"
                    :label='$t("labels.email")'
                    required
                    ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="6" sm="12">
                <v-text-field
                    v-model="payload.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    :label='$t("labels.password")'
                    hint="Al menos 6 caracteres"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </v-col>
            <v-col md="6" sm="12">
                <v-text-field
                    v-model="repeat_password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="repeat_password"
                    :label='$t("labels.confirmPassword")'
                    hint="Al menos 6 caracteres"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="2" cols="2">
                <v-text-field
                    v-model="payload.phone_code"
                    :rules="phoneCodeRules"
                    :label='$t("labels.areaCode")'                   
                    ></v-text-field>
            </v-col>
            <v-col md="4" cols="10">
                <v-text-field 
                    v-model="payload.phone_number"
                    :rules="phoneNumberRules"
                    :label='$t("labels.phoneNumber")'            
                ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
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
                        v-model="payload.date_of_birth"
                        :label='$t("registry.birthDate")'
                        :hint="dateFormat"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(payload.date_of_birth)"
                        v-on="on"
                        ></v-text-field>                   
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col md="6" cols="12">
                <label for="gender">{{ $t("registry.gender") }}</label>
                <v-radio-group v-model="payload.gender" row name="gender">
                    <v-radio :label='$t("registry.male")' value="M"></v-radio>
                    <v-radio :label='$t("registry.female")' value="F"></v-radio>
                    <v-radio :label='$t("registry.other")' value="O"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col md="6">
                <v-select 
                    v-model="payload.def_language"
                    :items="def_language_items"
                    :rules="[v => !!v || 'Selecciona un lenguaje por defecto.']"
                    :label='$t("labels.defaultLanguage")' 
                    item-text="name" item-value="value"
                    required
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="6" cols="12">
                <v-checkbox
                    v-model="checkbox_terms"
                    :rules="[v => !!v || 'Must agree' ]"
                    :label='$t("registry.iAgree")'
                    required 
                    ></v-checkbox>
            </v-col>

            <v-col md="6" cols="12">
                <v-checkbox
                    v-model="payload.receive_notifications"
                    :label='$t("labels.receiveNotifications")'                  
                    ></v-checkbox>
            </v-col>
        </v-row>
          <v-alert v-model="alertError" type="error" dismissible>
            <strong>{{ $t("registry.registryErrorMessage") }}</strong>
          </v-alert>  
            <div class="registry-buttons">
                <v-btn
                  :disabled="!valid"
                  color="success secondary--text"
                  class="mr-4"
                  @click="signinSubmit()"
                  >
                  {{ $t("buttons.validateAndSend") }}
                  </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            {{ $t("buttons.resetFields") }}
            </v-btn>
            </div>           
        </v-form>
    </v-card>
    </v-row>  
</template>

<script>
import axios from "axios";
  export default {
      name: 'RegistryLogin',
      data: vm => ({
      
      payload: {
        useremail: null,
        password: "",
        nationality_type: null,
        document: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        second_last_name: null,
        gender: null,
        phone_code: "",
        phone_number: "",
        date_of_birth: null,
        def_language: null,
        receive_notifications: false
      },

      alertError: false,
      valid: true,
      firstNameRules: [
        v => !!v || 'El nombre es obligatorio',
      ],
      emailRules: [
        v => !!v || 'El E-mail es obligatorio',
        v => /.+@.+\..+/.test(v) || 'El E-mail debe ser válido',
      ],
      lastNameRules: [
        v => !!v || 'El apellido es obligatorio',
      ],
      phoneCodeRules: [
        v => (v && v.length >= 2) || 'El código de área debe tener al menos 2 dígitos.',
      ],
      phoneNumberRules: [
        v => (v && v.length == 7) || 'El número de teléfono debe tener 7 dígitos.',
      ],
      show1: false,
      rules: {
        required: value => !!value || 'La contraseña es obligatoria.',
        min: v => v.length >= 6 || 'Al menos 6 caracteres',
      },
      repeat_password: '',
      repeatPasswordRules: [
        v => (v && v.length >= 5) || 'La contraseña debe tener al menos 5 dígitos.',
      ],
      identificationRules: [
        v => !!v || 'El documento de identidad es obligatorio',
      ],
      identification_type: 'V',
      identification_type_items: [
        'V',
        'J',
        'E'
      ],
      def_language_items: [
        {
          name: 'Español', value: 'es',
        },
        {
          name: 'English', value: 'en'
        }
      ],
      checkbox_terms: false,   
      date: new Date().toISOString().substr(0, 10),
      dateFormat: "mm/dd/yy",
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
    }),

    methods: {
      async signinSubmit() {
      if (this.$refs.sigin_form.validate() && this.passwordMatch()) {
          const payload = this.payload;
          axios
            .post("http://localhost:3000/shipthisapi/v1/auth/registration", payload)
            .then((r) => {
              this.signinCommit(r.data);
              this.$router.push("/HomeUser");
            })
            .catch(() => {
              this.alertError = true;
            });
        }
      },
      signinCommit(data) {
        console.log("data :>> ", data);
        this.$store.commit("login", { token: data.token, user: data.userdata });
      },
      passwordMatch(){
        return (this.payload.password == this.repeat_password)
      },
      reset () {
        this.$refs.sigin_form.reset()
      },
      resetValidation () {
        this.$refs.sigin_form.resetValidation()
      },
      formatDate (date) {
        if (!date) return null
 
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

  }
</script>

<style lang="scss">
    @import '../styles/main.scss';
</style>