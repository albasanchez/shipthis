<template>
  <span>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="receiver-color receiver-word">
          <span class="headline"
            ><v-icon dark class="mr-2 mb-1">mdi-account-group</v-icon
            >{{ dialogTitle() }}</span
          >
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-container>
            <v-form
              ref="receiver_form"
              v-model="valid"
              v-on="save.prevent"
              lazy-validation
              v-if="action != 'DELETE'"
            >
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formReceiver.name"
                    :label="$t('labels.firstName')"
                    placeholder="John"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formReceiver.last_name"
                    :label="$t('labels.lastName')"
                    placeholder="Doe"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formReceiver.email"
                    :label="$t('labels.email')"
                    placeholder="johndoe@gmail.com"
                    :rules="[rules.required, rules.emailRules]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formReceiver.phone_number"
                    :label="$t('labels.phoneNumber')"
                    placeholder="+1 (123) 456-7890"
                    v-mask="'+1 (###) ###-####'"
                    :rules="[rules.required, rules.phoneNumberRules]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-row v-else>
              <v-col cols="12" class="d-flex justify-center">
                <h3>
                  {{ $t("receivers.deleteReceiverMessage") }}
                </h3>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <h1>
                  {{ `${formReceiver.name} ${formReceiver.last_name}` }}
                </h1>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions class="receiver-footer-color">
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="close">{{
            $t("receivers.cancelButton")
          }}</v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loadingButton"
            @click="save"
            >{{
              action == "DELETE"
                ? $t("receivers.deleteButton")
                : $t("receivers.saveButton")
            }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbarOpen"
      type="error"
      top
      :timeout="timeout"
      :color="snackbarColor"
    >
      <strong class="body-1 registry-snackbar font-weight-bold">{{
        snackbarMessage
      }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          icon
          color="white"
          v-bind="attrs"
          @click="snackbarOpen = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </span>
</template>

<script>
import Repository from "@/services/repositories/repositoryFactory";
const ReceiverRepository = Repository.get("receiver");
import { EventBus } from "../../main.js";

export default {
  name: "ReceiverModal",
  props: {},
  data: ($v) => ({
    loadingButton: false,
    userdata: null,
    action: "",
    formReceiver: {
      email: "",
      last_name: "",
      name: "",
      id: -1,
      phone_number: "",
    },
    errorMessages: [
      $v.$t("errorMessages.input"),
      $v.$t("errorMessages.validEmail"),
      $v.$t("errorMessages.phoneNumberLength"),
    ],
    rules: {
      required: (v) => !!v || $v.errorMessages[0],
      emailRules: (v) => /.+@.+\..+/.test(v) || $v.errorMessages[1],
      phoneNumberRules: (v) => (v && v.length == 17) || $v.errorMessages[2],
    },
    valid: true,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarColor: "",
    timeout: 4000,
    dialog: false,
  }),
  methods: {
    activateDialog(action, receiver) {
      this.action = action;
      switch (action) {
        case "CREATE":
          return this.addReceiver();
        case "UPDATE":
          return this.editReceiver(receiver);
        case "DELETE":
          return this.removeReceiver(receiver);
        default:
          break;
      }
    },
    addReceiver() {
      this.formReceiver = Object.assign(
        {},
        {
          email: "",
          last_name: "",
          name: "",
          id: -1,
          phone_number: "",
        }
      );
      if (this.$refs.receiver_form) {
        this.$refs.receiver_form.reset();
      }
      this.dialog = true;
    },
    editReceiver(receiver) {
      this.formReceiver = Object.assign({}, receiver);
      this.dialog = true;
    },
    removeReceiver(receiver) {
      this.formReceiver = Object.assign({}, receiver);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async createReceiver() {
      let response;
      let receiverToCreate = {
        name: this.formReceiver.name,
        last_name: this.formReceiver.last_name,
        phone_number: this.formReceiver.phone_number,
        email: this.formReceiver.email,
        user_fk: this.userdata.user_id,
      };
      try {
        response = await ReceiverRepository.createReceiver(receiverToCreate);
        EventBus.$emit("ReceiverAdded", response);
        await this.succesfulTransaction("Receiver created succesfully");
      } catch {
        this.failedTransaction(
          "There has been an error while creating the receiver"
        );
      }
    },
    async updateReceiver() {
      let receiverToUpdate = {
        name: this.formReceiver.name,
        last_name: this.formReceiver.last_name,
        phone_number: this.formReceiver.phone_number,
        email: this.formReceiver.email,
      };
      await ReceiverRepository.updateReceiver(
        this.formReceiver.id,
        receiverToUpdate
      )
        .then(async () => {
          await this.succesfulTransaction("Receiver updated succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while updating the receiver"
          );
        });
    },
    async deleteReceiver() {
      await ReceiverRepository.deleteReceiver(this.formReceiver.id)
        .then(async () => {
          await this.succesfulTransaction("Receiver deleted succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while deleting the receiver"
          );
        });
    },
    succesfulTransaction(message) {
      this.loadingButton = false;
      this.snackbarColor = "green";
      this.snackbarMessage = message;
      this.snackbarOpen = true;
      this.dialog = false;
      this.loading = true;
      this.$emit("loadReceivers");
      //await this.loadReceivers();
      this.loading = false;
      this.formReceiver = {
        id: -1,
        email: "",
        last_name: "",
        name: "",
        phone_number: "",
      };
      if (this.$refs.receiver_form) {
        this.$refs.receiver_form.reset();
      }
    },
    failedTransaction(message) {
      this.loadingButton = false;
      this.snackbarColor = "error";
      this.snackbarMessage = message;
      this.snackbarOpen = true;
    },
    dialogTitle() {
      switch (this.action) {
        case "CREATE":
          return this.$t("receivers.createReceiverTitle");
        case "UPDATE":
          return this.$t("receivers.updateReceiverTitle");
        case "DELETE":
          return this.$t("receivers.deleteReceiverTitle");
        default:
          break;
      }
    },
    async save() {
      if (this.action === "DELETE" || this.$refs.receiver_form.validate()) {
        this.loadingButton = true;
        switch (this.action) {
          case "CREATE":
            await this.createReceiver();
            break;
          case "UPDATE":
            await this.updateReceiver();
            break;
          case "DELETE":
            await this.deleteReceiver();
            break;
          default:
            break;
        }
      }
    },
  },
  mounted() {
    this.userdata = this.$store.getters["users/getUser"];
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
