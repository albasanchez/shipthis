<template>
  <v-container fluid class="general-container" :class="$vuetify.breakpoint.smAndDown ? 'pa-2' : ''">
    <v-row class="pt-4 pb-1 commercial-ally-min-width" v-if="!consultCommercialAlly">
      <v-col>
        <v-row>
          <v-col cols="12">
            <h1 class="text-center primary--text">Commercial Allies</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
                <v-btn
                  :class="$vuetify.breakpoint.xsOnly? 'mt-3' : 'mx-2'"
                  :fab="!$vuetify.breakpoint.xsOnly"
                  dark
                  small
                  :block="$vuetify.breakpoint.xsOnly"
                  color="indigo"
                  @click="activateCommercialAllyDialog('CREATE')"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="commercialAllies"
                :search="search"
                :items-per-page="5"
                :loading="loading"
                loading-text="Loading commercial allies"
                no-data-text="There are no commercial allies registered"
                no-results-text="There are no commercial allies with the search parameters"
                class="header-color"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="viewCommercialAlly(item)">mdi-magnify</v-icon>
                  <v-icon
                    small
                    v-if="item.status!='DELETED'"
                    class="mr-2"
                    @click="activateCommercialAllyDialog('UPDATE',item)"
                  >mdi-pencil</v-icon>
                  <v-icon
                    small
                    v-if="item.status!='DELETED'"
                    @click="activateCommercialAllyDialog('DELETE',item)"
                  >mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <CommercialAllyCard :commercialAlly="commercialAllyToConsult" @goBack="goBack" v-else />
    <CommercialAllyModal ref="commercial_ally_modal" @loadCommercialAllies="loadCommercialAllies" />
  </v-container>
</template>
<script>
import CommercialAllyCard from "./CommercialAllyCard";
import CommercialAllyModal from "./CommercialAllyModal";
import Repository from "@/services/repositories/repositoryFactory";

const CommercialAlliesRepository = Repository.get("commercialAlly");

export default {
  name: "CommercialAllies",
  components: {
    CommercialAllyCard,
    CommercialAllyModal
  },
  data: () => ({
    commercialAllies: [],
    loading: false,
    search: "",
    commercialAllyToConsult: null,
    consultCommercialAlly: false
  }),
  methods: {
    activateCommercialAllyDialog(action, receiver) {
      switch (action) {
        case "CREATE":
          return this.$refs.commercial_ally_modal.activateCommercialAllyDialog(
            action
          );
        case "UPDATE":
          return this.$refs.commercial_ally_modal.activateCommercialAllyDialog(
            action,
            receiver
          );
        case "DELETE":
          return this.$refs.commercial_ally_modal.activateCommercialAllyDialog(
            action,
            receiver
          );
        default:
          break;
      }
    },
    async viewCommercialAlly(commercialAlly) {
      await this.$store.dispatch(
        "commercialAlly/setCommercialAlly",
        commercialAlly
      );
      this.$router.push({ name: "CommercialAllyInfo" });
    },
    async loadCommercialAllies() {
      await CommercialAlliesRepository.getCommercialAllies()
        .then(response => {
          this.commercialAllies = response;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goBack() {
      this.consultCommercialAlly = false;
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "name"
        },
        { text: "Email", value: "email" },
        {
          text: "Phone Number",
          value: "phone_number"
        },
        { text: "Manager Name", value: "manager_name" },
        { text: "Manager Last Name", value: "manager_last_name" },
        {
          text: "Status",
          value: "status"
        },
        { text: "Actions", value: "actions", sortable: false }
      ];
    }
  },
  async mounted() {
    this.loading = true;
    await this.loadCommercialAllies();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.commercial-ally-min-width {
  min-width: 200px !important;
}
</style>
