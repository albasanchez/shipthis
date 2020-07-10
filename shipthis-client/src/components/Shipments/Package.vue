<template>
  <div>
    <v-expansion-panels
      v-model="item.item_id"
      v-for="(item, index) in items"
      :key="index"
    >
      <v-expansion-panel class="mb-2">
        <v-expansion-panel-header
          :class="index == flag && readonly == false ? 'red--text' : ''"
        >
          <v-col cols="8">
            <v-row>
              <p class="font-weight-bold">{{ $t("labels.package") }}:</p>
              <span class="pl-2"> {{ item.description }}</span>
            </v-row>
          </v-col>
          <v-col cols="4" align="end">
            <v-btn
              small
              class="error"
              @click="removeItem(index)"
              v-if="readonly == false"
            >
              <v-icon class="mr-1 mt-0">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-expansion-panel-header>

        <v-expansion-panel-content v-if="readonly == false">
          <v-row>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.item_weight"
                v-mask="'######'"
                :label="$t('newOrder.weight')"
                :readonly="readonly"
                :rules="rules.number"
                @change="check()"
                suffix="gr"
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.item_height"
                v-mask="'######'"
                :label="$t('newOrder.height')"
                :readonly="readonly"
                :rules="rules.number"
                @change="check()"
                suffix="cm"
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.item_width"
                v-mask="'######'"
                :label="$t('newOrder.width')"
                :readonly="readonly"
                :rules="rules.number"
                @change="check()"
                suffix="cm"
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.item_length"
                v-mask="'######'"
                :label="$t('newOrder.length')"
                :readonly="readonly"
                :rules="rules.number"
                @change="check()"
                suffix="cm"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6" cols="12" class="d-flex">
              <v-select
                v-model="item.characteristicsselected"
                :items="characteristics"
                :readonly="readonly"
                item-value="id"
                item-text="name"
                :menu-props="{ maxHeight: '400' }"
                :label="$t('newOrder.characteristic')"
                @change="setCharacteristic(item)"
                multiple
              ></v-select>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-text-field
                v-model="item.description"
                :readonly="readonly"
                :label="$t('newOrder.descriptionpackage')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>

        <v-expansion-panel-content v-else>
          <v-row>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.weight"
                readonly
                :label="$t('newOrder.weight')"
                :rules="rules.number"
                suffix="gr"
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.height"
                readonly
                :label="$t('newOrder.height')"
                :rules="rules.number"
                suffix="cm"
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.width"
                readonly
                :label="$t('newOrder.width')"
                :rules="rules.number"
                suffix="cm"
              ></v-text-field>
            </v-col>
            <v-col md="3" cols="12" class="py-0 my-0">
              <v-text-field
                v-model="item.length"
                readonly
                :label="$t('newOrder.length')"
                :rules="rules.number"
                suffix="cm"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6" cols="12" class="d-flex">
              <v-select
                v-model="item.characteristics"
                :items="item.characteristics"
                readonly
                item-value="id"
                item-text="name"
                :menu-props="{ maxHeight: '400' }"
                :label="$t('newOrder.characteristic')"
                multiple
              ></v-select>
            </v-col>
            <v-col md="6" cols="12" class="d-flex">
              <v-text-field
                v-model="item.description"
                readonly
                :label="$t('newOrder.descriptionpackage')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col md="6" cols="12" class="d-flex">
              <v-text-field
                v-model="item.cost"
                readonly
                prefix="$"
                :label="$t('labels.unitaryCost')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const itemTypeRepository = Repository.get("itemType");
import { EventBus } from "../../main.js";
export default {
  name: "Package",

  data: () => ({
    color: "black",
    rules: {
      item: [(v) => !!v || "Required"],
      number: [(v) => !!v || "Required", (v) => v > 0 || "Zero is not valid"],
    },
    characteristics: [],
    flag: null,
    itemsforCheck: [],
  }),
  props: {
    items: Array,
    readonly: Boolean,
  },
  async mounted() {
    await this.loadCharacteristics();
  },

  created() {
    EventBus.$on("validation", (data) => {
      this.itemsforCheck = data;
      this.check();
    });
  },

  methods: {
    removeItem(index) {
      this.items.splice(index, 1);
      if (index == this.flag) {
        this.flag = null;
      }
    },

    check() {
      for (var j = 0; j < this.itemsforCheck.length; j++) {
        if (
          this.itemsforCheck[j].item_weight == null ||
          this.itemsforCheck[j].item_height == null ||
          this.itemsforCheck[j].item_length == null ||
          this.itemsforCheck[j].item_width == null
        ) {
          this.flag = j;
        } else if (
          this.itemsforCheck[j].item_weight == "" ||
          this.itemsforCheck[j].item_height == "" ||
          this.itemsforCheck[j].item_length == "" ||
          this.itemsforCheck[j].item_width == ""
        ) {
          this.flag = j;
        } else {
          this.flag = null;
        }
      }
    },

    setCharacteristic(item) {
      if (item.characteristics != []) item.characteristics = [];
      for (var j = 0; j < item.characteristicsselected.length; j++) {
        item.characteristics.push({
          characteristic_id: item.characteristicsselected[j],
        });
      }
    },

    async loadCharacteristics() {
      let response;
      response = await itemTypeRepository.getCharacteristics();
      this.characteristics = response;
    },
  },
};
</script>
