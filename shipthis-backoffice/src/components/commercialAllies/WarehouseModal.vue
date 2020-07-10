<template>
<span>
  <v-dialog v-model="dialog" scrollable persistent max-width="500px">
    <v-card>
      <v-card-title class="warehouse-color warehouse-word">
        <span class="headline"><v-icon dark class="mr-2 mb-1">mdi-handshake</v-icon>{{ dialogTitle() }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-form
            ref="warehouse_form"
            v-model="valid"
            v-on="save.prevent"
            lazy-validation
            v-if="action != 'DELETE'"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formWarehouse.name"
                  label="Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6"  class="d-flex align-center " v-if="action== 'UPDATE'">
                <v-btn  dark small block color="indigo" @click="changeEditionStatus()">
                <v-icon class="mr-3" dark>{{editAddress? "mdi-pencil-off" : "mdi-pencil"}}</v-icon> {{editAddress? "Don't Edit Address" : "Edit Address"}}
              </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="action== 'UPDATE'">
              <v-col cols="12">
                <v-text-field
                  v-model="formWarehouse.place.address"
                  label="Previous Address"
                  placeholder="Address"
                  readonly
                  hint="Read Only"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>

            <template v-if="editAddress">
              <v-row justify="center">
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="direction.city"
                    :rules="[rules.required]"
                    label="City"
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="direction.state"
                    :rules="[rules.required]"
                    label="State"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="direction.address"
                    :rules="[rules.required]"
                    label="Address"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="direction.zip_code"
                    :rules="[rules.required]"
                    v-mask="'#####'"
                    label="Zip Code"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>



          </v-form>
          <v-row v-else>
            <v-col cols="12" class="d-flex justify-center">
              <h3>
                Delete following warehouse?
              </h3>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <h1>
                {{ `${formWarehouse.name}` }}
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
          >{{action == "DELETE" ? 'Delete': 'Save'}}</v-btn
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
const CommercialAlliesRepository = Repository.get("commercialAlly");

export default {
  name: "WarehouseModal",
  props: {
  },
  data: () => ({
    loadingButton: false,
    userdata:null,
    invalidAddress:false,
    action:'',
    editAddress:true,
    commercial_ally_key: "",
    direction:{
      city: null,
      state: null,
      address: null,
      zip_code: null,
    },
    formWarehouse: {
      id: -1,
      name: "",
      place:{
        address: ""
      }
    },
    rules: {
      required: (v) => !!v || "Required field",
    },
    valid: true,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarColor: "",
    timeout:4000,
    dialog: false,
  }),
  methods:{
    activateWarehouseDialog(action, commercial_ally_key, warehouse){
      this.action = action;
      this.commercial_ally_key = commercial_ally_key;
      switch (action) {
        case "CREATE":
          return this.addWarehouse();
        case "UPDATE":
          return this.editWarehouse(warehouse);
        case "DELETE":
          return this.removeWarehouse(warehouse);
        default:
          break;
      }
    },
    addWarehouse() {
      this.formWarehouse = Object.assign(
        {},
        {
          name: "",
          status:"",
          place:{
            address: ""
          }
        }
      );
      if (this.$refs.warehouse_form) {
        this.$refs.warehouse_form.reset();
      }
      this.dialog = true;
    },
    editWarehouse(warehouse) {
      this.editAddress = false;
      this.formWarehouse = Object.assign({}, warehouse);
      this.dialog = true;
    },
    removeWarehouse(warehouse) {
      this.formWarehouse = Object.assign({}, warehouse);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async createWarehouse() {
      let warehouseToCreate = {
        name: this.formWarehouse.name,
        commercial_ally_key: this.commercial_ally_key,
        address: this.direction.address +
        " " +
        this.direction.city +
        " " +
        this.direction.state +
        " " +
        this.direction.zip_code
      };
      let validAddress = await this.isAddressValid(warehouseToCreate.address);
      if(validAddress){
        await CommercialAlliesRepository.addWarehouseToCommercialAlly(warehouseToCreate)
        .then(async () => {
          await this.succesfulTransaction("Warehouse created succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while creating the warehouse"
          );
        });
      }
    },
    async updateWarehouse() {
      let warehouseToUpdate = {
        name: this.formWarehouse.name,
        address: this.editAddress? this.direction.address +
        " " +
        this.direction.city +
        " " +
        this.direction.state +
        " " +
        this.direction.zip_code : this.formWarehouse.place.address
      };
      let validAddress = await this.isAddressValid(warehouseToUpdate.address);

      if(validAddress){
        await CommercialAlliesRepository.updateWarehouse(
          this.formWarehouse.id,
          warehouseToUpdate
        )
        .then(async () => {
          await this.succesfulTransaction("Warehouse updated succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while updating the warehouse"
          );
        });
      }

      
    },
    async deleteWarehouse() {
      await CommercialAlliesRepository.deleteWarehouse(this.formWarehouse.id)
        .then(async () => {
          await this.succesfulTransaction("Warehouse deleted succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while deleting the warehouse"
          );
        });
    },
    async isAddressValid(address){
      let response;
       await CommercialAlliesRepository.validateAddress({address: address})
       .then(async () => {
         response = true;
        })
        .catch(() => {
          this.invalidAddress = true;
          this.failedTransaction(
            "Provided address is not valid"
          );
          response = false;
        });
        return response;
    },
    changeEditionStatus(){
      this.editAddress = !this.editAddress;
      this.direction = Object.assign(
      {},
      {
        city: null,
        state: null,
        address: null,
        zip_code: null,
      })
    },
     succesfulTransaction(message) {
      this.loadingButton = false;
      this.snackbarColor = "green";
      this.snackbarMessage = message;
      this.snackbarOpen = true;
      this.dialog = false;
      this.loading = true;
      this.$emit('loadCommercialAllysWarehouses');
      //await this.loadWarehouses();
      this.loading = false;
      this.formWarehouse = {
        id: -1,
        name: "",
        status:"",
        place:{
          address: ""
        }
      };
      if (this.$refs.warehouse_form) {
        this.$refs.warehouse_form.reset();
      }
    },
    failedTransaction(message) {
      this.loadingButton = false;
      this.snackbarColor = "error";
      this.snackbarMessage = message;
      this.snackbarOpen = true;
      if(!this.invalidAddress){
        this.dialog = false;
      }
    },
    dialogTitle() {
      switch (this.action) {
        case "CREATE":
          return "Create warehouse";
        case "UPDATE":
          return "Update warehouse";
        case "DELETE":
          return "Delete warehouse";
        default:
          break;
      }
    },
    async save() {
      if (this.action === "DELETE" || this.$refs.warehouse_form.validate()) {
        this.loadingButton = true;
        switch (this.action) {
          case "CREATE":
            await this.createWarehouse();
            break;
          case "UPDATE":
            await this.updateWarehouse();
            break;
          case "DELETE":
            await this.deleteWarehouse();
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
</style>
