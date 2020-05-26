<template>
  <v-card class="pa-12 newOrderFormCard--card" cols="12">
    <form-wizard title="" subtitle="" color="#4d80e4" class="ma-0" @on-error="handleErrorMessage"
    :nextButtonText="nextBtn" :backButtonText="backBtn" :finishButtonText="finishBtn" stepSize="sm">

        <!-- Paso 1: Configurar orden -->
        <tab-content :title="orderConfiguration" :before-change="validateFirstStep" >
            <!-- Sección 1.1: Tipo de orden -->
            <v-container fluid class="text-center form-container">
                <h5>{{ orderType }}</h5>
                        <v-row>
                            <v-col md="12" cols="12" class="d-flex" >
                                <v-select
                                    v-model="order_type"
                                    :items="order_type_items"
                                    :label="orderType"                      
                                ></v-select>
                            </v-col>
                        </v-row>
                    <div class="form-row" v-for="(typeItem, index) in order_type_details" :key="index">              
                        <v-row class="pa-0 ma-0" v-if="typeItem.name==order_type">            
                            <v-col cols="12" class="text-center">
                                <p class="text-center item-type-text">
                                    {{ daysToDeliver }}: {{ typeItem.days_to_deliver }} <br>
                                    {{ timeTax }}: {{ typeItem.time_tax }}%<br>
                                    {{ holidaysTax }}: {{ typeItem.holidays_tax }}%<br>
                                    {{ specificDestinatarioTax }}: {{ typeItem.specific_destinatario_tax }}%</p>
                            </v-col>
                        </v-row>
                    </div>               

                <v-checkbox v-model="ignore_holidays" :label="ignoreHolidays" class="ma-0"></v-checkbox>
            </v-container>
            <!-- Sección 1.2: Origen y destino -->
            <v-container fluid class="text-center form-container">
                <h5> {{ originAndDestinyTitle }} </h5>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-select
                        v-model="origin_address"
                        :items="offices"
                        :label="origin"  
                        :rules="[v => !!v || 'Selecciona una sucursal de origen.']"
                        required
                        ></v-select>
                    </v-col>
                    <v-col md="6" cols="12" class="d-flex">
                         <v-select
                        v-model="destiny_type" name="destiny_type"
                        :items="destiny_types"
                        :label="destinyType"
                        :rules="[v => !!v || 'Selecciona un tipo de destino.']"
                        
                        ></v-select>
                    </v-col>
                    <div v-if="destiny_type=='Office'">
                        <v-col md="12" cols="12">
                            <v-select
                            v-model="destiny_address"
                            :items="offices"
                            :label="destiny"
                            :rules="[v => !!v || 'Selecciona una sucursal de destino.']"
                            
                            ></v-select>
                        </v-col>
                    </div>
                    <div v-else>
                        <v-col md="12" cols="12">
                        <v-text-field
                            v-model="personal_address"
                            :label="personalAddress"
                            class="pt-3"
                        ></v-text-field>
                        </v-col>
                    </div>          
                </v-row>
            </v-container>
            <!-- Sección 1.3: Información del receptor -->
            <v-container fluid class="text-center form-container">
                <h5>{{ receiverInformation }}</h5>
                <v-row>
                  <v-col md="6" cols=12>
                    <v-text-field
                        v-model="receiver_name"
                        :label="name"
                        required    
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols=12>
                    <v-text-field
                        v-model="receiver_last_name"
                        :label="lastName"    
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="2">
                        <v-select 
                        v-model="receiver_identification_type"
                        :items="identification_type_items"
                        :label="idType" 
                    ></v-select>
                  </v-col>
                  <v-col md="4" cols=12>
                    <v-text-field
                        v-model="receiver_identification"
                        :label="identificationType"    
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" cols=12>
                    <v-text-field
                        v-model="receiver_email"
                        :label="email"    
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="4" cols="2">
                    <v-text-field
                    v-model="receiver_area_code"
                    :label="areaCode"                   
                    ></v-text-field>
                  </v-col>
                  <v-col md="8" cols="10">
                    <v-text-field 
                        v-model="receiver_phone_number"
                        :label="phoneNumber"                   
                    ></v-text-field>
                  </v-col>
                </v-row>
                
            </v-container>
        </tab-content>

        <!-- Paso 2: Configurar items -->
        <tab-content :title="itemConfiguration" :before-change="validateSecondStep">
            <h4 class="text-center"> {{ itemConfigurationTitle }} </h4>
            <!-- Añadir items -->
            <v-container fluid class="text-center form-container">
                <div class="order-items">
                    <div class="form-row" v-for="(item, index) in orderItems" :key="index">
                        <v-row>
                            <v-col md="6" cols="12" class="d-flex">
                                <v-select
                                    v-model="item.category"
                                    :items="item_categories"
                                    :label="category"                      
                                ></v-select>
                            </v-col>
                            <v-col md="6" cols="12" class="d-flex" v-if="item.category=='Envelope'">
                                <v-select
                                    v-model="item.type"
                                    :items="item_envelope_types"
                                    :label="type"                      
                                ></v-select>
                            </v-col>
                            <v-col md="6" cols="12" class="d-flex" v-else>
                                <v-select
                                    v-model="item.type" 
                                    :items="item_box_types"
                                    :label="itemType"                      
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" cols="12" class="py-0 my-0">
                                <v-text-field
                                    v-model="item.weight"
                                    :label="weight"
                                ></v-text-field>
                            </v-col>
                            <v-col md="6" cols="12" class="py-0 my-0">
                                <v-text-field
                                    v-model="item.volume"
                                    :label="volume"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="pa-0 ma-0 d-none d-sm-flex">
                            <v-col cols="12" v-if="item.type">
                                <div v-for="typeItem in typeList" :key="typeItem.id">
                                    <!-- Compara y busca la información del tipo de paquete elegido -->
                                    <div v-if="typeItem.name==item.type">
                                        <v-col cols="12">
                                            <p class="text-center item-type-text">
                                                {{ maxWeight }}: {{ typeItem.max_weight }} | 
                                                {{ maxVolume }}: {{typeItem.max_volume }} |
                                                {{ basePrice }}: {{typeItem.base_price }} |
                                                {{ priceKm }}: {{typeItem.price_km }} <br>
                                                {{ ensuranceTax }}: {{typeItem.ensurance_tax }} |
                                                {{ fragilyTax }}: {{typeItem.fragily_tax }}</p>
                                        </v-col>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" cols="12">
                                <v-checkbox v-model="item.ensurance" :label="secureObject" class="ma-0"></v-checkbox>
                            </v-col>
                            <v-col md="6" cols="12">
                                <v-checkbox v-model="item.fragility" :label="fragileObject" class="ma-0"></v-checkbox>
                            </v-col>
                        </v-row> 
                        <v-row class="center-btn">
                            <div v-if="index==0">
                                <v-btn small class="error delete-item d-none" @click="removeItem(index)">{{ deleteBtn }}</v-btn>
                            </div>
                            <div v-else>
                                <v-btn small class="error delete-item" @click="removeItem(index)">{{ deleteBtn }}</v-btn>
                            </div>
                            
                        </v-row>        
                    </div>
                </div>

                <div class="form-group">
                    <v-btn @click="addItem" class="primary">{{ addItemBtn }}</v-btn>
                </div>
            </v-container>
        </tab-content>

        <!-- Paso 3: Confirmación de orden -->
        <tab-content :title="confirmation">
            <v-container fluid class="text-center form-container">
                <h5>{{ orderInformation }}</h5>
                <div class="order-items">
                    <v-row>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ orderType }}: 
                                <span class="font-weight-bold">{{ order_type }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ ignoreHolidays }}: 
                                <span class="font-weight-bold" v-if="ignore_holidays==true">{{ yes }}</span>
                                <span class="font-weight-bold" v-else>{{ no }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ origin }}: 
                                <span class="font-weight-bold">{{ origin_address }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ destiny }}: 
                                <span class="font-weight-bold" v-if="destiny_type=='Personal'">{{ personal_address }}</span>
                                <span class="font-weight-bold" v-else>{{ destiny_address }}</span>
                            </p>
                        </v-col>
                    </v-row>
                </div>
                <div class="order-items">
                    <h5>{{ receiverInformation }} </h5>
                    <v-row>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ name }}: 
                                <span class="font-weight-bold">{{ receiver_name }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ lastName }}: 
                                <span class="font-weight-bold">{{ receiver_last_name }}</span>
                            </p>
                        </v-col>
                        <v-col md="2" cols="12" class="py-0">
                            <p class="order-details">{{ identificationType }}: 
                                <span class="font-weight-bold">{{ receiver_identification_type }}</span>
                            </p>
                        </v-col>
                        <v-col md="4" cols="12" class="py-0">
                            <p class="order-details">{{ idNumber }}: 
                                <span class="font-weight-bold">{{ receiver_identification }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ email }}: 
                                <span class="font-weight-bold">{{ receiver_email }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ areaCode }}: 
                                <span class="font-weight-bold">{{ receiver_area_code }}</span>
                            </p>
                        </v-col>
                        <v-col md="6" cols="12" class="py-0">
                            <p class="order-details">{{ phoneNumber }}: 
                                <span class="font-weight-bold">{{ receiver_phone_number }}</span>
                            </p>
                        </v-col>
                    </v-row>
                </div>
                <div class="order-items">
                    <h5>{{ orderDetails }} </h5>
                    <v-row>
                        <div v-for="item in orderItems" :key="item.id" class="order-detail-box">
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ category }}: 
                                    <span class="font-weight-bold">{{ item.category }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ type }}: 
                                    <span class="font-weight-bold">{{ item.type }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ weight }}: 
                                    <span class="font-weight-bold">{{ item.weight }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ volume }}: 
                                    <span class="font-weight-bold">{{ item.volume }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ fragileObject }}: 
                                    <span class="font-weight-bold" v-if="item.fragility==true">{{ yes }}</span>
                                <span class="font-weight-bold" v-else>{{ no }}</span>
                                </p>
                            </v-col>
                            <v-col md="6" cols="12" class="ma-0 py-0 order-detail-item">
                                <p class="order-details">{{ secureObject }}: 
                                    <span class="font-weight-bold" v-if="item.ensurance==true">{{ yes }}</span>
                                <span class="font-weight-bold" v-else>{{ no }}</span>
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
    </form-wizard>
  </v-card>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  name: "NewOrderFormCard",
  data: () => ({
    row: null,
    order_type: "",
    order_type_details: [
        { id: "1", name: "Bronce", days_to_deliver: "1", time_tax: "0", holidays_tax: "2", specific_destinatario_tax: "1" },
        { id: "2", name: "Silver", days_to_deliver: "", time_tax: "", holidays_tax: "", specific_destinatario_tax: "0" },
        { id: "3", name: "Gold", days_to_deliver: "", time_tax: "", holidays_tax: "", specific_destinatario_tax: "0" },
        { id: "4", name: "Platinum", days_to_deliver: "", time_tax: "", holidays_tax: "", specific_destinatario_tax: "0" }
    ],  
    order_type_items: [
        "Bronce",
        "Silver",
        "Gold",
        "Platinium",    
    ],
    orderTypeSelected: "",
    ignore_holidays: false,
    origin_address: "",
    offices: [
        "Sucursal 1",
        "Sucursal 2"
    ],
    destiny_type: "",
    destiny_types: [
        "Personal",
        "Office",
    ],
    personal_address: "",
    receiver_name: "",
    receiver_last_name: "",
    receiver_identification: "",
    receiver_email: "",
    receiver_phone_number: "",
    receiver_area_code: "",
    receiver_identification_type: 'V',
    identification_type_items: [
      'V',
      'J',
      'E'
    ],

    orderItems: [
      {
        category: "",
        type: "",
        weight: "",
        volume: "",
        fragility: false,
        ensurance: true,
      }
    ],
    item_categories: [
        "Box",
        "Envelope",
    ],
    item_box_types: [
        "Small Box",
        "Medium Box",
        "Large Box",
    ],
    item_envelope_types: [
        "Little Envelope",
        "Big Envelope",
    ],

    typeList: [
        { name: "Small Box", max_weight: "200", max_volume: "200", base_price: "2", price_km: "1", ensurance_tax: "20%", fragily_tax: "3" },
        { name: "Medium Box", max_weight: "200", max_volume: "200", base_price: "2", price_km: "1", ensurance_tax: "20%", fragily_tax: "3" },
        { name: "Large Box", max_weight: "200", max_volume: "200", base_price: "2", price_km: "1", ensurance_tax: "20%", fragily_tax: "3" },
        { name: "Little Envelope", max_weight: "200", max_volume: "200", base_price: "2", price_km: "1", ensurance_tax: "20%", fragily_tax: "3" },
        { name: "Big Envelope", max_weight: "200", max_volume: "200", base_price: "2", price_km: "1", ensurance_tax: "20%", fragily_tax: "3" },
    ],

    // Strings
    orderType: "Tipo de la orden",
    originAndDestinyTitle: "Origen y destino",
    itemConfigurationTitle: "Paquetes a enviar",
    orderInformation: "Información de la orden",
    orderDetails: "Detalles de la orden",
    nextBtn: "Siguiente",
    backBtn: "Anterior",
    finishBtn: "Terminar",
    orderConfiguration: "Configurar orden",
    itemConfiguration: "Configurar items",
    confirmation: "Confirmar orden",
    daysToDeliver: "Días para la entrega",
    timeTax: "Impuesto por menor tiempo de entrega",
    holidaysTax: "Impuesto por feriado trabajado",
    specificDestinatarioTax: "Impuesto por destinatario específico",
    ignoreHolidays: "Ignorar feriados",
    yes: "Si",
    no: "No",
    origin: "Origen",
    destiny: "Destino",
    destinyType: "Tipo de destino",
    office: "Sucursal",
    personal: "Personal",
    personalAddress: "Dirección personal",
    receiverInformation: "Información del receptor",
    name: "Nombre",
    lastName: "Apellido",
    identificationType: "Nac.",
    idNumber: "Número de identificación",
    email: "Correo electrónico",
    areaCode: "Código de área",
    phoneNumber: "Número telefónico",
    itemType: "Tipo de paquete",
    items: "Paquetes",
    addItemBtn: "Añadir otro",
    weight: "Peso (gr)",
    volume: "Volumen (ml)",
    deleteBtn: "X",

    category: "Categoría",
    type: "Tipo",
    fragileObject: "Objeto frágil",
    secureObject: "Asegurar paquete",

    maxWeight: "Peso máximo",
    maxVolume: "Volumen máximo",
    basePrice: "Precio base",
    priceKm: "Precio por Km",
    ensuranceTax: "Impuesto por seguro",
    fragilyTax: "Impusto por fragilidad",

    errorMsg: null,
  }),
  components: {
      FormWizard,
      TabContent
  },
  methods: {
    addItem () {
      this.orderItems.push({
        category: "",
        type: "",
        weight: "",
        volume: "",
        fragility: false,
        ensurance: true,
      });
    },
    removeItem (index) {
      this.orderItems.splice(index, 1);
    },
    handleErrorMessage: function(errorMsg){
          this.errorMsg = errorMsg
        },
    validateFirstStep:function() {
          return new Promise((resolve, reject) => {
              if(this.order_type == ""){
                  reject('Por favor, selecciona un tipo de orden')
              }else if (this.origin_address == ""){
                  reject('Indica una dirección de origen')
              }else if (this.destiny_type == ""){
                  reject('Indica una dirección de destino')
              }else if (this.receiver_name == ""){
                  reject('Indica el nombre del receptor')
              }else if (this.receiver_last_name == ""){
                  reject('Indica el apellido del receptor')
              }else if (this.receiver_identification == ""){
                  reject('Indica el documento de identidad del receptor')
              }else{
                  resolve(true)
              } 
          })
         },
    validateSecondStep:function() {
          return new Promise((resolve, reject) => {
              for (var i=0; i < this.orderItems.length; i++){
                if(this.orderItems[i].category == ""){
                    reject('Por favor, añade un item')
                }else if (this.orderItems[i].type == ""){
                    reject('Por favor, añade un item')
                }else if (this.orderItems[i].weight == ""){
                    reject('Indica el peso del item')
                }else if (this.orderItems[i].volume == ""){
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