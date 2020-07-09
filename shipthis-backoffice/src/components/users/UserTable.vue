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
                        <v-row>
                          <v-col 
                            cols="12" 
                            class="table-field pa-0 ma-0 text-center"       
                          >
                            <v-btn class="primary--text orders-btn mb-3 mx-2" v-if="item.role!=='ADMIN'"
                            outlined @click="showOrders(item.useremail)">
                              View Orders
                            </v-btn>
                            <v-btn color="error" class="white--text block-btn mb-3 mx-2" 
                            v-if="item.status=='ACTIVE'"
                            @click="showBlockConfirmation(item.full_name); setUser(item.id)">
                              Block User
                            </v-btn>
                            <v-btn class="primary white--text unlock-btn mb-3 mx-2" v-if="item.status=='BLOCKED'"
                             @click="showUnlockConfirmation(item.full_name); setUser(item.id)">
                              Activate User
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
          <v-dialog v-model="blockConfirmation" max-width="550">
            <v-card class="pa-4 ma-0">
              <v-card-text class="text-center">
                Are you sure you want to<strong> BLOCK </strong>  user {{ this.userToChangeName }}?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-row class="text-center ma-0">
                  <v-btn class="primary white--text mr-3" @click="blockUser()">Confirm</v-btn>
                  <v-btn class="primary--text ml-3" outlined @click="blockConfirmation = false">Cancel</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
          <v-dialog v-model="unlockConfirmation" max-width="550">
            <v-card class="pa-4 ma-0">
              <v-card-text class="text-center">
                Are you sure you want to<strong> UNLOCK </strong>  user {{ this.userToChangeName }}?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-row class="text-center ma-0">
                  <v-btn class="primary white--text mr-3" @click="unlockUser()">Confirm</v-btn>
                  <v-btn class="primary--text ml-3" outlined @click="unlockConfirmation = false">Cancel</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar
            v-model="userBlockedAlert"
            top
            :timeout="timeout"
            color="success"
            class="primary--text"
          >
            <strong class="body-1 registry-snackbar font-weight-bold">
              Status of user {{ this.userToChangeName }} has been changed to BLOCKED
            </strong>
            <v-btn dark text @click="userBlockedAlert = false" class="primary--text"> X </v-btn>
          </v-snackbar>
          <v-snackbar
            v-model="userUnlockedAlert"
            top
            :timeout="timeout"
            color="success"
            class="primary--text"
          >
            <strong class="body-1 registry-snackbar font-weight-bold">
              Status of user {{ this.userToChangeName }} has been changed to UNLOCKED
            </strong>
            <v-btn dark text @click="userUnlockedAlert = false" class="primary--text"> X </v-btn>
          </v-snackbar>
          <v-snackbar
            v-model="errorAlert"
            top
            :timeout="timeout"
            color="error"
            class="white--text"
          >
            <strong class="body-1 registry-snackbar font-weight-bold">
              Error on changing the status of user {{ this.userToChangeName }}
            </strong>
            <v-btn dark text @click="errorAlert = false" class="white--text"> X </v-btn>
          </v-snackbar>
          <v-snackbar
            v-model="actualUserAlert"
            top
            :timeout="timeout"
            color="error"
            class="white--text"
          >
            <strong class="body-1 registry-snackbar font-weight-bold">
              You are the current user, you can't block yourself.
            </strong>
            <v-btn dark text @click="actualUserAlert = false" class="white--text"> X </v-btn>
          </v-snackbar>
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
    blockConfirmation: false,
    unlockConfirmation: false,
    userToChangeName: "",
    userToChangeID: "",
    statusToChange: "",
    userBlockedAlert: false,
    userUnlockedAlert: false,
    actualUserAlert: false,
    errorAlert: false,
    timeout: 7000,
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
    },
    showBlockConfirmation(user){
      this.userToChangeName = user;
      this.blockConfirmation = true;    
    },
    showUnlockConfirmation(user){
      this.userToChangeName = user;
      this.unlockConfirmation = true;    
    },
    setUser(id){
      this.userToChangeID = id;
    },
    async blockUser(){
      this.blockConfirmation = false;
      // Verifica que el usuario no sea el actual conectado
      if (this.userToChangeID !== this.$store.getters["users/getUser"].user_id){
        const userData = {
          user_id: this.userToChangeID,
          status: "BLOCKED"
        };
        try{
          await usersRepository.updateStatus(userData);
          this.userBlockedAlert = true;
        } catch {
          this.errorAlert = true;
        }
      } else {
        this.actualUserAlert = true;
      }
      this.loadUsers();
    },
    async unlockUser(){
      this.unlockConfirmation = false;
      const userData = {
        user_id: this.userToChangeID,
        status: "ACTIVE"
      };
      try{
        await usersRepository.updateStatus(userData);
        this.userUnlockedAlert = true;
      } catch {
        this.errorAlert = true;
      }
      this.loadUsers();
    },
    goRoute(route) {
      this.$router.push("/" + route);
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
.orders-btn, .block-btn, .unlock-btn{
  transition: 0.5s;
}
.orders-btn:hover{
  background-color: $primary-color;
  color: white !important;
  border: none !important;
}
</style>
