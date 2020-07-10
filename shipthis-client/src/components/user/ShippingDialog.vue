<template>
  <v-dialog
    v-model="active"
    max-width="650"
    @click:outside="$emit('closeDialog')"
  >
    <v-card class="text-center">
      <h3
        class="pa-3 secondary--text font-weight-bold"
        :class="$vuetify.breakpoint.mdAndUp ? '' : 'body-2'"
      >
        {{ $t("shippingHistory.order") }}: {{ ship.ordersheet_id }}
      </h3>
      <v-chip :class="ship.order_type" label>{{ ship.order_type }}</v-chip>
      <div class="py-0 px-6">
        <v-card-text class="py-3 my-3 form-container text-center">
          <h3 class="pb-2 primary--text">
            {{ $t("newOrder.orderInformation") }}
          </h3>
          <p class="pb-1">
            <span class="font-weight-bold"
              >{{ $t("shippingHistory.status") }}:</span
            >
            {{ ship.status }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold"
              >{{ $t("shippingHistory.createdDate") }}:</span
            >
            {{ ship.creation_date }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold"
              >{{ $t("newOrder.ignoreHolidays") }}:</span
            >
            {{ ship.ignore_hollydays ? $t("newOrder.yes") : $t("newOrder.no") }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold">{{ $t("newOrder.origin") }}:</span>
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.origin_place.address }}
            <br />
          </p>
          <p>
            <span class="font-weight-bold"
              >{{ $t("labels.destination") }}:</span
            >
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.destination_place.address }}
          </p>
        </v-card-text>
        <v-card-text class="py-3 my-3 form-container text-center">
          <h3 class="pb-2 primary--text">
            {{ $t("newOrder.receiverInformation") }}
          </h3>
          <p class="pb-1">
            <span class="font-weight-bold">{{ $t("labels.fullName") }}:</span>
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.receiver.fullname }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold"
              >{{ $t("labels.phoneNumber") }}:</span
            >
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.receiver.phone_number }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold">{{ $t("labels.email") }}:</span>
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.receiver.email }}
          </p>
        </v-card-text>
      </div>
      <div class="text-center">
        <h3 class="pb-2 primary--text" align-self="center">
          {{ $t("newOrder.items") }}
        </h3>
      </div>
      <div>
        <v-expansion-panels class="items-accordeon px-6" focusable hover>
          <v-expansion-panel
            v-for="(item, index) in ship.packages.slice().reverse()"
            :key="index"
          >
            <v-expansion-panel-header>
              {{ $t("labels.package") }}
              {{ index + 1 }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-2">
              <p class="font-weight-medium body-2 my-2">
                {{
                  item.description
                    ? item.description
                    : $t("labels.noDescription")
                }}
              </p>
              <p class="pb-1 ma-0">
                <span class="font-weight-bold"
                  >{{ $t("newOrder.weight") }}:</span
                >
                <br v-if="$vuetify.breakpoint.xsOnly" />
                {{ item.weight }} gr
              </p>
              <p class="pb-1 ma-0">
                <span class="font-weight-bold"
                  >{{ $t("newOrder.dimensions") }}:</span
                >
                <br v-if="$vuetify.breakpoint.xsOnly" />
                {{ item.width + " x " + item.height + " x " + item.length }}
                cm
              </p>
              <p class="pb-1 ma-0" v-if="item.characteristics.length != 0">
                <span class="font-weight-bold"
                  >{{ $t("newOrder.characteristic") }}:</span
                >
                <br v-if="$vuetify.breakpoint.xsOnly" />
                <span
                  v-for="(characteristic, i) in item.characteristics"
                  :key="i"
                  >{{ characteristic.name }}.</span
                >
              </p>
              <p class="pb-1 ma-0">
                <span class="font-weight-bold"
                  >{{ $t("newOrder.price") }}:</span
                >
                <br v-if="$vuetify.breakpoint.xsOnly" />
                ${{ item.cost }}
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-card-actions class="px-7">
        <v-spacer></v-spacer>
        <v-btn
          color=" red--text"
          class="mr-4 d-inline"
          text
          @click="$emit('closeDialog')"
          >{{ $t("shippingHistory.close") }}</v-btn
        >
        <v-btn
          v-if="track"
          class="success secondary--text d-inline"
          text
          @click="goTracking(ship.ordersheet_id)"
          >{{ $t("shippingHistory.track") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ShippingDialog",
  props: {
    active: Boolean,
    track: Boolean,
    ship: Object,
  },
  methods: {
    goTracking(id) {
      this.$router.push("./tracking/" + id);
    },
  },
};
</script>

<style lang="scss"></style>
