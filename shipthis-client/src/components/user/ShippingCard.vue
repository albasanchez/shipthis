<template>
  <v-card
    color="white"
    hover
    @click.stop="details_dialog = true"
    class="my-2 shipping-item px-3 py-0 text-center black--text"
    :class="$vuetify.breakpoint.mdAndUp ? 'mx-12' : 'mx-2'"
  >
    <v-row>
      <v-col
        class="row-item badge-field"
        :class="$vuetify.breakpoint.mdAndUp ? '' : 'pb-0'"
        cols="12"
        md="2"
      >
        <v-chip class="mb-0 ml-2" :class="shipOrder.order_type" label>{{
          shipOrder.order_type
        }}</v-chip>
      </v-col>
      <v-col
        class="row-item"
        :class="$vuetify.breakpoint.mdAndUp ? 'pb-4' : 'pa-0'"
        cols="12"
        md="8"
      >
        <v-card-title
          class="d-inline subtitle-1 font-weight-bold pa-0"
          :class="$vuetify.breakpoint.xsOnly ? 'caption' : 'subtitle-1'"
        >
          {{ $t("shippingHistory.id") }}:
          {{ shipOrder.ordersheet_id }}
        </v-card-title>

        <v-card-text class="d-block item-text">
          {{ $t("shippingHistory.status") }}: {{ shipOrder.status }} |
          {{ $t("shippingHistory.createdDate") }}:
          {{ shipOrder.creation_date }} | {{ $t("shippingHistory.items") }}:
          {{ shipOrder.packages.length }}
        </v-card-text>
      </v-col>
      <v-col
        class="track-field"
        cols="12"
        md="2"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'primary mt-3 white--text'
            : 'secondary--text'
        "
        @click="goTracking(shipOrder.ordersheet_id)"
      >
        <h5>{{ $t("shippingHistory.track") }}</h5>
      </v-col>
    </v-row>
    <ShippingDialog
      :active="details_dialog"
      :ship="shipOrder"
      :track="true"
      @closeDialog="details_dialog = false"
    />
  </v-card>
</template>

<script>
import ShippingDialog from "./ShippingDialog.vue";
export default {
  name: "ShippingCard",
  data: () => ({
    details_dialog: false,
  }),
  components: {
    ShippingDialog,
  },
  props: {
    shipOrder: Object,
  },
  methods: {
    goTracking(id) {
      this.$router.push("./tracking/" + id);
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

.shipping-item {
  width: 70%;
  transition: 0.5s !important;
  color: $second-color;
}
.shipping-item:hover {
  background-color: lightgray !important;
}
.item-text {
  font-size: 11px;
  padding-top: 2px;
  padding-bottom: 0px !important;
}
.items-accordeon {
  font-size: 12px;
}
.form-container p {
  margin-bottom: 0px !important;
  font-size: 12px;
}
.track-field {
  border-radius: 0 0 4px 4px;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.badge-field {
  display: flex;
  align-items: center;
  justify-content: center;
}
.track-field:hover {
  background-color: $primary-color;
  border-radius: 0 4px 4px 0;
  color: white !important;
}

@media only screen and (max-width: 720px) {
  .shipping-item {
    width: 100%;
  }
}
</style>
