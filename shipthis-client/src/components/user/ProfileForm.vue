<template>
  <v-card align-self="center">
    <v-tabs
      vertical
      background-color="grey lighten-2"
      @change="changeTab()"
      v-if="userdata.person"
    >
      <div class="d-none d-sm-flex">
        <div>
          <div class="pa-4">
            <v-avatar size="100">
              <v-img
                v-if="userdata.person.picture_url === null"
                src="@/assets/dashboard/dash-user.png"
                contain
              ></v-img>
              <v-img v-else :src="userdata.person.picture_url" contain></v-img>
            </v-avatar>
          </div>
          <div v-show="showPic">
            <input
              class="d-none"
              type="file"
              ref="fileInput"
              @change="uploadImage"
              accept="image/*"
            />
            <v-btn text small @click="click_input">
              {{ $t("profile.picture").toUpperCase() }}</v-btn
            >
          </div>
        </div>
      </div>

      <v-tab @click="dontHidePic" class="tab">
        <div class="ma-0 d-flex justify-start align-center">
          <v-icon left>mdi-account</v-icon>
          <p class="ma-0 d-xs-none d-none d-sm-flex">
            {{ $t("profile.details").toUpperCase() }}
          </p>
        </div>
      </v-tab>
      <v-tab
        :disabled="(signUpType == 'FACEBOOK' || signUpType == 'GOOGLE')"
        @click="hidePic"
        class="tab"
      >
        <div class="ma-0 d-flex justify-start align-center">
          <v-icon left>mdi-lock</v-icon>
          <p class="ma-0 d-xs-none d-none d-sm-flex">
            {{ $t("profile.security").toUpperCase() }}
          </p>
        </div>
      </v-tab>
      <v-row
        align="end"
        class="page-content px-3"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <v-col
          ><v-dialog v-model="dialog" persistent max-width="325">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                block
                color="error"
                dark
                v-bind="attrs"
                v-on="on"
                class="white--text"
                >{{ $t("buttons.deleteAccount") }}</v-btn
              >
            </template>
            <v-card dark color="white">
              <v-card-title class="red mb-5">
                <span class="headline"
                  ><v-icon dark class="mr-2 mb-1">mdi-trash-can</v-icon
                  >{{ $t("profile.deleteAccountTitle") }}</span
                >
              </v-card-title>
              <v-card-text class="black--text">{{
                $t("profile.deleteAccountText")
              }}</v-card-text>
              <v-card-actions class="receiver-footer-color">
                <v-spacer></v-spacer>
                <v-btn color="accent" text @click="dialog = false">{{
                  $t("profile.deleteAccountDecline")
                }}</v-btn>
                <v-btn color="red darken-2" text @click="deleteAccount">{{
                  $t("profile.deleteAccountAccept")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog></v-col
        >
      </v-row>

      <v-tab-item>
        <v-snackbar color="success" v-model="snackbar" :timeout="timeout" top
          ><strong class="secondary--text">
            {{ $t("profile.success") }}
          </strong>
          <template v-slot:action="{ attrs }">
            <v-btn
              icon
              text
              v-bind="attrs"
              @click="snackbar = false"
              class="secondary--text"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template></v-snackbar
        >
        <v-snackbar color="error" v-model="snackbarError" :timeout="timeout" top
          ><strong>
            {{ $t("profile.deleteAccountError") }}
          </strong>
          <template v-slot:action="{ attrs }">
            <v-btn icon dark text v-bind="attrs" @click="snackbarError = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template></v-snackbar
        >

        <v-card min-height="425" class="pt-4 pr-4 pb-4 mx-3" flat>
          <div class="d-flex d-sm-none">
            <div class="image">
              <v-avatar size="100">
                <v-img
                  v-if="userdata.person.picture_url === null"
                  src="@/assets/dashboard/dash-user.png"
                  width="100"
                ></v-img>
                <v-img
                  v-else
                  :src="userdata.person.picture_url"
                  width="100"
                ></v-img>
              </v-avatar>

              <input
                class="d-none"
                type="file"
                ref="fileInput"
                @change="uploadImage"
                accept="image/*"
              />
              <v-btn text small @click="click_input">
                {{ $t("profile.picture").toUpperCase() }}</v-btn
              >
            </div>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="6" cols="12">
                <v-text-field
                  v-model="userdata.email"
                  :rules="[rules.required, rules.email]"
                  :label="$t('labels.email')"
                  required
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
              <v-col md="6" cols="12">
                <v-select
                  v-model="userdata.person.def_language"
                  :items="languages"
                  item-text="name"
                  item-value="value"
                  :rules="[(v) => !!v || 'Selecciona un lenguaje por defecto.']"
                  :label="$t('labels.defaultLanguage')"
                  required
                  outlined
                >
                  <template v-slot:selection="{ item }">{{
                    item.name
                  }}</template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="3" cols="12">
                <v-text-field
                  v-model="userdata.person.first_name"
                  :rules="[rules.required]"
                  :label="$t('labels.firstName')"
                  required
                  outlined
                  :disabled="(signUpType == 'FACEBOOK' || signUpType == 'GOOGLE')"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12">
                <v-text-field
                  v-model="userdata.person.middle_name"
                  :label="$t('labels.middleName')"
                  outlined
                  :disabled="(signUpType == 'FACEBOOK' || signUpType == 'GOOGLE')"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12">
                <v-text-field
                  v-model="userdata.person.last_name"
                  :rules="[rules.required]"
                  :label="$t('labels.lastName')"
                  required
                  outlined
                  :disabled="(signUpType == 'FACEBOOK' || signUpType == 'GOOGLE')"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12">
                <v-text-field
                  v-model="userdata.person.second_last_name"
                  :label="$t('labels.middleLastName')"
                  outlined
                  :disabled="(signUpType == 'FACEBOOK' || signUpType == 'GOOGLE')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="6" cols="12">
                <v-text-field
                  v-model="userdata.person.phone_number"
                  :label="$t('labels.phoneNumber')"
                  placeholder="+1 (123) 456-7890"
                  v-mask="'+1 (###) ###-####'"
                  :rules="[rules.phone]"
                  required
                  outlined
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
              <v-col cols="12" sm="4">
                <v-btn
                  block
                  :disabled="!valid"
                  :loading="loading"
                  color="success secondary--text"
                  class="mr-4"
                  @click="validate"
                  >{{ $t("buttons.saveChanges") }}</v-btn
                >
              </v-col>
              <v-col cols="12" sm="4" v-if="$vuetify.breakpoint.xsOnly">
                <v-dialog v-model="dialog" persistent max-width="325">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      color="error"
                      class="mr-4"
                      v-bind="attrs"
                      v-on="on"
                      >{{ $t("buttons.deleteAccount") }}</v-btn
                    >
                  </template>
                  <v-card dark color="white">
                    <v-card-title class="red mb-5">
                      <span class="headline"
                        ><v-icon dark class="mr-2 mb-1">mdi-trash-can</v-icon
                        >{{ $t("profile.deleteAccountTitle") }}</span
                      >
                    </v-card-title>
                    <v-card-text class="black--text">{{
                      $t("profile.deleteAccountText")
                    }}</v-card-text>
                    <v-card-actions class="receiver-footer-color">
                      <v-spacer></v-spacer>
                      <v-btn color="accent" text @click="dialog = false">{{
                        $t("profile.deleteAccountDecline")
                      }}</v-btn>
                      <v-btn color="red darken-2" text @click="deleteAccount">{{
                        $t("profile.deleteAccountAccept")
                      }}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card min-height="425" class="pt-4 pr-4 pb-4 mx-3" flat>
          <v-form ref="passForm" v-model="validPass" lazy-validation>
            <v-container fluid fill-height>
              <v-row justify="center" align="center">
                <v-col md="8" cols="12">
                  <v-text-field
                    v-model="old_password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.min, rules.current]"
                    :type="show1 ? 'text' : 'password'"
                    name="actualPassword"
                    :label="$t('labels.currentPassword')"
                    counter
                    outlined
                    @click:append="show1 = !show1"
                    ref="currentPassword"
                    class="mt-6"
                  ></v-text-field>
                  <v-text-field
                    v-model="new_password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="new_password"
                    :label="$t('labels.newPassword')"
                    counter
                    outlined
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <v-text-field
                    v-model="user_password_confirm"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.min, rules.required, rules.passwordMatch]"
                    :type="show3 ? 'text' : 'password'"
                    name="confirm_password"
                    :label="$t('labels.confirmPassword')"
                    counter
                    @click:append="show3 = !show3"
                    outlined
                  ></v-text-field>
                  <v-btn
                    xl
                    :disabled="validPass && user_password_confirm === ''"
                    color="success secondary--text"
                    class="mt-5"
                    @click="validatePass"
                    >{{ $t("buttons.saveChanges") }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
            <v-snackbar
              color="success"
              v-model="snackbar"
              :timeout="timeout"
              top
              ><strong class="secondary--text">
                {{ $t("profile.success") }}
              </strong>
              <template v-slot:action="{ attrs }">
                <v-btn
                  icon
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                  class="secondary--text"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template></v-snackbar
            >
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "ProfileForm",
  data: function ($v) {
    return {
      userdata: {},
      show1: false,
      show2: false,
      show3: false,
      loading: false,
      valid: true,
      validPass: false,
      old_password: "",
      new_password: "",
      user_password_confirm: "",
      languages: [
        { name: "English", value: "EN" },
        { name: "Español", value: "ES" },
      ],

      password: "",
      rules: {
        required: (value) => !!value || $v.$t("errorMessages.input"),
        min: (v) => v.length >= 6 || $v.$t("errorMessages.minCharacters"),
        email: (v) => /.+@.+\..+/.test(v) || $v.$t("errorMessages.validEmail"),
        phone: (v) =>
          (v && v.length == 17) || $v.$t("errorMessages.phoneNumberLength"),
        passwordMatch: (v) =>
          v === this.new_password ||
          $v.$t("errorMessages.notMatchingPasswords"),
        current: (v) =>
          (v && this.error === "") ||
          $v.$t("errorMessages.incorrectCurrentPassword"),
      },

      files: [],
      showPic: true,
      error: "",
      snackbar: false,
      snackbarError: false,
      timeout: 2000,
      dialog: false,
    };
  },
  methods: {
    async validate() {
      const isValidForm = this.$refs.form.validate();
      if (isValidForm) {
        //enviar userdata al backend
        await this.$store.dispatch("users/updateProfile", {
          user_id: this.userdata.user_id,
          first_name: this.userdata.person.first_name,
          middle_name: this.userdata.person.middle_name,
          last_name: this.userdata.person.last_name,
          second_last_name: this.userdata.person.second_last_name,
          phone_number: this.userdata.person.phone_number,
          def_language: this.userdata.person.def_language,
          picture_url: this.userdata.person.picture_url,
          receive_notifications: this.userdata.person.receive_notifications,
        });
        if (this.error === "") {
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/HomeUser");
          }, this.timeout);
        }
      }
    },
    async validatePass() {
      const isValidForm = this.$refs.passForm.validate();
      if (isValidForm) {
        //enviar contraseña vieja y nueva al backend
        await this.$store.dispatch("users/updatePassword", {
          user_id: this.userdata.user_id,
          actual_password: this.old_password,
          new_password: this.user_password_confirm,
        });
        this.error = this.$store.getters["users/getError"].error;
        if (this.error !== "") {
          this.$refs.passForm.validate();
        } else {
          this.snackbar = true;
          setTimeout(() => {
            this.$router.push("/HomeUser");
          }, this.timeout);
        }
      }
    },
    click_input() {
      this.$refs.fileInput.click();
    },
    uploadImage(e) {
      const file = e.target.files[0];
      const storageRef = firebase.storage().ref("images/" + file.name);

      const task = storageRef.put(file);
      this.loading = true;
      task.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          task.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              this.userdata.person.picture_url = url;
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      );
    },
    hidePic() {
      this.showPic = false;
    },
    dontHidePic() {
      this.showPic = true;
    },
    async deleteAccount() {
      // se elimina el usuario enviado al backend
      this.dialog = false;
      await this.$store.dispatch("users/deleteAccount", this.userdata.user_id);
      this.error = this.$store.getters["users/getError"].error;
      if (this.error === "") {
        this.$store.dispatch("logout");
        this.$router.push("/");
      } else {
        this.snackbarError = true;
      }
    },
    changeTab() {
      this.userdata = JSON.parse(
        JSON.stringify(this.$store.getters["users/getUser"])
      );
      if (this.$refs.passForm) {
        this.password = "";
        this.new_password = "";
        this.old_password = "";
        this.$refs.passForm.resetValidation();
      }
    },
  },
  mounted() {
    this.userdata = JSON.parse(
      JSON.stringify(this.$store.getters["users/getUser"])
    );
  },
  computed: {
    signUpType() {
      return this.userdata.registration_type;
    },
  },
  watch: {
    old_password: function () {
      this.error = "";
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
