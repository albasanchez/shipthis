<template>
  <div>
    <v-row align="center" justify="center" v-for="(item, key) in ConfigurationItems" :key="key">
      <v-col cols="12" sm="6">
        <v-card>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-icon size="50px" class="primary--text d-flex">
                        {{
                        item.icon
                        }}
                      </v-icon>
                    </v-col>
                    <v-col cols="6" class="mt-4">
                      <span
                        key="0"
                        class="font-weight-black primary--text text-center general-title ml-1"
                      >{{ item.name }}</span>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content align="center">
                <div v-for="(item, key) in item.items" :key="key">
                  <v-text-field
                    v-model="item.value"
                    :label="item.label"
                    outlined
                    :rules="rules.item"
                    :value="item.value"
                  ></v-text-field>
                </div>
                <v-btn class="success mb-2 mt-2" @click="Update(item)">Save</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-snackbar v-model="snackbarerror" color="red">
        {{ snackError }}
        <v-btn dark text @click="snackbarerror = false">{{ close }}</v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbarsuccess" color="green">
        {{ snackSuccess }}
        <v-btn dark text @click="snackbarsuccess = false">{{ close }}</v-btn>
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Repository from "../../services/repositories/repositoryFactory";
const ConfigurationRepository = Repository.get("configuration");
export default {
  name: "Configuration",
  data: () => ({
    close: "Close",
    configTime: null,
    ConfigurationItems: [],
    currentPrices: null,
    id: 1,
    items: [],
    ItemValidation: "This Item is required",
    rules: {
      required: value =>
        (!!value && value !== "" && value !== undefined) || "Required",

      item: [
        v => !!v || "This Item is required",
        v => v > 0 || "Zero is not valid data"
      ]
    },
    snackbarerror: false,
    snackError: "There was been an error. Please check",
    snackbarsuccess: false,
    snackSuccess: "The actualization have been successfully",
    ZeroValidation: "Zero is not valid data"
  }),
  components: {},
  async mounted() {
    await this.loadCurrentPrices();
    await this.loadConfigTime();
  },
  methods: {
    async loadCurrentPrices() {
      let response;
      response = await ConfigurationRepository.getPrices();
      this.currentPrices = response;
      this.fillItems("Base Cost", this.currentPrices.base_price);
      this.fillItems("Price_km", this.currentPrices.price_km);
      this.fillConfigurationItems("Costs", "mdi-currency-usd", this.items);
    },
    async loadConfigTime() {
      let response;
      response = await ConfigurationRepository.getConfigTime();
      this.configTime = response;
      this.fillItems("Algorithm's Time", this.configTime.config_time);
      this.fillConfigurationItems("Simulation", "mdi-routes", this.items);
    },

    fillItems(label, value) {
      this.items.push({
        label: label,
        value: value
      });
    },
    fillConfigurationItems(name, icon, items) {
      this.ConfigurationItems.push({
        name: name,
        icon: icon,
        id: this.id,
        items: items
      });
      this.id++;
      this.items = [];
    },

    async Update(item) {
      console.log(item);
      if (item.id == 1) {
        console.log("hola");
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
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
