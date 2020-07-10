<template>
<span>
  <v-dialog v-model="dialog" scrollable persistent max-width="500px">
    <v-card>
      <v-card-title class="warehouse-color warehouse-word log">
        <span class="headline"><v-icon dark class="mr-2 mb-1">mdi-handshake</v-icon>{{ dialogTitle() }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-form
            ref="commercialAlly_form"
            v-model="valid"
            v-on="save.prevent"
            lazy-validation
            v-if="action != 'DELETE'"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formCommercialAlly.name"
                  label="Company name"
                  placeholder="Company name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formCommercialAlly.email"
                  label="Company email"
                  placeholder="company@gmail.com"
                  :rules="[rules.required, rules.emailRules]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formCommercialAlly.phone_number"
                  label="Company phone number"
                  placeholder="+1 (123) 456-7890"
                  v-mask="'+1 (###) ###-####'"
                  :rules="[rules.required, rules.phoneNumberRules]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formCommercialAlly.manager_name"
                  label="Manager name"
                  placeholder="John"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formCommercialAlly.manager_last_name"
                  label="Manager last name"
                  placeholder="Doe"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formCommercialAlly.description"
                  label="Commercial ally description"
                  placeholder="Company description"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            
          </v-form>
          <v-row v-else>
            <v-col cols="12" class="d-flex justify-center">
              <h3>
                Delete following commercial ally?
              </h3>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <h1>
                {{ `${formCommercialAlly.name}` }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="warehouse-footer-color">
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="close">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          :loading="loadingButton"
          @click="save"
          >{{action == "DELETE" ? "Delete": "Save"}}</v-btn
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
       <v-btn
          dark
          icon
          color="white"
          @click="snackbarOpen = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</span>
</template>

<script>
import Repository from "@/services/repositories/repositoryFactory";
const CommercialAllyRepository = Repository.get("commercialAlly");

export default {
  name: "CommercialAllyModal",
  props: {
  },
  data: () => ({
    loadingButton: false,
    userdata:null,
    action:'',
    formCommercialAlly: {
      commercial_ally_key: "",
      description: "",
      email: "",
      manager_last_name: "",
      manager_name: "",
      name: "",
      phone_number: "",
      status: "",
    },
    rules: {
      required: (v) => !!v || "Required field",
      emailRules: (v) => /.+@.+\..+/.test(v) || "Not a valid email",
      phoneNumberRules: (v) => (v && v.length == 17) || "Phone number must have 11 digits",
    },
    valid: true,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarColor: "",
    timeout:4000,
    dialog: false,
  }),
  methods:{
    activateCommercialAllyDialog(action, commercialAlly){
      this.action = action;
      switch (action) {
        case "CREATE":
          return this.addCommercialAlly();
        case "UPDATE":
          return this.editCommercialAlly(commercialAlly);
        case "DELETE":
          return this.removeCommercialAlly(commercialAlly);
        default:
          break;
      }
    },
    addCommercialAlly() {
      this.formCommercialAlly = Object.assign(
        {},
        {
          commercial_ally_key: "",
          description: "",
          email: "",
          manager_last_name: "",
          manager_name: "",
          name: "",
          phone_number: "",
          status: "",
        }
      );
      if (this.$refs.commercialAlly_form) {
        this.$refs.commercialAlly_form.reset();
      }
      this.dialog = true;
    },
    editCommercialAlly(commercialAlly) {
      this.formCommercialAlly = Object.assign({}, commercialAlly);
      this.dialog = true;
    },
    removeCommercialAlly(commercialAlly) {
      this.formCommercialAlly = Object.assign({}, commercialAlly);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async createCommercialAlly() {
      let commercialAllyToCreate = {
        name: this.formCommercialAlly.name,
        email: this.formCommercialAlly.email,
        phone_number: this.formCommercialAlly.phone_number,
        manager_name: this.formCommercialAlly.manager_name,
        manager_last_name: this.formCommercialAlly.manager_last_name,
        description: this.formCommercialAlly.description,
        warehouses: [],
      };
      await CommercialAllyRepository.createCommercialAlly(commercialAllyToCreate)
        .then(async () => {
          await this.succesfulTransaction("Commercial ally created succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while creating the commercial ally"
          );
        });
    },
    async updateCommercialAlly() {
      let commercialAllyToUpdate = {
        commercial_ally_key: this.formCommercialAlly.commercial_ally_key,
        name: this.formCommercialAlly.name,
        email: this.formCommercialAlly.email,
        phone_number: this.formCommercialAlly.phone_number,
        manager_name: this.formCommercialAlly.manager_name,
        manager_last_name: this.formCommercialAlly.manager_last_name,
        description: this.formCommercialAlly.description,
      };
      await CommercialAllyRepository.updateCommercialAlly(
        commercialAllyToUpdate
      )
        .then(async () => {
          await this.succesfulTransaction("Commercial ally updated succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while updating the commercial ally"
          );
        });
    },
    async deleteCommercialAlly() {
      await CommercialAllyRepository.deleteCommercialAlly({commercial_ally_key: this.formCommercialAlly.commercial_ally_key})
        .then(async () => {
          await this.succesfulTransaction("Commercial ally deleted succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while deleting the commercial ally"
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
      this.$emit('loadCommercialAllies');
      //await this.loadCommercialAllys();
      this.loading = false;
      this.formCommercialAlly = {
        commercial_ally_key: "",
        description: "",
        email: "",
        manager_last_name: "",
        manager_name: "",
        name: "",
        phone_number: "",
        status: "",
      };
      if (this.$refs.commercialAlly_form) {
        this.$refs.commercialAlly_form.reset();
      }
    },
    failedTransaction(message) {
      this.loadingButton = false;
      this.snackbarColor = "error";
      this.snackbarMessage = message;
      this.snackbarOpen = true;
      this.dialog = false;
    },
    dialogTitle() {
      switch (this.action) {
        case "CREATE":
          return "Create commercial ally";
        case "UPDATE":
          return "Update commercial ally";
        case "DELETE":
          return "Delete commercial ally";
        default:
          break;
      }
    },
    async save() {
      if (this.action === "DELETE" || this.$refs.commercialAlly_form.validate()) {
        this.loadingButton = true;
        switch (this.action) {
          case "CREATE":
            await this.createCommercialAlly();
            break;
          case "UPDATE":
            await this.updateCommercialAlly();
            break;
          case "DELETE":
            await this.deleteCommercialAlly();
            break;
          default:
            break;
        }
      }
    },
  },
  mounted(){
    this.userdata = this.$store.getters["users/getUser"];
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.log{
  position: sticky;
}
</style>
