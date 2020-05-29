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
import {mapState} from 'vuex';
import axios from 'axios';
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

    shipOrders: null,
  }),
  components: {
    ShippingCard,
  },
  methods: {
      goNewOrder(){
          this.$router.push('/NewOrder');
      },
  },
  computed: 
    mapState({
        userdata: state => state.user,
    }),
  async mounted() {
      const payload = {
          useremail: this.$store.state.user.email
      }
      console.log(payload);
      axios
            .post("http://localhost:3000/shipthisapi/v1/ordersheet/history", payload)
            .then((r) => {
               this.shipOrders = r.data
            })
            .catch((e) => {
              console.log(e)
            }); 
  }
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