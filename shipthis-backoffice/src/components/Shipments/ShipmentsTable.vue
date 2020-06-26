<template>
  <v-card elevation="5">
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
      :items="shipments"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      no-data-text="We didn't find shipments... Sorry"
      :footer-props="{
        showFirstLastPage: true,
        prevIcon: 'mdi-chevron-left',
        nextIcon: 'mdi-chevron-right'
      }"
    ></v-data-table>
  </v-card>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const ShipmentsRepository = Repository.get("shipments");
import moment from "moment";
export default {
  name: "ShipmentsTable",
  data: () => ({
    shipments: [],
    search: "",
    loading: true,
    headers: [
      {
        text: "Tracking ID",
        align: "center",
        sortable: false,
        value: "tracking_id",
        class: "primary--text"
      },
      {
        text: "User",
        align: "center",
        value: "user_name",
        class: "primary--text"
      },
      {
        text: "Origin",
        align: "center",
        value: "origin_office",
        class: "primary--text"
      },
      {
        text: "Destiny",
        align: "center",
        value: "destiny",
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
        value: "items",
        class: "primary--text"
      },
      {
        text: "Total",
        align: "center",
        value: "total",
        class: "primary--text"
      }
    ]
  }),
  async mounted() {
    this.loadShipments();
  },
  methods: {
    async loadShipments() {
      let response;
      response = await ShipmentsRepository.getShipments();
      this.shipments = response;
      this.fillShipments(response);
    },
    fillShipments(response) {
      for (var i = 0; i < response.length; i++) {
        this.shipments[i].user_name =
          response[i].user_name + " " + response[i].user_last_name;
        this.shipments[i].date = moment(response[i].date).format("MM-DD-YYYY");
        this.shipments[i].total = "$ " + response[i].total;
        if (response[i].destination_place == null) {
          this.shipments[i].destiny = response[i].destination_office;
        } else {
          this.shipments[i].destiny = response[i].destination_place;
        }
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
