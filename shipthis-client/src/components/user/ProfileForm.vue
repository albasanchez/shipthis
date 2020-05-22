<template>
  <v-card class="profile-form"  align-self="center">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <v-row>
            <v-col md="6" cols="12">
                <v-text-field
                    v-model="user_email"
                    :rules="emailRules"
                    :label="email"
                    required
                    ></v-text-field>
            </v-col>

            <v-col md="6" cols="12">
                <v-select 
                    v-model="default_language"
                    :items="default_language_items"
                    :rules="[v => !!v || 'Selecciona un lenguaje por defecto.']"
                    :label="defaultLanguage" 
                    required
                ></v-select>
            </v-col>

        </v-row>
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
            <v-col md="4" sm="12">
                <v-text-field
                    v-model="old_password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="actualPassword"
                    :label="actualPassword"
                    hint="Al menos 6 caracteres"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </v-col>
            <v-col md="4" sm="12">
                <v-text-field
                    v-model="new_password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="new_password"
                    :label="newPassword"
                    hint="Al menos 6 caracteres"
                    counter
                    @click:append="show2 = !show2"
                ></v-text-field>
            </v-col>
            <v-col md="4" sm="12">
                <v-text-field
                    v-model="user_password_confirm"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="confirm_password"
                    :label="confirmPassword"
                    hint="Al menos 6 caracteres"
                    counter
                    @click:append="show3 = !show3"
                ></v-text-field>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col md="2" cols="2">
                <v-text-field
                    v-model="area_code"
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
                    {{ saveChanges }}
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

</template>

<script>
export default {
    name: "ProfileForm",
    data: () => ({
        user_email: 'djmonroy9@gmail.com',
        first_name: 'David',
        middle_name: 'Javier',
        last_name: 'Monroy',
        middle_last_name: 'Pacheco',
        area_code: '+58',
        phone_number: '2756537',
        default_language: 'Español',
        default_language_items: [
            'Español',
            'Inglés'
        ],
        checkbox_notifications: true,
        show1: false,
        show2: false,
        show3: false,
        old_password: 'admins',
        new_password: '',
        user_password_confirm: '',

        // Rules
        emailRules: [
            v => !!v || 'El E-mail es obligatorio',
            v => /.+@.+\..+/.test(v) || 'El E-mail debe ser válido',
        ],
        firstNameRules: [
            v => !!v || 'El nombre es obligatorio',
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
        password: '',
        rules: {
          required: value => !!value || 'La contraseña es obligatoria.',
          min: v => v.length >= 6 || 'Al menos 6 caracteres',
        },

        // Strings
        email: 'Correo electrónico',
        firstName: 'Primer nombre',
        middleName: 'Segundo nombre',
        lastName: 'Primer apellido',
        middleLastName: 'Segundo apellido',
        areaCode: 'Código de area',
        phoneNumber: 'Número telefónico',
        defaultLanguage: 'Idioma por defecto',
        saveChanges: 'Guardar cambios',
        resetFields: 'Resetear campos',
        receiveNotifications: 'Quiero recibir notificaciones en mi correo.',
        newPassword: 'Nueva contraseña',
        actualPassword: 'Contraseña actual',
        confirmPassword: 'Confirme su contraseña',
    }),
    methods: {
      validate () {
        this.$refs.form.validate();
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';

</style>