<template>
  <v-card class="track-card text-center">
    <v-card-title
      class="justify-center dark-text-color font-weight-medium pb-0"
      :class="$vuetify.breakpoint.xsOnly ? 'subtitle-2' : 'subtitle-1'"
      >Order: {{ ship.ordersheet_id }}</v-card-title
    >
    <span>
      <p class="caption mb-0">
        <span class="font-weight-bold"
          >Created date:</span
        >
        {{ ship.creation_date }}
      </p>
      <p class="caption mb-0">
        <span class="font-weight-bold"
          >Status:</span
        >
        {{ ship.status }}
      </p>
      <v-chip small :class="ship.order_type" label>{{
        ship.order_type
      }}</v-chip>
    </span>
    <div class="form-container ma-0 text-center pa-2 my-5">
      <v-row >
        <v-col class="mt-0 py-0">
          <h5 class="dark-text-color">Order information</h5>
          <v-btn
            outlined
            color="#1c1954"
            small
            @click="details_dialog = true"
            >More details</v-btn
          >
        </v-col>
      </v-row>

      <v-row class="pa-3">
        <v-col
          cols="12"
          class="ma-0 pa-0"
          :class="$vuetify.breakpoint.xsOnly ? 'caption' : 'body-2'"
        >
          <p class="ma-0" >
            <span class="font-weight-bold">Ordered by:</span>
            {{ ship.shipper.fullname }}
          </p>
          <p class="ma-0" >
            <span class="font-weight-bold"
              >To receive by:</span
            >
            {{ ship.receiver.fullname }}
          </p>
          <p class="ma-0">
            <span class="font-weight-bold">From:</span>
            {{ ship.origin_place.address }}
          </p>
          <p class="ma-0">
            <span class="font-weight-bold">To:</span>
            {{ ship.destination_place.address }}
          </p>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12" sm="6" order-sm="2" class="checks pt-0">
        <v-card
          elevation="0"
          min-height="250"
          max-height="90vh"
          class="cover-space"
        >
          <Map v-if="route" :route="route" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" order-sm="1" class="checks pt-0">
        <div class="checkpoint-item">
          <v-btn
            class="mx-2 mt-1 white--text checkpoint-box caption"
            small
            color="primary"
            >Origin</v-btn
          >
          <p class="checkpoint-text">
            {{ ship.origin_place.address }}
            <br />
            <span class="font-weight-light">{{ ship.creation_date }}</span>
          </p>
        </div>
        <div v-for="(checkpoint, i) in ship.trajectory.check_points" :key="i">
          <div class="checkpoint-item" v-if="checkpoint.time_mark">
            <v-btn
              class="mx-2 white--text checkpoint-box"
              small
              color="primary"
              >{{ checkpoint.check_point_order }}</v-btn
            >
            <p class="checkpoint-text">
              {{ checkpoint.place.address }}
              <br />
              <span class="font-weight-light">
                {{ formatDate(checkpoint.time_mark) }}
              </span>
            </p>
          </div>
          <div class="checkpoint-item" v-else>
            <v-btn
              class="mx-2 white--text checkpoint-box"
              outlined
              small
              color="primary"
              >{{ checkpoint.check_point_order }}</v-btn
            >
            <p class="checkpoint-text">
              {{ checkpoint.place.address }}
              <br />
              <span class="font-weight-light">
                Checkpoint not reached yet.
              </span>
            </p>
          </div>
        </div>
        <div class="checkpoint-item">
          <v-btn
            class="mx-2 mt-1 white--text checkpoint-box caption"
            small
            :outlined="!ship.delivery_date"
            color="primary"
            >Destination</v-btn
          >
          <p class="checkpoint-text">
            {{ ship.destination_place.address }}
            <br />
            <span class="font-weight-light">
              {{
                ship.delivery_date
                  ? formatDate(ship.delivery_date)
                  : 'Checkpoint not reached yet.'
              }}
            </span>
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Detalles de la orden -->
    <ShippingDialog
      :active="details_dialog"
      :ship="ship"
      :track="false"
      @closeDialog="details_dialog = false"
    />
  </v-card>
</template>

<script>
import ShippingDialog from "./ShippingDialog.vue";
import Map from "./Map.vue";
import moment from "moment";

export default {
  name: "TrackCard",
  data: () => ({
    details_dialog: false,
  }),
  props: {
    ship: Object,
  },
  components: {
    ShippingDialog,
    Map,
  },
  computed: {
    route() {
      let route = [];
      this.ship.trajectory.check_points.map((val) => {
        route.push(val);
      });
      route.unshift({
        check_point_order: 'Origin',
        time_mark: this.ship.creation_date,
        place: this.ship.origin_place,
      });
      route.push({
        check_point_order: 'Destination',
        time_mark: this.ship.delivery_date,
        place: this.ship.destination_place,
      });
      return route;
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
