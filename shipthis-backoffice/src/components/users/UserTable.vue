<template>
  <v-row class="pt-4 pb-1" :class="$vuetify.breakpoint.smAndDown ? 'px-4' : 'px-12'">
    <v-col>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center primary--text">Registered users</h1>
            </v-col>
        </v-row>
        <v-row>
          <v-col :class="$vuetify.breakpoint.smAndDown ? 'px-4' : 'px-12'">
            <v-card elevation="4">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                ref="datatable"
                :items-per-page="5"
                multi-sort
                :headers="headers"
                :items="users"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="id"
                show-expand
                :search="search"
                :loading="loading"
                loading-text="Loading... Please wait"
                no-data-text="We didn't find users... Sorry"
                :footer-props="{
                  showFirstLastPage: true,
                  prevIcon: 'mdi-chevron-left',
                  nextIcon: 'mdi-chevron-right'
                }"
              >
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="pa-0">
                      <template>
                        <v-row>
                          <v-col cols="12" class="primary text-title pa-0 ma-0 text-center white--text">
                            <p class="py-2 ma-0 font-weight-bold">{{ item.full_name }}</p>
                          </v-col>
                        </v-row>
                        <v-row class="table-field ma-0 px-8">
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">First Name: <br></span>{{ item.first_name }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span v-if="item.middle_name!==''" class="font-weight-bold">Middle Name: <br></span>{{ item.middle_name }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Last Name: <br></span>{{ item.last_name }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span v-if="item.second_last_name!==''" class="font-weight-bold">Second Last Name: <br></span>{{ item.second_last_name }}</p>
                          </v-col>
                        </v-row>
                        <v-row class="table-field ma-0 px-8">
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">User ID: <br></span>{{ item.id }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">ID Document: <br></span>{{ item.document }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Email: <br></span>{{ item.useremail }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Phone Number: <br></span>{{ item.phone_number }}</p>
                          </v-col>
                        </v-row>
                        <v-row class="table-field ma-0 px-8">
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Date of Birth: <br></span>{{ item.date_of_birth }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Registration Type: <br></span>{{ item.registration_type }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Registration_date: <br></span>{{ item.registration_date }}</p>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <p class="ma-0"><span class="font-weight-bold">Role/Status: <br></span>{{ item.role }}/{{ item.status }}</p>
                          </v-col>
                        </v-row>
                        <v-row v-if="item.role!=='ADMIN'">
                          <v-col cols="12" class="table-field pa-0 ma-0 text-center">
                          <v-btn class="primary--text orders-btn mb-3" 
                          outlined @click="showOrders(item.useremail)">
                            View Orders
                          </v-btn>
                          </v-col>
                        </v-row>
                      </template>                          
                   </td>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
          </v-row>
          <v-dialog v-model="noOrdersAlert" max-width="550">
            <v-card class="pa-4 ma-0">
              <v-card-text class="text-center">
                This user has no orders.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-row class="text-center ma-0">
                  <v-btn class="primary--text ml-3" outlined @click="noOrdersAlert = false">Close</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </v-col>
        </v-row>
</template>

<script lang="ts">
import Repository from "../../services/repositories/repositoryFactory";
const usersRepository = Repository.get("users");
const OrderRepository = Repository.get("order");
import moment from "moment";
export default {
  name: "UserTable",
  data: () => ({
    ordersDetail: false,
    selectedUser: null,
    expanded: [],
    singleExpand: true,
    search: "",
    loading: true,
    noOrdersAlert: false,
    headers: [
      {
        text: "User ID",
        align: "center",
        value: "id",
        class: "primary--text"
      },
      {
        text: "First Name",
        align: "center",
        value: "first_name",
        class: "primary--text"
      },
      {
        text: "Last Name",
        align: "center",
        value: "last_name",
        class: "primary--text"
      },
      {
        text: "Email",
        align: "center",
        value: "useremail",
        class: "primary--text"
      },
      {
        text: "Registration Date",
        align: "center",
        value: "registration_date",
        class: "primary--text"
      },
      {
        text: "Role",
        align: "center",
        value: "role",
        class: "primary--text"
      },
      {
        text: "Status",
        align: "center",
        value: "status",
        class: "primary--text"
      },
      { text: '', value: 'data-table-expand' },
    ],
    users: [] ,
  }),
  async mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      let response;
      response = await usersRepository.getUsers();
      this.users = response;
      this.fillUsers(response);
    },
    fillUsers(response) {
      for (var i = 0; i < response.length; i++) {
        if (!(this.users[i].middle_name)) this.users[i].middle_name = "";
        if (!(this.users[i].second_last_name)) this.users[i].second_last_name = "";
        this.users[i].full_name =
          response[i].first_name + " " + response[i].middle_name + " " + response[i].last_name + " " + response[i].second_last_name;
        this.users[i].date_of_birth = moment(response[i].date).format("MM-DD-YYYY");
      }
      this.loading = false;
    },
    async showOrders(email){
      const userEmail = {
        useremail: email
      };
      try{
        let response;
        response = await OrderRepository.getOrdersByUser(userEmail);
        this.shipOrders = response;
        this.$router.push("/Users/ConsultUser/Orders/"+ email);
      } catch {
        this.noOrdersAlert = true;
      }
    }
  },
  
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
@import "../../styles/abstracts/variables.scss";
.table-field {
  background-color: lightgrey;
}
.table-subtitle {
  background-color: $primary-color;
  font-size: 20px;
}
.orders-btn{
  transition: 0.5s;
}
.orders-btn:hover{
  background-color: $primary-color;
  color: white !important;
  border: none !important;
}
</style>
