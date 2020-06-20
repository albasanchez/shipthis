<template>
  <v-container fluid class="general-container">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
        <ShipmentsCards ></ShipmentsCards>
        <v-row>
          <v-col>
            <v-card elevation="5" >
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
                @current-items="getCurrentShipments"
                :items-per-page="5"
                multi-sort
                :headers="headers"
                :items="shipments"
                :search="search"
                :loading="loading"
                loading-text="Loading... Please wait"
                no-data-text="We didn't find shipments... Sorry"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    class="clickable"
                    color="black"
                    @click="changePage(item.trackingid)"
                  >mdi-clipboard-text-outline</v-icon>
                </template>
                <template v-slot:item.date="{ item }">{{ formatDate(item.date) }}</template>
                <template v-slot:item.total="{ item }">{{ item.total + " $" }}</template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ShipmentsCards from "../components/Shipments/ShipmentsCards.vue";
export default {
  name: "Shipments",
  data: () => ({
    headers: [
      {
        text: "Tracking ID",
        align: "center",
        sortable: false,
        value: "trackingid",
        class: "primary--text"
      },
      {
        text: "User",
        align: "center",
        value: "user",
        class: "primary--text"
      },
      {
        text: "Purpose",
        align: "center",
        value: "purpose",
        sortable: false,
        class: "primary--text"
      },
      {
        text: "Office",
        align: "center",
        value: "office",
        class: "primary--text"
      },
      {
        text: "Status",
        align: "center",
        value: "status",
        class: "primary--text"
      },
      {
        text: "Date",
        align: "center",
        value: "date",
        class: "primary--text"
      },
      {
        text: "Packages",
        align: "center",
        value: "packages",
        class: "primary--text"
      },
      {
        text: "Total",
        align: "center",
        value: "total",
        class: "primary--text"
      },
      {
        text: "Detail",
        align: "center",
        class: "primary--text",
        value: "actions",
        sortable: false
      }
    ]
  }),
  components: {
    ShipmentsCards
  }
};
</script>

<style lang="scss">
@import "../styles/main.scss";

</style>
