<template>
  <v-card
    color="lightgray"
    hover
    @click.stop="details_dialog = true"
    class="mx-12 my-2 shipping-item px-3 py-0 text-center"
    :class="$vuetify.breakpoint.mdAndUp ? 'mx-12' : 'mx-2'"
  >
    <v-row>
      <v-col class="row-item badge-field" cols="12" md="2">
        <v-chip
          class="mb-0 ml-2"
          :class="shipOrder.order_price_hist.order_type.name"
          label
        >
          {{ shipOrder.order_price_hist.order_type.name }}
        </v-chip>
      </v-col>
      <v-col class="row-item" cols="12" md="8">
        <v-card-title class="d-inline subtitle-1 font-weight-bold"
          >{{ $t("shippingHistory.id") }}:
          {{ shipOrder.ordersheet_id }}</v-card-title
        >

        <v-card-text class="d-block item-text"
          >{{ $t("shippingHistory.status") }}: {{ shipOrder.status }} |
          {{ $t("shippingHistory.createdDate") }}:
          {{ shipOrder.creation_date }} | {{ $t("shippingHistory.items") }}:
          {{ shipOrder.items.length }}
        </v-card-text>
      </v-col>
      <!-- <v-col
        class="track-field"
        cols="12"
        md="2"
      >
        <h5>
          {{ $t("shippingHistory.track") }}
        </h5>
      </v-col> -->
    </v-row>
    <v-dialog v-model="details_dialog" max-width="650">
      <v-card class="text-center">
        <h3 class="py-3 primary--text">
          {{ $t("shippingHistory.order") }}: {{ shipOrder.ordersheet_id }}
        </h3>
        <v-chip
          class="mb-2 ml-6"
          :class="shipOrder.order_price_hist.order_type.name"
          label
        >
          {{ shipOrder.order_price_hist.order_type.name }}
        </v-chip>
        <div class="py-0 px-6">
          <v-card-text class="py-3 my-3 form-container text-center ">
            <h3 class="pb-0 primary--text">
              {{ $t("newOrder.orderInformation") }}
            </h3>
            <p>
              <span class="font-weight-bold">
                {{ $t("shippingHistory.status") }}:
              </span>
              {{ shipOrder.status }} |
              <span class="font-weight-bold">
                {{ $t("shippingHistory.createdDate") }}:
              </span>
              {{ shipOrder.creation_date }} <br />
              <span class="font-weight-bold">
                {{ $t("newOrder.ignoreHolidays") }}:
              </span>
              {{ shipOrder.ignore_hollydays }} <br />
              <span class="font-weight-bold">
                {{ $t("newOrder.origin") }}:
              </span>
              {{ shipOrder.origin_office.name }} ({{
                shipOrder.origin_office.place.address
              }})<br />
            </p>
            <p v-if="shipOrder.destination_office">
              <span class="font-weight-bold">
                {{ $t("newOrder.destiny") }}:
              </span>
              {{ shipOrder.destination_office.name }}
              {{ shipOrder.destination_office.place.address }}
            </p>
            <p v-else>
              <span class="font-weight-bold">
                {{ $t("newOrder.destiny") }}:
              </span>
              {{ shipOrder.destination_place.address }}
            </p>
          </v-card-text>
          <v-card-text class="py-3 my-3 form-container text-center ">
            <h3 class="pb-0 primary--text">
              {{ $t("newOrder.receiverInformation") }}
            </h3>
            <p>
              <span class="font-weight-bold">
                Name:
              </span>
              {{ shipOrder.receiver.name }} |
              <span class="font-weight-bold">
                Last Name:
              </span>
              {{ shipOrder.receiver.last_name }} <br />
              <span class="font-weight-bold">
                {{ $t("labels.phoneNumber") }}:
              </span>
              {{ shipOrder.rec_phone_code }}-{{ shipOrder.receiver.phone_number }} |
              <span class="font-weight-bold"> {{ $t("labels.email") }}: </span>
              {{ shipOrder.receiver.email }}
            </p>
          </v-card-text>
        </div>
        <div class="text-center">
          <h3 class="pb-2 primary--text" align-self="center">
            {{ $t("newOrder.items") }}
          </h3>
        </div>
        <v-row>
          <v-expansion-panels class="px-9 items-accordeon text-center" focusable hover>
            <v-expansion-panel
              v-for="(item, index) in shipOrder.items.slice().reverse()"
              :key="index"
            >
              <v-expansion-panel-header
                >Item #{{ index + 1 }} 
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mt-2">
                <p class="mb-2">
                  <span v-if="item.description" class="font-weight-bold">
                    Description:
                  </span> 
                  {{ item.description }} <br />
                  <span class="font-weight-bold">
                    {{ $t("newOrder.weight") }}:
                  </span>
                  {{ item.item_weight }} |
                  <span class="font-weight-bold">
                    Length:
                  </span>
                  {{ item.item_length }} <br />
                  <span class="font-weight-bold">
                    Width:
                  </span>
                  {{ item.item_width }} |
                  <span class="font-weight-bold">
                    Height:
                  </span>
                  {{ item.item_height }} <br />
                  <span class="font-weight-bold">
                    Cost:
                  </span>
                  {{ item.item_cost }} 
                  <br />
                </p>
                <div v-if="item.characteristics.length > 0">
                  <p>
                    <span class="font-weight-bold blue--text">
                      Characteristics
                    </span>
                  </p>
                  <div v-for="(char, index) in item.characteristics" 
                  :key="index">
                    <p class="mb-2"> 
                      <span class="font-weight-bold">
                        Name:
                      </span>
                      {{ char.characteristic.name }} |
                      <span class="font-weight-bold">
                        Status:
                      </span>
                      {{ char.characteristic.status }} |
                      <span class="font-weight-bold">
                        Tax:
                      </span>
                      {{ char.tax }}%
                    </p>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=" red--text"
            class="mr-4 d-inline"
            text
            @click="details_dialog = false"
          >
            {{ $t("shippingHistory.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "ShippingCard",
  data: () => ({
    details_dialog: false
  }),
  props: {
    shipOrder: Object
  },
  methods: {
    goTracking(id) {
      this.$router.push("./tracking/" + id);
    }
  }
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
  background-color: $success-color !important;
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
  background-color: white;
  transition: 0.5s;
  color: $second-color;
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
  color: white;
}
@media only screen and (max-width: 720px) {
  .shipping-item {
    width: 100%;
  }
}
</style>
