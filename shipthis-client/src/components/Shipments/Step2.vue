<template>
  <v-container>
    <h4>{{ $t("newOrder.itemConfiguration") }}</h4>
    <v-container fluid class="text-center form-container">
      <v-btn @click="addItem()" color="primary" outlined class="mb-2">
        {{ $t("newOrder.addItemBtn") }}
      </v-btn>
      <div class="order-items" v-if="items.length > 0">
        <v-form ref="form1">
          <Package :items="items" :readonly="readonly"></Package>
        </v-form>
      </div>
    </v-container>
    <v-row>
      <v-col align="start">
        <v-btn
          class="primary"
          :small="$vuetify.breakpoint.smAndDown"
          @click="emitNextStep(0)"
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
          @click="emitNextStep(1)"
        >
          <p class="mt-3 hidden-sm-and-down">{{ $t("newOrder.nextBtn") }}</p>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" type="error" top timeout="5000" color="red">
      {{ $t("newOrder.snackPackages") }}
      <template v-slot:action="{ attrs }">
        <v-btn dark icon color="white" v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { EventBus } from "../../main.js";
import Package from "./Package";
export default {
  name: "Step2",
  data: () => ({
    actualstep: 2,
    dialog: false,
    items: [],
    message: "",
    nextBtn: true,
    readonly: false,
    snackbar: false,
    characteristicsselected: [],
  }),
  components: {
    Package,
  },
  methods: {
    emitNextStep(num) {
      if (num == 1) {
        if (this.items.length == 0) {
          this.snackbar = true;
        } else {
          if (this.$refs.form1.validate()) {
            for (var i = 0; i < this.items.length; i++) {
              this.items[i].item_weight = parseFloat(this.items[i].item_weight);
              this.items[i].item_height = parseFloat(this.items[i].item_height);
              this.items[i].item_length = parseFloat(this.items[i].item_length);
              this.items[i].item_width = parseFloat(this.items[i].item_width);
            }
            EventBus.$emit("packages", this.items);
          } else {
            EventBus.$emit("validation", this.items);
          }
        }
      } else if (num == 0) {
        this.actualstep = 1;
      }
      EventBus.$emit("next-step", this.actualstep);
    },
    goRoute(route) {
      this.$router.push("/" + route);
    },

    addItem() {
      if (this.items.length > 0) {
        if (this.$refs.form1.validate()) {
          this.pushItem();
        }
      } else {
        this.pushItem();
      }
    },
    pushItem() {
      this.items.push({
        item_id: 0,
        characteristics: [],
        characteristicsselected: [],
        item_weight: null,
        item_height: null,
        item_width: null,
        item_length: null,
        description: null,
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
