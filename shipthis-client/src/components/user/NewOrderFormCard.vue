<template>
  <v-card class="pa-12 newOrderFormCard--card" cols="12">
    <form-wizard title="" subtitle="" color="#4d80e4" class="ma-0" @on-error="handleErrorMessage" @on-complete="onComplete"
    :nextButtonText='$t("newOrder.nextBtn")' :backButtonText='$t("newOrder.backBtn")' 
    :finishButtonText='$t("newOrder.finishBtn")' stepSize="sm" ref="order_form" v-on="onComplete.prevent">

        <!-- Paso 1: Configurar orden -->
        <tab-content :title='$t("newOrder.orderConfiguration")' :before-change="validateFirstStep" >
            <!-- Sección 1.1: Tipo de orden -->
            <v-container fluid class="text-center form-container">
                <h5>{{ $t("newOrder.orderType") }}</h5>
                        <v-row>
                            <v-col md="12" cols="12" class="d-flex" >
                                <v-select
                                :items="order_types_list"
                                :label='$t("newOrder.orderType")'
                                v-model="order_details.order_price_hist"
                                item-value="prices[0].order_price_hist_id"
                                item-text="name" >
                                </v-select>
                            </v-col>
                        </v-row>
                    <div class="form-row" v-for="(typeItem) in order_types_list" :key="typeItem.order_type_id">              
                        <v-row class="pa-0 ma-0" v-if="typeItem.prices[0].order_price_hist_id==order_details.order_price_hist">            
                            <v-col cols="12" class="text-center">
                                <p class="text-center item-type-text">
                                    {{ $t("newOrder.daysToDeliver") }}: {{ typeItem.days_to_deliver }} <br>
                                    {{ $t("newOrder.timeTax") }}: {{ typeItem.prices[0].time_tax }}%<br>
                                    {{ $t("newOrder.holidaysTax") }}: {{ typeItem.prices[0].hollydays_tax }}%<br>
                                    {{ $t("newOrder.specificDestinatarioTax") }}: {{ typeItem.prices[0].specific_destinatio_tax }}%</p>
                            </v-col>
                        </v-row>
                    </div>               

                <v-checkbox v-model="order_details.ignore_hollydays" :label='$t("newOrder.ignoreHolidays")' class="ma-0"></v-checkbox>
            </v-container>
            <!-- Sección 1.2: Origen y destino -->
            <v-container fluid class="text-center form-container">
                <h5> {{ $t("newOrder.originAndDestinyTitle") }} </h5>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-select
                        v-model="order_details.origin_office"
                        :items="offices_list"
                        :label='$t("newOrder.origin")'
                        item-text="name"
                        item-value="office_id"  
                        ></v-select>
                    </v-col>
                </v-row>
                <div class="form-row" v-for="(office) in offices_list" :key="office.office_id">              
                            <v-row class="pa-0 ma-0" v-if="office.office_id==order_details.origin_office">            
                                <v-col cols="12" class="text-center">
                                    <p class="text-center item-type-text">
                                        {{ $t("newOrder.address") }}: {{ office.place.address }} ||
                                        {{ $t("labels.phoneNumber") }}: {{ office.phone_code }}-{{ office.phone_number }}<br>
                                    </p>
                                </v-col>
                            </v-row>
                        </div> 
                <v-row>                     
                    <!-- <v-col md="4" cols="12" class="d-flex">
                         <v-select
                        v-model="destiny_type" name="destiny_type"
                        :items="destiny_types"
                        :label='$t("newOrder.destinyType")'             
                        ></v-select>
                    </v-col> -->
                    <div v-if="destiny_type=='Sucursal'">
                        <v-col md="12" cols="12">
                            <v-select
                            v-model="order_details.destination_office"
                            item-value="office_id"
                            :items="offices_list"
                            :label='$t("newOrder.destiny")'
                            item-text="name"  
                            ></v-select>
                        </v-col> 
                    </div>
                    <div v-else>
                        <v-col md="12" cols="12">
                        <v-text-field
                            v-model="order_details.destination_address"
                            :label='$t("newOrder.personalAddress")'
                            class="pt-3"
                        ></v-text-field>
                        </v-col>
                    </div>          
                </v-row>
                <div class="form-row" v-for="(office) in offices_list" :key="office.office_id">              
                            <v-row class="pa-0 ma-0" v-if="office.office_id==order_details.destination_office">            
                                <v-col cols="12" class="text-center">
                                    <p class="text-center item-type-text">
                                        {{ $t("newOrder.address") }}: {{ office.place.address }} ||
                                        {{ $t("labels.phoneNumber") }}: {{ office.phone_code }}-{{ office.phone_number }}<br>
                                    </p>
                                </v-col>
                            </v-row>
                        </div>
            </v-container>
            <!-- Sección 1.3: Información del receptor -->
            <v-container fluid class="text-center form-container">
                <h5>{{ $t("newOrder.receiverInformation") }}</h5>
                <v-row>
                  <v-col md="6" cols=12>
                    <v-text-field
                        v-model="order_details.rec_fullname"
                        :label='$t("labels.fullName")'
                        required    
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols=12>
                    <v-text-field
                        v-model="order_details.rec_email"
                        :label='$t("labels.email")'    
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" cols=12>
                    <v-text-field
                        v-model="order_details.rec_document"
                        :label='$t("labels.idNumber")'    
                    ></v-text-field>
                  </v-col>     
                </v-row>
                <v-row>
                  <v-col md="4" cols="2">
                    <v-text-field
                    v-model="order_details.rec_phone_code"
                    :label='$t("labels.areaCode")'                   
                    ></v-text-field>
                  </v-col>
                  <v-col md="8" cols="10">
                    <v-text-field 
                        v-model="order_details.rec_phone_number"
                        :label='$t("labels.phoneNumber")'                   
                    ></v-text-field>
                  </v-col>
                </v-row>
                
            </v-container>
        </tab-content>

        <!-- Paso 2: Configurar items -->
        <tab-content :title='$t("newOrder.itemConfiguration")'>
            <h4 class="text-center"> {{ $t("newOrder.itemConfigurationTitle") }} </h4>
            <!-- Añadir items -->
            <v-container fluid class="text-center form-container">
                <div class="order-items" v-if="order_details.items.length>0">
                    <div class="form-row" v-for="(item, index) in order_details.items" :key="index">
                        <v-row>
                            <v-col md="6" cols="12" class="d-flex">
                                <v-select
                                    :items="item_types_list"
                                    :label='$t("newOrder.category")'
                                    v-model="item.category_id"
                                    item-value="category.category_id"
                                    item-text="category.name" >                      
                                ></v-select>
                            </v-col>
                            <v-col md="6" cols="12" class="d-flex">
                                <v-select
                                    v-model="item.item_type_hist"
                                    :items="item_types_list.filter(item_origin => item_origin.category.category_id === item.category_id)"
                                    :label='$t("newOrder.type")'
                                    item-value="prices[0].item_price_hist_id"
                                    item-text="name" >                   
                                ></v-select>
                            </v-col>
                        </v-row>
                        <div class="form-row" v-for="(typeItem) in item_types_list" :key="typeItem.item_type_id">              
                            <v-row class="pa-0 ma-0" v-if="typeItem.prices[0].item_price_hist_id==item.item_type_hist">            
                                <v-col cols="12" class="text-center">
                                    <p class="text-center item-type-text">
                                        {{ $t("newOrder.maxWeight") }}: {{ typeItem.max_weight }}gr. ||
                                        {{ $t("newOrder.maxVolume") }}: {{ typeItem.max_volume }}ml.<br>
                                        {{ $t("newOrder.basePrice") }}: {{ typeItem.prices[0].base_price }} ||
                                        {{ $t("newOrder.priceKm") }}: {{ typeItem.prices[0].price_km }} <br>
                                        {{ $t("newOrder.ensuranceTax") }}: {{ typeItem.prices[0].ensurance_tax }}% ||
                                        {{ $t("newOrder.fragilyTax") }}: {{ typeItem.prices[0].fragily_tax }}%</p>
                                </v-col>
                            </v-row>
                        </div>  
                        <v-row>
                            <v-col md="6" cols="12" class="py-0 my-0">
                                <v-text-field
                                    v-model="item.item_weight"
                                    :label='$t("newOrder.weight")'
                                ></v-text-field>
                            </v-col>
                            <v-col md="6" cols="12" class="py-0 my-0">
                                <v-text-field
                                    v-model="item.item_volumen"
                                    :label='$t("newOrder.volume")'
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" cols="12">
                                <v-checkbox v-model="item.is_insured" :label='$t("newOrder.secureObject")' class="ma-0"></v-checkbox>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-checkbox v-model="item.is_fragile" :label='$t("newOrder.fragileObject")' class="ma-0"></v-checkbox>
                            </v-col>
                        </v-row> 
                        <v-row class="center-btn">
                            <div v-if="index==0">
                                <v-btn small class="error delete-item d-none" @click="removeItem(index)">{{ $t("newOrder.deleteBtn") }}</v-btn>
                            </div>
                            <div v-else>
                                <v-btn small class="error delete-item" @click="removeItem(index)">{{ $t("newOrder.deleteBtn") }}</v-btn>
                            </div>                    
                        </v-row>        
                    </div>
                </div>

                <div class="form-group">
                    <v-btn @click="addItem" class="primary">{{ $t("newOrder.addItemBtn") }}</v-btn>
                </div>
            </v-container>
        </tab-content>

        <!-- Paso 3: Confirmación de orden -->
        <tab-content :title='$t("newOrder.confirmation")' >
            <v-container fluid class="text-center form-container">
                <h5>{{ $t("newOrder.orderInformation") }}</h5>
                <div class="order-items">
                    <v-row>
                        <v-col md="6" cols="12" class="py-0">
                            <div v-for="item in order_types_list" :key="item.order_type_id">
                                <p class="order-details" v-if="item.prices[0].order_price_hist_id == order_details.order_price_hist">
                                    {{ $t("newOrder.orderType") }}: <span class="font-weight-bold">{{ item.name }}</span>                        
                                </p>
                            </div>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ $t("newOrder.ignoreHolidays") }}: 
                                <span class="font-weight-bold" v-if="order_details.ignore_hollydays==true">{{ $t("newOrder.yes") }}</span>
                                <span class="font-weight-bold" v-else>{{ $t("newOrder.no") }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <div v-for="item in offices_list" :key="item.office_id">
                                <p class="order-details" v-if="item.office_id == order_details.origin_office">
                                    {{ $t("newOrder.origin") }}: <span class="font-weight-bold">{{ item.name }}</span>                        
                                </p>
                            </div>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <!-- <div v-if="destiny_type=='Personal'">
                                <p class="order-details">{{ $t("newOrder.destiny") }}: 
                                <span class="font-weight-bold">{{ order_details.destination_address }}</span>
                                </p>
                            </div>
                            <div v-else> -->
                                <div v-for="item in offices_list" :key="item.office_id">
                                    <div v-if="item.office_id == order_details.destination_office">
                                        <p class="order-details">{{ $t("newOrder.destiny") }}:
                                        <span class="font-weight-bold" >{{ item.name }}</span>
                                    </p>
                                    </div> 
                                </div>
                            <!-- </div>      -->
                        </v-col>
                    </v-row>
                </div>
                <div class="order-items">
                    <h5>{{ $t("newOrder.receiverInformation") }} </h5>
                    <v-row>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ $t("labels.fullName") }}: 
                                <span class="font-weight-bold">{{ order_details.rec_fullname }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ $t("labels.email") }}: 
                                <span class="font-weight-bold">{{ order_details.rec_email }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ $t("labels.idNumber") }}: 
                                <span class="font-weight-bold">{{ order_details.rec_document }}</span>
                            </p>
                        </v-col>                       
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ $t("labels.areaCode") }}: 
                                <span class="font-weight-bold">{{ order_details.rec_phone_code }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ $t("labels.phoneNumber") }}: 
                                <span class="font-weight-bold">{{ order_details.rec_phone_number }}</span>
                            </p>
                        </v-col>
                    </v-row>
                </div>
                <div class="order-items">
                    <h5>{{ $t("newOrder.orderDetails") }} </h5>
                    <v-row>
                        <div v-for="item in order_details.items" :key="item.order_price_hist" class="order-detail-box">
                            <v-col md="6" cols="12" class="py-0">
                                <div v-for="itemType in item_types_list" :key="itemType.item_type_id">
                                    <p class="order-details" v-if="itemType.prices[0].item_price_hist_id == item.item_type_hist">
                                        {{ $t("newOrder.category") }}: <span class="font-weight-bold">{{ itemType.category.name }}</span>                        
                                    </p>
                                </div>
                            </v-col>
                            <v-col md="6" cols="12" class="py-0">
                                <div v-for="itemType in item_types_list" :key="itemType.item_type_id">
                                    <p class="order-details" v-if="itemType.prices[0].item_price_hist_id == item.item_type_hist">
                                        {{ $t("newOrder.type") }}: <span class="font-weight-bold">{{ itemType.name }}</span>                        
                                    </p>
                                </div>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ $t("newOrder.weight") }}: 
                                    <span class="font-weight-bold">{{ item.item_weight }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ $t("newOrder.volume") }}: 
                                    <span class="font-weight-bold">{{ item.item_volumen }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ $t("newOrder.fragileObject") }}: 
                                    <span class="font-weight-bold" v-if="item.is_fragile==true">{{ $t("newOrder.yes") }}</span>
                                <span class="font-weight-bold" v-else>{{ $t("newOrder.no") }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ $t("newOrder.secureObject") }}: 
                                    <span class="font-weight-bold" v-if="item.is_insured==true">{{ $t("newOrder.yes") }}</span>
                                <span class="font-weight-bold" v-else>{{ $t("newOrder.no") }}</span>
                                </p>
                            </v-col>
                        </div>                  
                    </v-row>
                </div>
            </v-container>
        </tab-content>
        <div v-if="errorMsg">
            <span class="error">{{errorMsg}}</span>
        </div>
        <v-alert v-model="alertError" type="error" dismissible>
            <strong>{{ $t("newOrder.errorMessage") }}</strong>
        </v-alert> 
        <v-alert v-model="emptyMessage" type="error" dismissible>
            <strong>{{ $t("newOrder.emptyMessage") }}</strong>
        </v-alert> 
    </form-wizard>
  </v-card>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "NewOrderFormCard",
  data: () => ({
    row: null,
    destiny_type: "Sucursal",
    destiny_types: [
        "Personal",
        "Sucursal",
    ],

    destiny_address: "",
    order_details: 
        {
            origin_office: null,
            order_price_hist: null,
            rec_fullname: null,
            rec_phone_code: null,
            rec_phone_number: null,
            rec_document: null,
            rec_email: null,
            ignore_hollydays: false,
            destination_office: null,
            destination_address: null,
            items: [],
        },
    emptyMessage: false,
    errorMsg: null,
    alertError: false,
    order_types_list: null,
    offices_list: null,
    item_types_list: null,
  }),
  components: {
      FormWizard,
      TabContent
  },
  async mounted() {
      await axios
          .get(
            "http://localhost:3000/shipthisapi/v1/order-type/allactive"
          )
          .then(res => this.order_types_list = res.data)

       axios
          .get(
            "http://localhost:3000/shipthisapi/v1/office/allactive"
          )
          .then(res => this.offices_list = res.data)

       axios
          .get(
            "http://localhost:3000/shipthisapi/v1/item-type/allactive"
          )
          .then(res => this.item_types_list = res.data)
  },
  computed: 
    mapState({
        userdata: state => state.user,
    }),

  methods: {     
    addItem() {
      this.order_details.items.push({
            category_id: null,
            item_type_hist: null,
            item_weight: null,
            item_volumen: null,
            is_insured: false,
            is_fragile: false
      });
    },
    removeItem(index) {
      this.order_details.items.splice(index, 1);
    },
    onComplete() {     
          const payload = {
              useremail: this.$store.state.user.email,
              ...this.order_details
          };
          console.log(payload);
          if (this.order_details.items.length>0){
          axios
            .post("http://localhost:3000/shipthisapi/v1/ordersheet/create", payload)
            .then(() => {
                alert("¡Orden enviada! Pronto recibirás un correo de confirmación.");
                this.$router.push('/ShippingHistory');
            })
            .catch(() => {
              this.alertError = true;
            });
          }else{
              this.emptyMessage = true;
          }    
    },
    validateNoEmpty() {
        return this.order_details.items;
    },
    handleErrorMessage: function(errorMsg){
          this.errorMsg = errorMsg
        },
    validateFirstStep:function() {
          return new Promise((resolve, reject) => {
              if(this.order_details.order_type_id == ""){
                  reject('Por favor, selecciona un tipo de orden')
              }else if (this.order_details.origin_office == ""){
                  reject('Indica una dirección de origen')
              }else if (this.destiny_type == ""){
                  reject('Indica una dirección de destino')
              }else if (this.order_details.rec_fullname == ""){
                  reject('Indica el nombre del receptor')
              }else if (this.order_details.rec_identification == ""){
                  reject('Indica el documento de identidad del receptor')
              }else{
                  resolve(true)
              } 
          })
         },
    secondStepValidation:function() {
          return new Promise((resolve, reject) => {
              for (var i=0; i < this.order_details.items.length; i++){
                if(this.order_details.item[i].category_id == ""){
                    reject('Por favor, añade un item')
                }else if (this.order_details.items[i].item_type_id == ""){
                    reject('Por favor, añade un item')
                }else if (this.order_details.items[i].weight == ""){
                    reject('Indica el peso del item')
                }else if (this.order_details.items[i].volume == ""){
                    reject('Indica el peso del volumen')
                }else{
                    resolve(true)
                } 
              }
          })
         },
  }
};
</script>

<style lang="scss">
@import '../../styles/main.scss';
.order-items > div {
  margin: 20px 0;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid $success-color;
}
.order-items {
  width: 70%;
}

.form-row {
    width: 100%;
}
.item-type-text {
    font-size: 12px;
    color: $primary-color;
    margin: 0;
    padding: 0 10px;
}
.order-details {
    font-size: 14px;
    margin: 0px !important;
    padding: 6px 12px;
}
.order-detail-box{
    width: 100%;
    border-bottom: 1px solid $success-color;
    padding: 8px 0px;
    display: flex;
    flex-wrap: wrap;
}
.order-detail-item{
    position: relative;
}
span.error{
  color:white;
  font-size:14px;
  display:flex;
  justify-content:center;
}
.center-btn {
    display: flex;
    justify-content: center;
}

</style>