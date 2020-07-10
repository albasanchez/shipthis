<template>
  <v-container fluid>
    <v-row class="title-commercial-ally-info">
      <v-col cols="10" class="d-flex align-start pb-0">
        <v-icon class="dashboard-card__info-icon" size="50px">mdi-handshake</v-icon>
        <h1
          v-if="commercialAlly"
          :class="$vuetify.breakpoint.xsOnly ? 'headline' : ''"
          class="ml-3"
        >{{commercialAlly.name}}</h1>
      </v-col>
      <v-col cols="2" v-if="!$vuetify.breakpoint.smAndDown" class="d-flex align-center pb-0">
        <v-btn class="primary white--text" @click="goBack()">Go Back</v-btn>
      </v-col>
      <v-col cols="12" class="d-flex align-start pt-0">
        <h3
          v-if="commercialAlly"
          :class="$vuetify.breakpoint.xsOnly ? 'body-2' : ''"
          class="ml-3"
        >ID: {{commercialAlly.commercial_ally_key}}</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="border-p pt-0 mb-6 elevation-4 body-commercial-ally-info">
        <v-row class="header-commercial-ally-info">
          <v-col cols="12" class="d-flex justify-center">
            <h3>General Description</h3>
          </v-col>
        </v-row>
        <v-row class="pb-0 mb-0">
          <v-col cols="12" class="d-flex align-center pb-0 mb-0">
            <v-row class="pb-0 mb-0">
              <v-col cols="4" sm="6" class="d-flex justify-end border-f pb-0 mb-0">
                <p class="ml-3 px-0 mx-0">Email</p>
              </v-col>
              <v-col class="d-flex align-start pb-0 mb-0">
                <p v-if="commercialAlly" class="ml-3 px-0 mx-0">{{commercialAlly.email}}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pt-0 pb-0 mt-0">
          <v-col cols="12" class="d-flex align-center pt-0 pb-0 mt-0">
            <v-row class="pt-0 pb-0 mt-0">
              <v-col cols="4" sm="6" class="d-flex justify-end border-f pt-0 pb-0 mt-0">
                <p v-if="commercialAlly" class="ml-3 pt-0 pb-0 mt-0">Phone Number</p>
              </v-col>
              <v-col class="d-flex align-start pt-0 pb-0 mt-0">
                <p v-if="commercialAlly" class="ml-3 pt-0 pb-0 mt-0">{{commercialAlly.phone_number}}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pt-0 pb-0 mt-0">
          <v-col cols="12" class="d-flex align-center pt-0 pb-0 mt-0">
            <v-row class="pt-0 pb-0 mt-0">
              <v-col cols="4" sm="6" class="d-flex justify-end border-f pt-0 pb-0 mt-0">
                <p v-if="commercialAlly" class="ml-3 pt-0 pb-0 mt-0">Status</p>
              </v-col>
              <v-col class="d-flex align-start pt-0 pb-0 mt-0">
                <p v-if="commercialAlly" class="ml-3 pt-0 pb-0 mt-0">{{commercialAlly.status}}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pt-0 pb-0 mt-0">
          <v-col cols="12" class="d-flex align-center pt-0 pb-0 mt-0">
            <v-row class="pt-0 pb-0 mt-0">
              <v-col cols="4" sm="6" class="d-flex justify-end border-f pt-0 pb-0 mt-0">
                <p class="ml-3 pt-0 pb-0 mt-0">Manager</p>
              </v-col>
              <v-col class="d-flex align-start pt-0 pb-0 mt-0">
                <p
                  v-if="commercialAlly"
                  class="ml-3 pt-0 pb-0 mt-0"
                >{{commercialAlly.manager_name + ' ' + commercialAlly.manager_last_name}}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pt-0 pb-0 mt-0">
          <v-col cols="12" class="d-flex align-center pt-0 pb-0 mt-0">
            <v-row class="pt-0 pb-0 mt-0">
              <v-col cols="4" sm="6" class="d-flex justify-end border-f pt-0 pb-0 mt-0">
                <p class="ml-3 pt-0 pb-0 mt-0">Description</p>
              </v-col>
              <v-col class="d-flex align-start pt-0 pb-0 mt-0">
                <p v-if="commercialAlly" class="ml-3 pt-0 pb-0 mt-0">{{commercialAlly.description}}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="border-p pt-0 mb-6 elevation-4 body-commercial-ally-info">
        <v-row class="header-commercial-ally-info">
          <v-col cols="12" class="d-flex justify-center">
            <h3>Warehouses Registered</h3>
          </v-col>
        </v-row>
        <v-row class="body-commercial-ally-info">
          <v-col cols="0" md="5" class="d-flex justify-end align-end"></v-col>
          <v-col cols="12" md="6" class="d-flex justify-end align-end">
            <v-text-field
              v-model="searchWarehouses"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col v-if="commercialAlly" cols="12" md="1" class="d-flex justify-end align-end">
            <v-btn
              v-if="this.commercialAlly.status != 'DELETED'"
              :class="$vuetify.breakpoint.smAndDown? 'mt-3' : 'mx-2'"
              :fab="!$vuetify.breakpoint.smAndDown"
              dark
              small
              :block="$vuetify.breakpoint.smAndDown"
              color="indigo"
              @click="activateWarehouseDialog('CREATE')"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-data-table
          v-if="commercialAlly"
          :headers="this.commercialAlly.status == 'DELETED'? warehousesHeadersStatusDeleted:warehousesHeaders"
          :items="warehouses"
          :search="searchWarehouses"
          :loading="loadingWarehouses"
          :items-per-page="5"
          loading-text="Loading warehouses"
          no-data-text="There are no warehouses registered"
          no-results-text="There are no warehouses with the search parameters"
          class="header-color"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              v-if="item.status != 'DELETED'"
              class="mr-2"
              @click="activateWarehouseDialog('UPDATE',item)"
            >mdi-pencil</v-icon>
            <v-icon
              small
              v-if="item.status != 'DELETED'"
              @click="activateWarehouseDialog('DELETE',item)"
            >mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="border-p pt-0 mb-6 elevation-4 body-commercial-ally-info">
        <v-row class="header-commercial-ally-info">
          <v-col cols="12" class="d-flex justify-center">
            <h3>Pickups</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-row>
            <v-col cols="5" class="d-flex justify-end align-end"></v-col>
            <v-col cols="7" class="d-flex justify-end align-end">
              <v-text-field
                v-model="searchPickups"
                append-icon="mdi-magnify"
                label="Search"
                class="mr-3 mb-3"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-row>
        <v-data-table
          :headers="pickupsHeaders"
          :items="pickups"
          :search="searchPickups"
          :items-per-page="5"
          :loading="loadingPickups"
          loading-text="Loading pickups"
          no-data-text="There are no pickups registered"
          no-results-text="There are no pickups with the search parameters"
          class="header-color"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="viewTrackingInformation(item.id)">mdi-magnify</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <WarehouseModal
      ref="warehouse_modal"
      @loadCommercialAllysWarehouses="loadCommercialAllysWarehouses"
    />
  </v-container>
</template>
<script>
import WarehouseModal from "./WarehouseModal";
import Repository from "@/services/repositories/repositoryFactory";
const CommercialAlliesRepository = Repository.get("commercialAlly");

export default {
  name: "CommercialAllyCard",
  components: {
    WarehouseModal
  },
  props: {},
  data: () => ({
    loadingWarehouses: true,
    loadingPickups: true,
    warehouses: [],
    pickups: [],
    commercialAlly: null,
    searchWarehouses: "",
    searchPickups: ""
  }),
  methods: {
    viewTrackingInformation(pickupId) {
      this.$router.push({ name: "Pickup", params: { id: pickupId } });
    },
    activateWarehouseDialog(action, warehouse) {
      switch (action) {
        case "CREATE":
          return this.$refs.warehouse_modal.activateWarehouseDialog(
            action,
            this.commercialAlly.commercial_ally_key
          );
        case "UPDATE":
          return this.$refs.warehouse_modal.activateWarehouseDialog(
            action,
            this.commercialAlly.commercial_ally_key,
            warehouse
          );
        case "DELETE":
          return this.$refs.warehouse_modal.activateWarehouseDialog(
            action,
            this.commercialAlly.commercial_ally_key,
            warehouse
          );
        default:
          break;
      }
    },
    async loadCommercialAllysWarehouses() {
      await CommercialAlliesRepository.getCommercialAllysWarehouses({
        commercial_ally_key: this.commercialAlly.commercial_ally_key
      })
        .then(response => {
          this.warehouses = response;
          this.loadingWarehouses = false;
        })
        .catch(() => {
          this.loadingWarehouses = false;
        });
    },
    async loadCommercialAllysPickups() {
      await CommercialAlliesRepository.getCommercialAllysPickups({
        commercial_ally_key: this.commercialAlly.commercial_ally_key
      })
        .then(response => {
          this.pickups = response;
          this.loadingPickups = false;
        })
        .catch(() => {
          this.loadingPickups = false;
        });
    },
    goBack() {
      this.$store.dispatch("commercialAlly/setCommercialAlly", null);
      this.$router.push({ name: "CommercialAlliesView" });
    }
  },
  computed: {
    warehousesHeaders() {
      return [
        {
          text: "Name",
          value: "name",
          align: "center"
        },
        {
          text: "Address",
          value: "place.address",
          align: "center"
        },
        {
          text: "Status",
          value: "status",
          align: "center"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center"
        }
      ];
    },
    warehousesHeadersStatusDeleted() {
      return [
        {
          text: "Name",
          value: "name",
          align: "center"
        },
        {
          text: "Status",
          value: "status",
          align: "center"
        },
        {
          text: "Address",
          value: "place.address",
          align: "center"
        }
      ];
    },
    pickupsHeaders() {
      return [
        {
          text: "Id",
          value: "id",
          align: "center"
        },
        {
          text: "Receiver Name",
          value: "rec_name",
          align: "center"
        },
        {
          text: "Origin Warehouse",
          value: "origin_warehouse_name",
          align: "center"
        },
        {
          text: "Items Sent",
          value: "items.length",
          align: "center"
        },

        {
          text: "Creation Date",
          value: "creation_date",
          align: "center"
        },
        {
          text: "Status",
          value: "pickup_status",
          align: "center"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center"
        }
      ];
    }
  },
  async mounted() {
    this.commercialAlly = await this.$store.getters[
      "commercialAlly/getCommercialAlly"
    ];
    if (!this.commercialAlly) {
      this.$router.push({ name: "CommercialAlliesView" });
    }
    this.loadingWarehouses = true;
    this.loadingPickups = true;
    await this.loadCommercialAllysWarehouses();
    await this.loadCommercialAllysPickups();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.border-f {
  border-right: solid rgb(172, 172, 172) 0.1rem !important;
}
.border-p {
  border: solid rgb(0, 0, 0) 0.05rem !important;
  border-radius: 5px;
}
.body-commercial-ally-info {
  background-color: white !important;
  min-width: 300px !important;
}

.title-commercial-ally-info {
  min-width: 300px !important;
}

.header-commercial-ally-info {
  background-color: #1c1954 !important;
  color: white !important;
}
</style>
