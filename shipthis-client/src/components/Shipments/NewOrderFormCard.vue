<template>
  <v-container fluid elevation="0">
    <v-row no-gutters justify="center">
      <v-col cols="12" md="8" align="center">
        <v-stepper v-model="e1">
          <v-stepper-header class="third accent-1">
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
              :class="$vuetify.breakpoint.smAndDown ? 'pa-2' : ''"
              >{{ $t("newOrder.originAndDestinyTitle") }}
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
              :class="$vuetify.breakpoint.smAndDown ? 'pa-2' : ''"
              >{{ $t("newOrder.itemConfigurationTitle") }}</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 3"
              step="3"
              :class="$vuetify.breakpoint.smAndDown ? 'pa-2' : ''"
              >{{ $t("newOrder.orderInformation") }}</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <Step1></Step1>
            </v-stepper-content>

            <v-stepper-content step="2" class="Step2">
              <Step2></Step2>
            </v-stepper-content>

            <v-stepper-content step="3">
              <Loader :dialog="dialog" :message="message"></Loader>
              <Step3 :Invoice="invoice" :Order="order_details"></Step3>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { EventBus } from "../../main.js";
import Loader from "./Loader.vue";
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";
import Repository from "../../services/repositories/repositoryFactory";
const OrderRepository = Repository.get("order");

export default {
  name: "NewOrderFormCard",
  data: () => ({
    e1: 1,
    dialog: false,
    message: "newOrder.CalculatePrices",
    order_details: {},
    invoice: {
      receiver: {
        fullname: "",
        email: "",
      },
    },
  }),
  components: {
    Step1,
    Step2,
    Step3,
    Loader,
  },

  created() {
    EventBus.$on("next-step", (data) => {
      this.e1 = data;
    });
    EventBus.$on("SendInformation-OriginDestiny", (data) => {
      this.order_details = data;
    });
    EventBus.$on("packages", (data) => {
      this.dialog = true;
      this.order_details.items = data;
      this.order_details.useremail = this.$store.getters["users/getUser"].email;
      this.order_details.discount_id = null;
      this.calculatePrices();
    });
  },

  methods: {
    async calculatePrices() {
      let response;
      try {
        response = await OrderRepository.calculatePrices(this.order_details);
        this.invoice = response;
        this.dialog = false;
        this.e1 = 3;
      } catch {
        this.dialog = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
