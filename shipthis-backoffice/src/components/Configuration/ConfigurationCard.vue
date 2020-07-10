<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template>
                  <v-row no-gutters>
                    <v-col cols="4">
                      <v-icon size="50px" class="primary--text d-flex">{{ item.icon }}</v-icon>
                    </v-col>
                    <v-col cols="8" class="mt-4">
                      <span
                        key="0"
                        class="font-weight-black primary--text text-center ml-1 general-title"
                      >{{ item.name }}</span>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content align="center" v-if="item.form === 1">
                <div v-for="(item, key) in item.items" :key="key">
                  <v-text-field
                    v-model="item.value"
                    :label="item.label"
                    outlined
                    @keydown="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                    v-money="money"
                    :rules="rules.item"
                    :value="item.value"
                    :suffix="item.suffix"
                    :prefix="item.prefix"
                  ></v-text-field>
                </div>
                <v-btn class="success primary--text mb-2 mt-2" @click="Update(item)">Update</v-btn>
              </v-expansion-panel-content>
              <v-expansion-panel-content align="center" v-if="item.form === 0">
                <div v-for="(item, key) in item.items" :key="key">
                  <v-text-field
                    v-model="item.value"
                    :label="item.label"
                    outlined
                    v-mask="'#########'"
                    :rules="rules.item"
                    :value="item.value"
                    :suffix="item.suffix"
                    :prefix="item.prefix"
                  ></v-text-field>
                </div>
                <v-btn class="success primary--text mb-2 mt-2" @click="Update(item)">Update</v-btn>
              </v-expansion-panel-content>

              <v-expansion-panel-content align="center" v-if="item.form === 2">
                <div v-for="(char, key) in item.items" :key="key">
                  <v-row>
                    <v-col cols="12" lg="9" xl="10" class="pa-0">
                      <v-text-field
                        v-model="char.value"
                        :label="char.label"
                        outlined
                        v-mask="'#########'"
                        :rules="rules.item"
                        :value="char.value"
                        :suffix="char.suffix"
                        :prefix="char.prefix"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3" xl="2">
                      <v-btn class="success primary--text ma-0" @click="UpdateCharacteristic(char)">Update</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-content>

              <v-expansion-panel-content align="center" v-if="item.form === 3">
                <div v-for="(char, order_type_id) in item.items" :key="order_type_id">
                  <v-expansion-panels class="mb-2">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <v-row>
                          <h4 class="mt-2">{{ char.name }}</h4>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="char.holidays_tax_value"
                              label="Holidays tax"
                              v-mask="'#########'"
                              outlined
                              :rules="rules.item"
                              :value="char.value"
                              :suffix="char.perc_suffix"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="char.destination_tax_value"
                              label="Specific destination tax"
                              v-mask="'#########'"
                              outlined
                              :rules="rules.item"
                              :value="char.destination_tax_value"
                              :suffix="char.perc_suffix"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="char.time_tax_value"
                              label="Time tax"
                              outlined
                              v-mask="'#########'"
                              :rules="rules.item"
                              :value="char.time_tax_value"
                              :suffix="char.perc_suffix"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-btn class="success primary--text" @click="UpdateType(char)">Update</v-btn>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { EventBus } from "../../main.js";
import { VMoney } from "v-money";
export default {
  name: "Configuration",
  props: ["item"],
  data: () => ({
    rules: {
      required: value =>
        (!!value && value !== "" && value !== undefined) || "Required",

      item: [v => !!v || "This Item is required"]
    },
    money: {
      decimal: ".",
      precision: 2,
      masked: false,
      min: 0,
      max: 10000000
    }
  }),
  methods: {
    Update(item) {
      EventBus.$emit("Update", item);
    },

    UpdateCharacteristic(item) {
      EventBus.$emit("UpdateCharacteristic", item);
    },

    UpdateType(item) {
      EventBus.$emit("UpdateType", item);
    }
  },
  directives: { money: VMoney }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
