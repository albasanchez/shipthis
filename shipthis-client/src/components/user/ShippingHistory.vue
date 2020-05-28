<template>
  <div id="ShippingHistory">
    <v-row justify="center" class="py-4">
        <v-col cols="12" class="text-center secondary--text pt-2 pb-0">
        <h1 class="white--text pa-0 d-inline">{{ $t("shippingHistory.shippingHistoryTitle") }}</h1>
        <v-btn large 
            @click="goNewOrder()"
            class="success secondary--text ml-6 mb-4">
                {{$t("sidebar.newOrder")}}
            </v-btn>
        </v-col>
    </v-row>
    <!-- Ordenar por Status -->
    <div v-for="status in status_list" :key="status.name">
        <h4 class="white--text text-center text-uppercase">{{ $t("status."+status.name) }}</h4>
        <v-row justify="center" v-for="order in shipOrders" :key="order.ordersheet_id">
            <v-col cols="12" class="text-center centered" v-if="order.status==status.name">
                <ShippingCard
                    :shipOrder="order"
                ></ShippingCard>
            </v-col>          
        </v-row>   
    </div> 
  </div>
</template>

<script>
import ShippingCard from './ShippingCard.vue';
export default {

  name: "ShippingHistory",
  data: () => ({

    status_list: [
        {
            name: "DELIVERY",
            count: 0,
        },
        {
            name: "TRANSIT",
            count: 0,
        },
        {
            name: "DELIVERED",
            count: 0,
        },
    ],

    shipOrders: [
    {
        "ordersheet_id": "4c3263b2-80e7-45d1-aa84-4ab837075e53",
        "creation_date": "2020-05-27",
        "status": "TRANSIT",
        "rec_fullname": "Daniel Perez",
        "rec_phone_code": "01523",
        "rec_phone_number": "1523644",
        "rec_document": "V-15236489",
        "rec_email": "asdfee@df.com",
        "delivery_date": null,
        "facturation_amount": null,
        "ignore_hollydays": false,
        "origin_office": {
            "office_id": 1,
            "name": "Las Carmelitas",
            "phone_code": "+1641",
            "phone_number": "1598423",
            "status": "ACTIVE",
            "place": {
                "place_id": 1,
                "address": "199-101 Williams Ave. Minotola, NJ. USA",
                "position_lat": "39.514865",
                "position_long": "-74.948866",
                "zip_code": "08341"
            }
        },
        "order_price_hist": {
            "order_price_hist_id": 1,
            "starting_date": "2020-04-01",
            "ending_date": null,
            "time_tax": "0",
            "hollydays_tax": "2",
            "specific_destinatio_tax": "1",
            "order_type": {
                "order_type_id": 1,
                "name": "Bronce",
                "days_to_deliver": 5,
                "status": "ACTIVE"
            }
        },
        "destination_office": null,
        "destination_place": {
            "place_id": 13,
            "address": "Carmen St. Boston. US",
            "position_lat": null,
            "position_long": null,
            "zip_code": null
        },
        "items": [
            {
                "item_id": 2,
                "item_weight": "500",
                "item_volumen": "1000",
                "is_insured": false,
                "is_fragile": false,
                "item_type_hist": {
                    "item_price_hist_id": 3,
                    "starting_date": "2020-04-01",
                    "ending_date": null,
                    "base_price": "3",
                    "price_km": "3",
                    "ensurance_tax": "30",
                    "fragily_tax": "10",
                    "item_type": {
                        "item_type_id": 3,
                        "name": "Small Box",
                        "max_weight": "1000",
                        "max_volume": "2000",
                        "status": "ACTIVE",
                        "category": {
                            "category_id": 2,
                            "name": "Box"
                        }
                    }
                }
            },
            {
                "item_id": 1,
                "item_weight": "200",
                "item_volumen": "200",
                "is_insured": false,
                "is_fragile": false,
                "item_type_hist": {
                    "item_price_hist_id": 1,
                    "starting_date": "2020-04-01",
                    "ending_date": null,
                    "base_price": "2",
                    "price_km": "1",
                    "ensurance_tax": "20",
                    "fragily_tax": "3",
                    "item_type": {
                        "item_type_id": 1,
                        "name": "Little Envelope",
                        "max_weight": "200",
                        "max_volume": "200",
                        "status": "ACTIVE",
                        "category": {
                            "category_id": 1,
                            "name": "Envelope"
                        }
                    }
                }
            }
        ],
        "trajectories": {
            "trajectory_id": 1,
            "linear_distance": "561",
            "efective_distance": "673"
        }
    }, 
    ]
  }),
  components: {
    ShippingCard,
  },
  methods: {
      goNewOrder(){
          this.$router.push('/NewOrder');
      },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#ShippingHistory {
  margin: 0;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
  min-height: 450px;
  background-color: $second-color;
}
.orders-list{
    width: 100% !important;
}
.centered{
    display: flex;
    justify-content: center;
}
</style>