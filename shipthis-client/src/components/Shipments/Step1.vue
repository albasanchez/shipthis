<template>
  <v-container>
    <v-form ref="form1">
      <v-container fluid class="text-center form-container">
        <h4>{{ $t("newOrder.orderType") }}</h4>
        <v-row>
          <v-col md="12" cols="12" class="d-flex">
            <v-select
              :items="order_types_list"
              :label="$t('newOrder.orderType')"
              :rules="rules.list"
              v-model="order_details.order_price_hist"
              item-value="prices[0].order_price_hist_id"
              item-text="name"
            ></v-select>
          </v-col>
        </v-row>
        <div
          class="form-row"
          v-for="(typeItem, i) in order_types_list"
          :key="i"
        >
          <v-row
            class="pa-0 ma-0"
            v-if="
              typeItem.prices[0].order_price_hist_id ==
              order_details.order_price_hist
            "
          >
            <v-col cols="12" class="text-center">
              <p class="text-center item-type-text">
                {{ $t("newOrder.daysToDeliver") }}:
                {{ typeItem.days_to_deliver }}
                <br />
                {{ $t("newOrder.timeTax") }}: {{ typeItem.prices[0].time_tax }}%
                <br />
                {{ $t("newOrder.holidaysTax") }}:
                {{ typeItem.prices[0].holidays_tax }}%
                <br />
                {{ $t("newOrder.specificDestinatarioTax") }}:
                {{ typeItem.prices[0].specific_destination_tax }}%
              </p>
            </v-col>
          </v-row>
        </div>

        <v-checkbox
          v-model="order_details.ignore_holidays"
          :label="$t('newOrder.ignoreHolidays')"
          class="ma-0"
        ></v-checkbox>
      </v-container>

      <!-- Sección 1.2: Origen y destino -->
      <v-container fluid class="text-center form-container">
        <OriginDestiny></OriginDestiny>
        <Loader :dialog="dialog" :message="message"></Loader>
      </v-container>

      <v-container fluid class="text-center form-container">
        <Receivers></Receivers>
      </v-container>

      <v-snackbar
        v-model="snackbarValidateDirection"
        type="error"
        top
        timeout="5000"
        color="red"
      >
        {{ $t("newOrder.snackValidateDirection") }}
        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            icon
            color="white"
            v-bind="attrs"
            @click="snackbarValidateDirection = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="snackbarOriginDestination"
        type="error"
        top
        timeout="5000"
        color="red"
      >
        {{ $t("newOrder.snackOriginDestinationMsg") }}
        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            icon
            color="white"
            v-bind="attrs"
            @click="snackbarOriginDestination = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="snackbarReceiver"
        type="error"
        top
        timeout="5000"
        color="red"
      >
        {{ $t("newOrder.snackReceiver") }}
        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            icon
            color="white"
            v-bind="attrs"
            @click="snackbarReceiver = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-form>
    <v-row>
      <v-col align="begin"></v-col>
      <v-col align="center">
        <v-btn
          text
          :small="$vuetify.breakpoint.smAndDown"
          class="red--text"
          @click="goRoute('HomeUser')"
          >{{ $t("newOrder.cancelBtn") }}</v-btn
        >
      </v-col>
      <v-col align="end">
        <v-btn
          :small="$vuetify.breakpoint.smAndDown"
          class="primary"
          @click="ComponentsInformation()"
        >
          <p class="mt-3 hidden-sm-and-down">{{ $t("newOrder.nextBtn") }}</p>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
import Loader from "./Loader.vue";
const OrderTypeRepository = Repository.get("orderType");
const OrderRepository = Repository.get("order");
import { EventBus } from "../../main.js";
import OriginDestiny from "./OriginDestiny.vue";
import Receivers from "./Receivers.vue";

export default {
  name: "Step1",

  data: () => ({
    dialog: false,
    message: "newOrder.processInformation",
    rules: {
      list: [(v) => !!v || "Required"],
    },
    snackbarOriginDestination: false,
    snackbarValidateDirection: false,
    snackbarReceiver: false,
    actualstep: 1,
    Address: {},
    order_details: {
      origin_office: 0,
      order_price_hist: null,
      receiver_id: null,
      ignore_holidays: false,
      destination_office: 0,
      destination_address: null,
    },
    order_types_list: null,
  }),
  computed: {},
  components: {
    OriginDestiny,
    Loader,
    Receivers,
  },
  async mounted() {
    await this.loadOrderTypes();
  },

  created() {
    EventBus.$on("Information-OriginDestiny", (data) => {
      this.order_details.origin_office = data.OriginOffice;
      if (data.Direction.Address != null) {
        this.order_details.destination_office = 0;
        this.validate(data.Direction);
      } else {
        this.order_details.destination_office = data.DestinyOffice;
        this.order_details.destination_address = null;
        this.validate(null);
      }
    });

    EventBus.$on("Information-Receivers", (data) => {
      this.order_details.receiver_id = data;
    });
  },

  methods: {
    ComponentsInformation() {
      EventBus.$emit("Information-Step1");
    },

    async verificateDirection(Direction) {
      this.dialog = true;
      let response;
      this.Address.address =
        Direction.Address +
        " " +
        Direction.City +
        " " +
        Direction.State +
        " " +
        Direction.zip_code;

      try {
        response = await OrderRepository.validateDirection(this.Address);
        this.order_details.destination_address = this.Address.address;
        this.Address = response;
        this.dialog = false;
        this.actualstep = 2;
        EventBus.$emit("next-step", this.actualstep);
        EventBus.$emit("SendInformation-OriginDestiny", this.order_details);
      } catch {
        this.dialog = false;
        this.snackbarValidateDirection = true;
      }
    },

    validate(direction) {
      if (
        this.$refs.form1.validate() &&
        this.order_details.receiver_id != null
      ) {
        if (direction != null && this.order_details.OriginOffice != 0) {
          this.verificateDirection(direction);
        } else {
          if (
            this.order_details.destination_office != 0 &&
            this.order_details.origin_office != 0
          ) {
            this.actualstep = 2;
            EventBus.$emit("next-step", this.actualstep);
            EventBus.$emit("SendInformation-OriginDestiny", this.order_details);
          } else {
            this.snackbarOriginDestination = true;
          }
        }
      } else if (
        (this.order_details.origin_office == 0 ||
          this.order_details.destination_office == 0) &&
        (this.order_details.destination_address != null ||
          this.order_details.origin_office == 0 ||
          this.order_details.destination_address == null ||
          this.order_details.origin_office != 0) &&
        this.order_details.destination_address == null &&
        this.order_details.destination_office == 0
      ) {
        this.snackbarOriginDestination = true;
      } else if (this.order_details.receiver_id == null) {
        this.snackbarReceiver = true;
      }
    },

    goRoute(route) {
      this.$router.push("/" + route);
    },

    async loadOrderTypes() {
      let response;
      response = await OrderTypeRepository.getOrderTypes();
      this.order_types_list = response;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
