<template>
    <v-row id="RegistryForm" class="success" justify="center" align="center" align-self="center">
        <v-card class="registry-form">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >

        <h1 class="text-center secondary--text">{{ registryTitle }}</h1>

        <v-row>
            <v-col md="3" cols="12">
                <v-text-field
                    v-model="first_name"
                    :rules="firstNameRules"
                    :label="firstName"
                    required
                    ></v-text-field>
            </v-col>
            <v-col md="3" cols="12">
                <v-text-field 
                    v-model="middle_name"                   
                    :label="middleName"                   
                ></v-text-field>
            </v-col>

            <v-col md="3" cols="12">
                <v-text-field
                    v-model="last_name"
                    :rules="lastNameRules"
                    :label="lastName"
                    required
                    ></v-text-field>
            </v-col>
            <v-col md="3" cols="12">
                <v-text-field 
                    v-model="middle_last_name"                  
                    :label="middleLastName"                 
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="2">
                <v-select 
                v-model="nationality_type"
                :items="identification_type_items"
                :rules="[v => !!v || 'El tipo es obligatorio.']"
                :label="idType" 
                required
            ></v-select>
            </v-col>
            <v-col md="4" cols="8">
                <v-text-field cols="2"
                    v-model="identification"
                    :rules="identificationRules"
                    :label="idNumber"
                    required
                    ></v-text-field>
            </v-col>
            <v-col md="6">
                <v-text-field cols="2"
                    v-model="user_email"
                    :rules="emailRules"
                    :label="email"
                    required
                    ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="6" sm="12">
                <v-text-field
                    v-model="user_password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    :label="password"
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
                    :label="confirmPassword"
                    hint="Al menos 6 caracteres"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="2" cols="2">
                <v-text-field
                    v-model="phone_code"
                    :rules="phoneCodeRules"
                    :label="areaCode"                   
                    ></v-text-field>
            </v-col>
            <v-col md="4" cols="10">
                <v-text-field 
                    v-model="phone_number"
                    :rules="phoneNumberRules"
                    :label="phoneNumber"
                    
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
                        v-model="date_of_birth"
                        :label="birthDate"
                        :hint="dateFormat"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(date_of_birth)"
                        v-on="on"
                        ></v-text-field>                   
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6" cols="12">
                <label for="genre">{{ genre }}</label>
                <v-radio-group v-model="user_genre" row name="genre">
                    <v-radio :label="male" value="M"></v-radio>
                    <v-radio :label="female" value="F"></v-radio>
                    <v-radio :label="other" value="O"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col md="6">
                <v-select 
                    v-model="def_language"
                    :items="def_language_items"
                    :rules="[v => !!v || 'Selecciona un lenguaje por defecto.']"
                    :label="defaultLanguage" 
                    required
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="6" cols="12">
                <v-checkbox
                    v-model="checkbox_terms"
                    :rules="[v => !!v || mustAgree ]"
                    :label="iAgree"
                    required 
                    ></v-checkbox>
            </v-col>

            <v-col md="6" cols="12">
                <v-checkbox
                    v-model="checkbox_notifications"
                    :label="receiveNotifications"                  
                    ></v-checkbox>
            </v-col>
        </v-row>
            
            <div class="registry-buttons">
                <v-btn
                  :disabled="!valid"
                  color="success secondary--text"
                  class="mr-4"
                  @click="validate"
                  >
                  {{ validateAndSend }}
                  </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            {{ resetFields }}
            </v-btn>
            </div>           
        </v-form>
    </v-card>
    </v-row>  
</template>

<script>
  export default {
      name: 'RegistryLogin',
      data: vm => ({
      registryTitle: '¡Regístrate ahora!',
      valid: true,
      first_name: '',
      firstNameRules: [
        v => !!v || 'El nombre es obligatorio',
      ],
      middle_name: '',
      user_email: '',
      emailRules: [
        v => !!v || 'El E-mail es obligatorio',
        v => /.+@.+\..+/.test(v) || 'El E-mail debe ser válido',
      ],
      last_name: '',
      lastNameRules: [
        v => !!v || 'El apellido es obligatorio',
      ],
      second_last_name: '',
      phone_code: '',
      phoneCodeRules: [
        v => (v && v.length >= 2) || 'El código de área debe tener al menos 2 dígitos.',
      ],
      phone_number: '',
      phoneNumberRules: [
        v => (v && v.length == 7) || 'El número de teléfono debe tener 7 dígitos.',
      ],
      date_of_birth: '',
      receive_notifications: '',
      show1: false,
      user_password: '',
      rules: {
        required: value => !!value || 'La contraseña es obligatoria.',
        min: v => v.length >= 6 || 'Al menos 6 caracteres',
      },
      repeat_password: '',
      repeatPasswordRules: [
        v => (v && v.length >= 5) || 'La contraseña debe tener al menos 5 dígitos.',
      ],
      identification: '',
      identificationRules: [
        v => !!v || 'El documento de identidad es obligatorio',
      ],
      user_genre: "",
      identification_type: 'V',
      identification_type_items: [
        'V',
        'J',
        'E'
      ],
      def_language: 'Español',
      def_language_items: [
        'Español',
        'Inglés'
      ],
      checkbox_terms: false,
      
      checkbox_notifications: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,

      // Strings
      firstName: 'Primer nombre',
      middleName: 'Segundo nombre',
      lastName: 'Primer apellido',
      middleLastName: 'Segundo apellido',
      idType: 'Nac.',
      idNumber: 'Número de identificación',
      email: 'Correo electónico',
      password: 'Contraseña',
      confirmPassword: 'Confirme su contraseña',
      areaCode: 'Código de área',
      phoneNumber: 'Número telefónico',
      birthDate: 'Fecha de nacimiento',
      gengre: 'Género',
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
      defaultLanguage: 'Idioma por defecto',
      iAgree: 'Estoy de acuerdo con los términos y condiciones.',
      mustAgree: 'Debes estar de acuerdo',
      receiveNotifications: 'Quiero recibir notificaciones a mi correo.',
      validateAndSend: 'Validar y enviar',
      resetFields: 'Resetear campos'
    }),


    methods: {
      validate () {
        this.$refs.form.validate();
        console.log(this.first_name + this.middle_name + this.last_name)
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
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