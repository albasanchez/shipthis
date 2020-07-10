<template>
  <v-container>
    <h4>{{ $t("newOrder.originAndDestinyTitle") }}</h4>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-dialog
          v-model="dialogOrigin"
          persistent
          scrollable
          max-width="300px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row justify="center">
              <v-btn
                :small="$vuetify.breakpoint.smAndDown"
                outlined
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >{{ $t("newOrder.OriginQuestion") }}</v-btn
              >
            </v-row>
          </template>
          <v-card>
            <v-card-text>
              <v-list v-for="(office, i) in offices_list" :key="i">
                <v-list-item
                  @click="OriginSelect(office.office_id)"
                  v-if="office.office_id !== Information.DestinyOffice"
                >
                  <v-list-item-title>
                    <h4>{{ office.name }}</h4>
                    <p>{{ office.place.address }}</p>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="red--text" @click="dialogOrigin = false">
                {{ $t("newOrder.cancelBtn") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <p class="order-details" v-if="Information.OriginOffice != 0">
          <span class="font-weight-bold"
            >{{ OriginName }} | {{ OriginDirection }}</span
          >
        </p>
      </v-col>
    </v-row>
    <h4 class="font-weight-light ma-0">
      {{ $t("newOrder.DestinationQuestion") }}
    </h4>
    <v-row align="center" justify="center">
      <v-radio-group row v-model="picked" :rules="rules.item">
        <v-radio :label="$t('newOrder.office')" value="1"></v-radio>
        <v-radio :label="$t('newOrder.personalAddress')" value="2"></v-radio>
      </v-radio-group>
    </v-row>
    <!--Office-->
    <div v-if="picked == 1">
      <v-row justify="center">
        <v-dialog
          v-model="dialogDestiny"
          persistent
          scrollable
          max-width="300px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              outlined
              :small="$vuetify.breakpoint.smAndDown"
              dark
              v-bind="attrs"
              v-on="on"
              >{{ $t("newOrder.destiny") }}</v-btn
            >
          </template>
          <v-card>
            <v-card-text>
              <v-list v-for="(office, i) in offices_list" :key="i">
                <v-list-item
                  v-if="office.office_id !== Information.OriginOffice"
                  @click="DestinySelect(office.office_id)"
                >
                  <v-list-item-title>
                    <h4>{{ office.name }}</h4>
                    <p>{{ office.place.address }}</p>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="red--text" @click="dialogDestiny = false">
                {{ $t("newOrder.cancelBtn") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <p class="order-details" v-if="Information.DestinyOffice != 0">
        <span class="font-weight-bold"
          >{{ DestinyName }} | {{ DestinyDirection }}
        </span>
      </p>
    </div>

    <!--Personal address-->
    <div v-if="picked == 2" align="center" justify="center">
      <v-row justify="center">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="Information.Direction.City"
            dense
            :rules="rules.item"
            :label="$t('newOrder.CityLabel')"
            required
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="Information.Direction.State"
            dense
            :rules="rules.item"
            :label="$t('newOrder.StateLabel')"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="5" cols="12">
          <v-text-field
            v-model="Information.Direction.Address"
            :rules="rules.item"
            dense
            :label="$t('newOrder.address')"
          ></v-text-field>
        </v-col>
        <v-col md="5" cols="12">
          <v-text-field
            v-model="Information.Direction.zip_code"
            dense
            :rules="rules.item"
            v-mask="'#####'"
            :label="$t('newOrder.ZipCodeLabel')"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const OfficeRepository = Repository.get("office");
import { EventBus } from "../../main.js";

export default {
  name: "OriginDestiny",
  data: () => ({
    dialogOrigin: false,
    dialogDestiny: false,
    OriginName: "",
    OriginDirection: "",
    DestinyName: "",
    DestinyDirection: "",
    OOffice: "",
    Information: {
      DestinyOffice: 0,
      OriginOffice: 0,
      Direction: {
        City: null,
        State: null,
        Address: null,
        zip_code: null,
      },
    },
    offices_list: null,
    picked: 0,
    rules: {
      item: [(v) => !!v || "Required"],
    },
  }),
  computed: {},
  components: {},
  async mounted() {
    await this.loadOffices();
  },

  created() {
    EventBus.$on("Information-Step1", () => {
      if (this.picked == 2) {
        this.Information.DestinyOffice = 0;
      }
      EventBus.$emit("Information-OriginDestiny", this.Information);
    });
  },

  methods: {
    OriginSelect(id) {
      this.Information.OriginOffice = id;
      this.dialogOrigin = false;
      this.OOffice = this.offices_list.filter((o) => o.office_id == id);
      this.OriginName = this.OOffice[0].name;
      this.OriginDirection = this.OOffice[0].place.address;
    },
    DestinySelect(id) {
      this.Information.DestinyOffice = id;
      this.Information.Direction.City = null;
      this.Information.Direction.Address = null;
      this.Information.Direction.zip_code = null;
      this.Information.Direction.State = null;
      this.dialogDestiny = false;
      this.OOffice = this.offices_list.filter((o) => o.office_id == id);
      this.DestinyName = this.OOffice[0].name;
      this.DestinyDirection = this.OOffice[0].place.address;
    },

    async loadOffices() {
      let response;
      response = await OfficeRepository.getOffices();
      this.offices_list = response;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
