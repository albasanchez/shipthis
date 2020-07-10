<template>
  <v-container>
    <h3>{{ $t("newOrder.confirmation") }}</h3>

    <v-container fluid class="form-container">
      <h4>{{ $t("newOrder.orderInformation") }}</h4>
      <div class="order-items text-center">
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : ''">
          <v-col class="order-details" cols="12">
            <v-row justify="center">
              <p class="font-weight-bold">{{ $t("newOrder.orderType") }}:</p>
              <p class="pl-2">{{ Invoice.order_type }}</p>
            </v-row>
            <v-row justify="center">
              <p class="font-weight-bold">
                {{ $t("newOrder.ignoreHolidays") }}:
              </p>
              <p v-if="Invoice.ignore_holidays == true" class="pl-2">
                {{ $t("newOrder.yes") }}
              </p>
              <p v-else class="pl-2">{{ $t("newOrder.no") }}</p>
            </v-row>
            <v-row justify="center">
              <p class="font-weight-bold">{{ $t("newOrder.origin") }}:</p>
              <p class="pl-2">{{ Invoice.origin }}</p>
            </v-row>
            <v-row justify="center">
              <p class="font-weight-bold">
                {{ $t("shippingHistory.destiny") }}:
              </p>
              <p class="pl-2">{{ Invoice.destination }}</p>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <div class="order-items">
        <h4>{{ $t("newOrder.receiverInformation") }}</h4>
        <v-row :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : ''">
          <v-col class="order-details" cols="12">
            <v-row justify="center">
              <p class="font-weight-bold">{{ $t("labels.fullName") }}:</p>
              <p class="pl-2">{{ Invoice.receiver.fullname }}</p>
            </v-row>
            <v-row justify="center">
              <p class="font-weight-bold">{{ $t("labels.email") }}:</p>
              <p class="pl-2">{{ Invoice.receiver.email }}</p>
            </v-row>
            <v-row justify="center">
              <p class="font-weight-bold">{{ $t("labels.phoneNumber") }}:</p>
              <p class="pl-2">{{ Invoice.receiver.phone_number }}</p>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <div class="order-items">
        <h4>{{ $t("newOrder.orderDetails") }}</h4>
        <Package :items="Invoice.packages" :readonly="true"></Package>
      </div>

      <div class="order-items">
        <v-row>
          <v-col cols="8" md="6" align="center">
            <v-row justify="center">
              <v-dialog
                v-model="dialogDiscounts"
                persistent
                scrollable
                :disabled="discountbtn"
                max-width="300px"
                v-if="discounts.length > 0"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :small="$vuetify.breakpoint.smAndDown"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mt-5"
                    >{{ $t("newOrder.Discounts") }}</v-btn
                  >
                </template>
                <v-card>
                  <v-card-text>
                    <v-list v-for="(discount, i) in discounts" :key="i">
                      <v-list-item @click="DiscountSelect(discount)">
                        <v-list-item-title>
                          <h4>
                            {{ discount.name }} ({{ discount.percentage }}%)
                          </h4>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogDiscounts = false">{{
                      $t("newOrder.cancelBtn")
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            <v-row justify="center">
              <v-btn
                v-if="discountSelect != null"
                class="mt-5"
                @click="resetDiscount()"
              >
                <span>{{ discountSelect }}</span>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="6" md="3">
            <v-row justify="end">
              <p class="order-details font-weight-bold text-right">
                {{ $t("newOrder.Subtotal") }}:
              </p>
            </v-row>
            <v-row justify="end">
              <p class="order-details font-weight-bold">
                {{ $t("invoice.serviceCost") }}:
              </p>
            </v-row>
            <v-row justify="end">
              <p class="order-details font-weight-bold">
                {{ $t("labels.discount") }}:
              </p>
            </v-row>
            <v-row justify="end">
              <p class="order-details font-weight-bold">
                {{ $t("newOrder.FacturationAmount") }}:
              </p>
            </v-row>
          </v-col>
          <v-col cols="6" md="3">
            <v-row justify="start">
              <p class="order-details pl-2">$ {{ Invoice.subtotal }}</p>
            </v-row>
            <v-row justify="start">
              <p class="order-details pl-2">$ {{ Invoice.additional_taxes }}</p>
            </v-row>
            <v-row justify="start">
              <p class="order-details pl-2" v-if="discountSelect == null">
                $ 0
              </p>
              <p class="order-details pl-2" v-else>$ {{ newPrice }}</p>
            </v-row>
            <v-row justify="start">
              <p class="order-details pl-2">
                $ {{ Invoice.facturation_amount }}
              </p>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-row>
      <v-col align="start">
        <v-btn
          class="primary"
          :small="$vuetify.breakpoint.smAndDown"
          @click="emitNextStep()"
        >
          <v-icon class="mr-1 mt-0">mdi-chevron-left</v-icon>
          <p class="mt-3 hidden-sm-and-down">{{ $t("newOrder.backBtn") }}</p>
        </v-btn>
      </v-col>
      <v-col align="center">
        <v-btn
          text
          class="red--text"
          :small="$vuetify.breakpoint.smAndDown"
          @click="goRoute('HomeUser')"
          >{{ $t("newOrder.cancelBtn") }}</v-btn
        >
      </v-col>
      <v-col align="end">
        <v-btn
          class="primary"
          :small="$vuetify.breakpoint.smAndDown"
          @click="registerOrder()"
        >
          <p class="mt-3 hidden-sm-and-down">{{ $t("newOrder.ConfirmBtn") }}</p>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <Loader :dialog="dialog" :message="message"></Loader>
    <v-snackbar
      v-model="snackbarSuccess"
      type="success"
      top
      timeout="5000"
      color="green"
    >
      {{ $t("newOrder.snackSuccess") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          icon
          color="white"
          v-bind="attrs"
          @click="snackbarSuccess = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarError"
      type="error"
      top
      timeout="5000"
      color="red"
    >
      {{ $t("newOrder.snackError") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          icon
          color="white"
          v-bind="attrs"
          @click="snackbarError = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
import Loader from "./Loader.vue";
import Package from "./Package.vue";
import { EventBus } from "../../main.js";
const OrderRepository = Repository.get("order");
export default {
  name: "Step3",
  data: () => ({
    actualstep: 3,
    discounts: [],
    dialog: false,
    dialogDiscounts: false,
    message: "newOrder.Processing",
    snackbarSuccess: false,
    snackbarError: false,
    User: {},
    total: null,
    newPrice: null,
    discountSelect: null,
    discountbtn: false,
  }),
  components: {
    Loader,
    Package,
  },
  props: ["Invoice", "Order"],

  async mounted() {
    this.loadUserDiscounts();
  },

  methods: {
    goRoute(route) {
      this.$router.push("/" + route);
    },

    emitNextStep() {
      this.actualstep = 2;
      EventBus.$emit("next-step", this.actualstep);
    },

    async loadUserDiscounts() {
      let response;
      this.User.useremail = this.$store.getters["users/getUser"].email;
      response = await OrderRepository.UserDiscounts(this.User);
      this.discounts = response;
    },

    DiscountSelect(discount) {
      this.discountbtn = true;
      this.discountSelect = discount.name + "(" + discount.percentage + "%)";
      if (this.total == null) {
        this.total = this.Invoice.facturation_amount;
      }
      this.dialogDiscounts = false;
      this.Order.discount_id = discount.discount_id;
      this.newPrice = ((this.total * discount.percentage) / 100).toFixed(2);
      this.Invoice.facturation_amount = (
        this.total *
        (1 - discount.percentage / 100)
      ).toFixed(2);
    },

    resetDiscount() {
      this.discountbtn = false;
      this.newPrice = 0;
      this.discountSelect = null;
      this.Invoice.facturation_amount = this.total;
      this.Order.discount_id = null;
    },

    async registerOrder() {
      this.dialog = true;
      try {
        let response;
        response = await OrderRepository.registerOrder(this.Order);
        this.dialog = false;
        this.snackbarSuccess = true;
        EventBus.$off();
        this.$router.push(`/Tracking/${response.ordersheet_id}`);
      } catch {
        this.snackbarError = true;
        this.dialog = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
