<template>
  <span>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="discount-color discount-word">
          <span class="headline"
            ><v-icon dark class="mr-2 mb-1">mdi-sale</v-icon
            >{{ dialogTitle() }}</span
          >
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-container>
            <v-form
              ref="discount_form"
              v-model="valid"
              v-on="save.prevent"
              lazy-validation
              v-if="action != 'DELETE' && action != 'ASSIGN'"
            >
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formDiscount.name"
                    label="Name"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formDiscount.percentage"
                    suffix="%"
                    label="Percentage"
                    v-mask="'#######'"
                    :rules="[rules.required, rules.percentage]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-row v-if="action == 'DELETE'">
              <v-col cols="12" class="d-flex justify-center">
                <h3>
                  Delete following discount?
                </h3>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <h1>
                  {{ `${formDiscount.name}` }}
                </h1>
              </v-col>
            </v-row>
            <v-form
              ref="discount_form"
              v-model="valid"
              v-on="save.prevent"
              lazy-validation
              v-if="action == 'ASSIGN'"
            >
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <h3>
                    Your will assign the discount :
                  </h3>
                  <p class="text-center">{{ `${formDiscount.name}` }}</p>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <v-select
                    v-model="formDiscount.option"
                    :items="options"
                    item-value="id"
                    item-text="option"
                    label="Choose an user(s)"
                    :rules="[rules.required]"
                    solo
                  ></v-select>
                </v-col>
              </v-row>
              <v-row v-if="formDiscount.option == 5">
                <v-col cols="12" class="d-flex justify-center">
                  <v-select
                    v-if="users.length > 0"
                    v-model="formDiscount.user_id"
                    :items="users"
                    item-value="id"
                    item-text="useremail"
                    label="Select an user"
                    :rules="[rules.required]"
                    solo
                  ></v-select>
                  <h3 v-if="users.length == 0">
                    There aren't users registered in the system
                  </h3>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions class="discount-footer-color">
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="close">Cancel </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :loading="loadingButton"
            @click="save"
            >{{ action == "DELETE" ? "Delete" : "Save" }}</v-btn
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
const DiscountsRepository = Repository.get("discounts");
const UserRepository = Repository.get("users");
import { EventBus } from "../../main.js";

export default {
  name: "DiscountModal",
  props: {},
  data: ($v) => ({
    loadingButton: false,
    userdata: null,
    action: "",
    errorMessages: ["Required field", "The max value is 100%"],
    options: [
      {
        option: "20 Users with more shipments",
        id: "1",
      },
      {
        option: "20 Users with less shipments",
        id: "2",
      },
      {
        option: "All Users",
        id: "3",
      },
      {
        option: "Last users registered ",
        id: "4",
      },
      {
        option: "Specific User",
        id: "5",
      },
    ],
    rules: {
      required: (v) => !!v || $v.errorMessages[0],
      percentage: (v) => v < 101 || $v.errorMessages[1],
    },

    valid: true,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarColor: "",
    timeout: 4000,
    dialog: false,
    users: [],
    formDiscount: {
      id: "",
      name: "",
      percentage: "",
    },
  }),
  methods: {
    activateDialog(action, discount) {
      this.action = action;
      switch (action) {
        case "CREATE":
          return this.addDiscount();
        case "UPDATE":
          return this.editDiscount(discount);
        case "DELETE":
          return this.removeDiscount(discount);
        case "ASSIGN":
          return this.assign(discount);
        default:
          break;
      }
    },

    addDiscount() {
      this.formDiscount = Object.assign(
        {},
        {
          name: "",
          percentage: "",
        }
      );
      if (this.$refs.discount_form) {
        this.$refs.discount_form.reset();
      }
      this.dialog = true;
    },

    editDiscount(discount) {
      this.formDiscount = Object.assign({}, discount);
      this.dialog = true;
    },
    removeDiscount(discount) {
      this.formDiscount = Object.assign({}, discount);
      this.dialog = true;
    },
    assign(discount) {
      this.formDiscount = Object.assign({}, discount);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async createDiscount() {
      let response;
      let discountToCreate = {
        name: this.formDiscount.name,
        percentage: parseFloat(this.formDiscount.percentage),
        status: "ACTIVE",
      };
      try {
        response = await DiscountsRepository.createDiscount(discountToCreate);
        EventBus.$emit("DiscountAdded", response);
        await this.succesfulTransaction("Discount created succesfully");
      } catch {
        this.failedTransaction(
          "There has been an error while creating the discount"
        );
      }
    },

    async assingDiscount() {
      let discountToAssign;

      if (this.formDiscount.option == 5) {
        console.log("if", this.formDiscount);
        discountToAssign = {
          user_id: this.formDiscount.user_id,
          discount_id: this.formDiscount.discount_id,
        };
        await DiscountsRepository.assignDiscount(discountToAssign);
      } else {
        discountToAssign = {
          option: parseInt(this.formDiscount.option),
          discount_id: this.formDiscount.discount_id,
        };
        await DiscountsRepository.assignmultipleDiscounts(discountToAssign);
      }
      try {
        await this.succesfulTransaction("Discount assigned succesfully");
      } catch {
        this.failedTransaction(
          "There has been an error while assigning the discount"
        );
      }
    },
    async updateDiscount() {
      this.formDiscount.percentage = parseFloat(this.formDiscount.percentage);
      await DiscountsRepository.updateDiscount(
        this.formDiscount.discount_id,
        this.formDiscount
      )
        .then(async () => {
          await this.succesfulTransaction("Discount updated succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while updating the discount"
          );
        });
    },
    async deleteDiscount() {
      await DiscountsRepository.deleteDiscount(this.formDiscount.discount_id)
        .then(async () => {
          await this.succesfulTransaction("Discount deleted succesfully");
        })
        .catch(() => {
          this.failedTransaction(
            "There has been an error while deleting the discount"
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
      this.$emit("loadDiscounts");
      this.loading = false;
      if (this.$refs.discount_form) {
        this.$refs.discount_form.reset();
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
          return "Create discount";
        case "UPDATE":
          return "Update discount";
        case "DELETE":
          return "Delete discount";
        case "ASSIGN":
          return "Assign discount";
        default:
          break;
      }
    },
    async loadUsers() {
      let response;
      response = await UserRepository.getUsers();
      this.users = response.filter((res) => res.role == "CLIENT");
    },

    async save() {
      if (this.action === "DELETE" || this.$refs.discount_form.validate()) {
        this.loadingButton = true;
        switch (this.action) {
          case "CREATE":
            await this.createDiscount();
            break;
          case "UPDATE":
            await this.updateDiscount();
            break;
          case "DELETE":
            await this.deleteDiscount();
            break;
          case "ASSIGN":
            await this.assingDiscount();
            break;
          default:
            break;
        }
      }
    },
  },
  mounted() {
    this.userdata = this.$store.getters["users/getUser"];
    this.loadUsers();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
