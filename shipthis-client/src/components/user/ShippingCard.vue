<template>
  
    <v-card
      color="lightgray" hover @click.stop="details_dialog = true"
      class="mx-12 my-2 shipping-item px-3 py-0 text-center"
    >
    <v-row>
        <v-col class="row-item badge-field" cols="4" md="2">
                <v-chip
                    class="mb-0 ml-2" :class="shipOrder.order_price_hist.order_type.name"
                    label
                    >
                    {{ shipOrder.order_price_hist.order_type.name }}
                </v-chip>
        </v-col>
        <v-col class="row-item" cols="8" md="8">
            
                <v-card-title class="d-inline subtitle-1 font-weight-bold">{{ $t("shippingHistory.id") }}: {{ shipOrder.ordersheet_id }}</v-card-title>
                
                <v-card-text class="d-block item-text">{{ $t("shippingHistory.status") }}: {{ shipOrder.status }} |
                                            {{ $t("shippingHistory.createdDate") }}: {{ shipOrder.creation_date }} |
                                            {{ $t("shippingHistory.items") }}: {{ shipOrder.items.length }} 
                </v-card-text>
        </v-col>
        <v-col class="track-field" cols="12" md="2" @click="goTracking(shipOrder.ordersheet_id)">
                <h5>
                    {{$t("shippingHistory.track")}}
                </h5>              
        </v-col>   
        
    </v-row>                  
        <v-dialog
            v-model="details_dialog"
            max-width="650"
        >
            <v-card class="text-center">
                <h3 class="py-3 secondary--text">
                    {{$t("shippingHistory.order")}}: {{ shipOrder.ordersheet_id }}
                </h3>
                <v-chip
                class="mb-2 ml-6" :class="shipOrder.order_price_hist.order_type.name"
                label
                >
                {{ shipOrder.order_price_hist.order_type.name }}
                </v-chip>
                <div class="py-0 px-6">
                    <v-card-text class="py-3 my-3 form-container text-center " >
                        <h3 class="pb-0 primary--text"> {{ $t("newOrder.orderInformation") }} </h3>
                        <p> <span class="font-weight-bold"> {{ $t("shippingHistory.status") }}: </span> {{ shipOrder.status }} |
                            <span class="font-weight-bold"> {{ $t("shippingHistory.createdDate") }}: </span> {{ shipOrder.creation_date }} <br>
                            <span class="font-weight-bold"> {{ $t("newOrder.ignoreHolidays") }}: </span> {{ shipOrder.ignore_hollydays }} <br>
                            <span class="font-weight-bold"> {{ $t("newOrder.origin") }}: </span> {{ shipOrder.origin_office.name }} ({{ shipOrder.origin_office.place.address }})<br>
                        </p>
                        <p v-if="shipOrder.destination_office">
                            <span class="font-weight-bold"> {{ $t("newOrder.destiny") }}: </span> {{ shipOrder.destination_office.name }}  {{ shipOrder.destination_office.place.address }}
                        </p>
                        <p v-else>
                            <span class="font-weight-bold"> {{ $t("newOrder.destiny") }}: </span> {{ shipOrder.destination_place.address }} 
                        </p>
                    </v-card-text>
                    <v-card-text class="py-3 my-3 form-container text-center " >
                        <h3 class="pb-0 primary--text"> {{ $t("newOrder.receiverInformation") }} </h3>
                        <p> 
                            <span class="font-weight-bold"> {{ $t("labels.fullName") }}: </span> {{ shipOrder.rec_fullname }} |
                            <span class="font-weight-bold"> {{ $t("labels.idNumber") }}: </span> {{ shipOrder.rec_document }} <br>
                            <span class="font-weight-bold"> {{ $t("labels.phoneNumber") }}: </span> {{ shipOrder.rec_phone_code }}-{{ shipOrder.rec_phone_number }} |
                            <span class="font-weight-bold"> {{ $t("labels.email") }}: </span> {{ shipOrder.rec_email }}
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
                            v-for="(item, index) in shipOrder.items.slice().reverse()"
                            :key="index"
                        >
                            <v-expansion-panel-header>{{ index+1 }} - 
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
                        flat @click="goTracking(shipOrder.ordersheet_id)"
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
    name: "ShippingCard",
    data: () => ({
        details_dialog: false,
    }),
    props: {
        shipOrder: Object,
    },
    methods: {
        goTracking(id) {
            this.$router.push("./tracking/"+id);
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/main.scss";

.shipping-item{
    width: 60%;
    transition: 0.5s !important;
    color: $second-color;
}
.shipping-item:hover{
    background-color: $success-color !important;
}
.item-text{
    font-size: 11px;
    padding-top: 2px;
    padding-bottom: 0px !important
}
.items-accordeon{
    font-size: 12px;
}
.form-container p{
    margin-bottom: 0px !important;
    font-size: 12px;
}
.track-field{
    background-color: white;
    transition: 0.5s;
    color: $second-color;
    display: flex;
    align-items: center;
    justify-content: center;
}
.badge-field{
    display: flex;
    align-items: center;
    justify-content: center;
}
.track-field:hover{
    background-color: $primary-color;
    color: white;
}
</style>