<template>
  <v-card class="track-card" align-self="center">
    <v-card-title class="text-center secondary--text">{{ $t("shippingHistory.order") }}: {{ ship.ordersheet_id }}</v-card-title>
    <v-row>
        <v-card-text>
          <v-row>
            <v-col cols="6" class="pb-0">
              <p class="display-5">
                <span class="font-weight-bold"> {{ $t("tracking.from") }}: </span> <br> {{ ship.origin_office.place.address }}
              </p>
            </v-col>
            <v-col cols="6" class="pb-0">
              <p class="display-5" v-if="ship.destination_place">
                <span class="font-weight-bold"> {{ $t("tracking.to") }}: </span> <br> {{ ship.destination_place }}
              </p>
              <p class="display-5" v-else>
                <span class="font-weight-bold"> {{ $t("tracking.to") }}: </span> <br> {{ ship.destination_office.place.address }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-col cols="12" class="checks pt-0">
          <div class="checkpoint-item">
            <v-btn class="mx-2 mt-1 white--text checkpoint-box" small flat color="primary">
                {{ $t("newOrder.origin") }}
            </v-btn>
            <p class="checkpoint-text"> {{ ship.origin_office.place.address }} <br>
              <span class="font-weight-light"> {{ ship.creation_date }} </span>
            </p>
          </div>
          <div v-for="item in ship.trajectories.check_points" :key="item.check_point_id">
            <div class="checkpoint-item" v-if="item.time_mark">
              <v-btn class="mx-2 white--text checkpoint-box"  small flat color="primary" >
                {{ item.check_point_order }}
              </v-btn>
              <p class="checkpoint-text">
                {{ item.place.address }} <br>
                <span class="font-weight-light"> {{ item.time_mark }} </span>
              </p>
            </div> 
            <div class="checkpoint-item" v-else>
                <v-btn class="mx-2 white--text checkpoint-box" outlined small color="primary">
                  {{ item.check_point_order }}
                </v-btn>
                <p class="checkpoint-text">
                  {{ item.place.address }} <br>
                  <span class="font-weight-light"> {{ $t("tracking.notReached") }} </span>
                </p>
            </div>                              
          </div>
          <div class="checkpoint-item">
            <v-btn class="mx-2 mt-1 white--text checkpoint-box" small outlined color="primary">
                {{ $t("newOrder.destiny") }}
            </v-btn>
            <p class="checkpoint-text"> {{ ship.destination_office.place.address }} {{ ship.destination_office.place.address }} </p>
          </div>
        </v-col>
      </v-row>
    
    <!-- Información general de la orden -->
    <div class="form-container ma-0 text-center">
      <v-row class="my-2">
        <h5 class="secondary--text"> {{ $t("newOrder.orderInformation") }} </h5>
      </v-row>
      <v-row>
          <v-col cols="4">
          <p>
            <span class="font-weight-bold">{{ $t("tracking.orderBy") }}: </span>{{ ship.person.first_name }} {{ ship.person.last_name }}
          </p>
          <p>
            <span class="font-weight-bold">{{ $t("tracking.receivedBy") }}: </span>{{ ship.rec_fullname }} 
          </p>
        </v-col>
        <v-col cols="4">
          <p>
            <span class="font-weight-bold">{{ $t("shippingHistory.status") }}: </span>{{ ship.status }}
          </p>
          <p>
            <span class="font-weight-bold">{{ $t("newOrder.orderType") }}: </span>{{ ship.order_price_hist.order_type.name }}
          </p>
        </v-col>
        <v-col cols="4">
          <p>
            <span class="font-weight-bold">{{ $t("shippingHistory.createdDate") }}: </span>{{ ship.creation_date }}
          </p>
          <v-btn outlined color="#1c1954" small @click="details_dialog = true">
            {{ $t("tracking.moreDetails") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Detalles de la orden -->
    <v-dialog
            v-model="details_dialog"
            max-width="650"
        >
            <v-card class="text-center">
                <h3 class="py-3 secondary--text">
                    {{$t("shippingHistory.order")}}: {{ ship.ordersheet_id }}
                </h3>
                <v-chip
                class="mb-2 ml-6" :class="ship.order_price_hist.order_type.name"
                label
                >
                {{ ship.order_price_hist.order_type.name }}
                </v-chip>
                <div class="py-0 px-6">
                    <v-card-text class="py-3 my-3 form-container text-center " >
                        <h3 class="pb-0 primary--text"> {{ $t("newOrder.orderInformation") }} </h3>
                        <p> <span class="font-weight-bold"> {{ $t("shippingHistory.status") }}: </span> {{ ship.status }} |
                            <span class="font-weight-bold"> {{ $t("shippingHistory.createdDate") }}: </span> {{ ship.creation_date }} <br>
                            <span class="font-weight-bold"> {{ $t("newOrder.ignoreHolidays") }}: </span> {{ ship.ignore_hollydays }} <br>
                            <span class="font-weight-bold"> {{ $t("newOrder.origin") }}: </span> {{ ship.origin_office.name }} ({{ ship.origin_office.place.address }})<br>
                            <span class="font-weight-bold"> {{ $t("newOrder.destiny") }}: </span> {{ ship.destination_office.name }} {{ ship.destination_place }}<br>
                        </p>
                    </v-card-text>
                    <v-card-text class="py-3 my-3 form-container text-center " >
                        <h3 class="pb-0 primary--text"> {{ $t("newOrder.receiverInformation") }} </h3>
                        <p> 
                            <span class="font-weight-bold"> {{ $t("labels.fullName") }}: </span> {{ ship.rec_fullname }} |
                            <span class="font-weight-bold"> {{ $t("labels.idNumber") }}: </span> {{ ship.rec_document }} <br>
                            <span class="font-weight-bold"> {{ $t("labels.phoneNumber") }}: </span> {{ ship.rec_phone_code }}-{{ ship.rec_phone_number }} |
                            <span class="font-weight-bold"> {{ $t("labels.email") }}: </span> {{ ship.rec_email }}
                        </p>
                    </v-card-text>
                </div>
                <div class="text-center">
                    <h3 class="pb-2 primary--text" align-self="center"> {{ $t("newOrder.items") }} </h3>
                </div>
                <v-row align="center text-center">
                    
                    <v-expansion-panels class="px-9 items-accordeon"
                        focusable hover
                        >
                        <v-expansion-panel
                            v-for="item in ship.items.slice().reverse()"
                            :key="item.item_id"
                        >
                            <v-expansion-panel-header>{{ item.item_id }} - 
                                {{ item.item_type_hist.item_type.name }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="mt-2">
                            <p class="mb-2"> 
                                <span class="font-weight-bold"> {{ $t("newOrder.weight") }}: </span> {{ item.item_weight }} |
                                <span class="font-weight-bold"> {{ $t("newOrder.volume") }}: </span> {{ item.item_volumen }} <br>
                                <span class="font-weight-bold"> {{ $t("newOrder.secureObject") }}: </span> {{ item.is_insured }} |
                                <span class="font-weight-bold"> {{ $t("newOrder.fragileObject") }}: </span> {{ item.is_fragile }} <br>
                                <span class="font-weight-bold"> {{ $t("newOrder.basePrice") }}: </span> {{ item.item_type_hist.base_price }} |
                                <span class="font-weight-bold"> {{ $t("newOrder.priceKm") }}: </span> {{ item.item_type_hist.price_km }} <br>
                            </p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="success secondary--text d-inline"
                        flat   
                    >
                        {{$t("shippingHistory.track")}}
                    </v-btn>
                    <v-btn
                        color=" red--text" class="mr-4 d-inline"
                        text
                        @click="details_dialog = false"
                    >
                        {{$t("shippingHistory.close")}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-card>
</template>

<script>
export default {
    name: "ProfileForm",
    data: () => ({
      details_dialog: false,
    }),
    props: {
        ship: Object,
    }
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
.track-card {
  margin: 0;
  padding: 30px;
}
.checks{
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  width: 70%;
}
.checkpoint-box{
  width: 20%;
}
.checkpoint-text{
  width: 80%;
  font-size: 12px;
  margin-bottom: 0px !important;
}
.checkpoint-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid lightgray;
}
.checks :last-of-type(.checkpoint-item){
  border-bottom: 0px;
}
</style>