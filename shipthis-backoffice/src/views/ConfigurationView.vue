<template>
  <div class="general-container pt-10">
       <v-row align="center" justify="center">
      <h1 class="text-center primary--text">Configuration</h1>
    </v-row>
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <ConfigurationCard v-for="(item, key) in ConfigurationItems" :key="key" :item="item"></ConfigurationCard>
      </v-col>
    </v-row>
    <v-row class="text-center mt-0">
          <v-col cols="12">
              <v-btn class="primary white--text" @click="goRoute('Home')">
                  Go Back
              </v-btn>
          </v-col>
      </v-row>
    <v-snackbar v-model="snackbarerror" top color="red">
      {{ snackError }}
      <v-btn dark text @click="snackbarerror = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbarsuccess" top color="green">
      {{ snackSuccess }}
      <v-btn dark text @click="snackbarsuccess = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { EventBus } from "../main.js";
import ConfigurationCard from "../components/Configuration/ConfigurationCard.vue";
import Repository from "../services/repositories/repositoryFactory";
const ConfigurationRepository = Repository.get("configuration");
const orderTypeRepository = Repository.get("orderType");
export default {
  name: "Configuration",
  data: () => ({
    char: "",
    charselected: {},
    configTime: {},
    ConfigurationItems: [],
    currentPrices: {},
    characteristics: [],
    id: 1,
    items: [],
    orderTypes: [],
    orderTypeSelected: {},
    snackbarerror: false,
    snackError: "There was been an error. Please check",
    snackbarsuccess: false,
    snackSuccess: "The actualization have been successfully",
  }),
  components: {
    ConfigurationCard
  },
  async mounted() {
    await this.loadCurrentPrices();
    await this.loadConfigTime();
    await this.loadCharacteristics();
    await this.loadOrderType();
  },
  created() {
    EventBus.$on("Update", data => {
      this.Update(data);
    });

    EventBus.$on("UpdateCharacteristic", data => {
      this.UpdateCharacteristic(data);
    });

    EventBus.$on("UpdateType", data => {
      this.UpdateType(data);
    });
  },
  methods: {
    //Current-Prices
    goRoute(route) {
        this.$router.push("/" + route);
        EventBus.$emit("emit-route", "/" + route);
        },
    async loadCurrentPrices() {
      let response;
      response = await ConfigurationRepository.getPrices();
      this.currentPrices = response;
      this.fillItems("Base Cost", parseFloat(this.currentPrices.base_price).toFixed(2), null, "$");
      this.fillItems("Price_km", parseFloat(this.currentPrices.price_km).toFixed(2), null, "$");
      this.fillConfigurationItems("Costs", "mdi-currency-usd", this.items, 1);
    },

    async loadConfigTime() {
      let response;
      response = await ConfigurationRepository.getConfigTime();
      this.configTime = response;
      this.fillItems("Algorithm's Time", this.configTime.config_time, "Min.");
      this.fillConfigurationItems("Simulation", "mdi-routes", this.items, 0);
    },

    async Update(item) {
      if (item.id == 1) {
        this.currentPrices.base_price = parseFloat(item.items[0].value);
        this.currentPrices.price_km = parseFloat(item.items[1].value);

        try {
          await ConfigurationRepository.updatePrices(this.currentPrices);
          this.snackbarsuccess = true;
        } catch {
          this.snackbarerror = true;
        }
      } else if (item.id == 2) {
        try {
          this.configTime.config_time = parseFloat(item.items[0].value);
          await ConfigurationRepository.updateTime(this.configTime);
          this.snackbarsuccess = true;
        } catch {
          this.snackbarerror = true;
        }
      }
    },

    //Characteristics

    async loadCharacteristics() {
      let response;
      response = await ConfigurationRepository.getCharacteristics();
      this.characteristics = response;
      for (var i = 0; i < this.characteristics.length; i++) {
        this.fillItems(
          this.characteristics[i].name,
          this.characteristics[i].tax,
          "%",
          null
        );
      }
      this.fillConfigurationItems(
        "Package's Characteristics",
        "mdi-package-variant-closed",
        this.items,
        2
      );
    },

    async UpdateCharacteristic(item) {
      this.char = this.characteristics.filter(c => c.name == item.label);
      this.charselected.id = this.char[0].id;
      this.charselected.tax = parseFloat(item.value);
      try {
        await ConfigurationRepository.updateCharacteristic(this.charselected);
        this.snackbarsuccess = true;
        this.charselected = {};
      } catch {
        this.snackbarerror = true;
        this.charselected = {};
      }
    },

    //Order Types
    async loadOrderType() {
      let response;
      response = await orderTypeRepository.getOrderTypes();
      this.orderTypes = response;
      for (var i = 0; i < this.orderTypes.length; i++) {
        this.items.push({
          name: this.orderTypes[i].name,
          holidays_tax_value: this.orderTypes[i].prices[0].holidays_tax,
          perc_suffix: "%",
          destination_tax_value: this.orderTypes[i].prices[0]
            .specific_destination_tax,
          time_tax_value: this.orderTypes[i].prices[0].time_tax,
          orderType_id: this.orderTypes[i].order_type_id
        });
      }
      this.fillConfigurationItems(
        "Order Types",
        "mdi-order-bool-ascending",
        this.items,
        3
      );
    },

    async UpdateType(item) {
      this.orderTypeSelected.id = item.orderType_id;
      this.orderTypeSelected.time_tax = parseFloat(item.time_tax_value);
      this.orderTypeSelected.holidays_tax = parseFloat(item.holidays_tax_value);
      this.orderTypeSelected.specific_destination_tax = parseFloat(
        item.destination_tax_value
      );
      try {
        await orderTypeRepository.updateOrderType(this.orderTypeSelected);
        this.snackbarsuccess = true;
        this.orderTypeSelected = {};
      } catch {
        this.snackbarerror = true;
        this.orderTypeSelected = {};
      }
    },

    fillItems(label, value, suffix, prefix) {
      this.items.push({
        label: label,
        value: value,
        suffix: suffix,
        prefix: prefix
      });
    },

    fillConfigurationItems(name, icon, items, form) {
      this.ConfigurationItems.push({
        name: name,
        icon: icon,
        id: this.id,
        items: items,
        form: form
      });
      this.id++;
      this.items = [];
    },
  }
};
</script>

<style lang="scss">
@import "../styles/main.scss";
</style>
