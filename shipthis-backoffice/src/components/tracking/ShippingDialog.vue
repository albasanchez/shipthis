<template>
  <v-dialog
    v-model="active"
    max-width="650"
    @click:outside="$emit('closeDialog')"
  >
    <v-card class="text-center">
      <h3
        class="pa-3 dark-text-color font-weight-bold"
        :class="$vuetify.breakpoint.mdAndUp ? '' : 'body-2'"
      >
        Order: {{ ship.ordersheet_id }}
      </h3>
      <v-chip :class="ship.order_type" label>{{ ship.order_type }}</v-chip>
      <div class="py-0 px-6">
        <v-card-text class="py-3 my-3 form-container text-center">
          <h3 class="pb-2 primary--text">
            Order information
          </h3>
          <p class="pb-1">
            <span class="font-weight-bold"
              >Status:</span
            >
            {{ ship.status }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold"
              >Created date:</span
            >
            {{ ship.creation_date }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold"
              >Ignore holidays:</span
            >
            {{ ship.ignore_hollydays ? 'Yes' : 'No' }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold">Origin:</span>
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.origin_place.address }}
            <br />
          </p>
          <p>
            <span class="font-weight-bold"
              >Destination:</span
            >
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.destination_place.address }}
          </p>
        </v-card-text>
        <v-card-text class="py-3 my-3 form-container text-center">
          <h3 class="pb-2 primary--text">
            Receiver information
          </h3>
          <p class="pb-1">
            <span class="font-weight-bold">Full name:</span>
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.receiver.fullname }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold"
              >Phone number:</span
            >
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.receiver.phone_number }}
          </p>
          <p class="pb-1">
            <span class="font-weight-bold">Email:</span>
            <br v-if="$vuetify.breakpoint.xsOnly" />
            {{ ship.receiver.email }}
          </p>
        </v-card-text>
      </div>
      <div class="text-center">
        <h3 class="pb-2 primary--text" align-self="center">
          Packages
        </h3>
      </div>
      <div>
        <v-expansion-panels class="items-accordeon px-6" focusable hover>
          <v-expansion-panel
            v-for="(item, index) in ship.packages.slice().reverse()"
            :key="index"
          >
            <v-expansion-panel-header>
              Package
              {{ index + 1 }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-2">
              <p class="font-weight-medium body-2 my-2">
                {{
                  item.description
                    ? item.description
                    : 'Name not provided'
                }}
              </p>
              <p class="pb-1 ma-0">
                <span class="font-weight-bold"
                  >Weight:</span
                >
                <br v-if="$vuetify.breakpoint.xsOnly" />
                {{ item.weight }} gr
              </p>
              <p class="pb-1 ma-0">
                <span class="font-weight-bold"
                  >Dimensions:</span
                >
                <br v-if="$vuetify.breakpoint.xsOnly" />
                {{ item.width + " x " + item.height + " x " + item.length }}
                cm
              </p>
              <p class="pb-1 ma-0" v-if="item.characteristics.length != 0">
                <span class="font-weight-bold"
                  >Characteristics:</span
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
                  >Price:</span
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
          >Close</v-btn
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
};
</script>

<style lang="scss"></style>
