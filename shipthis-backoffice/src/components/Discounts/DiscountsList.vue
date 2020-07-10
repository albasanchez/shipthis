<template>
  <v-card class="discount-list-card">
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
        :class="$vuetify.breakpoint.xsOnly ? 'mt-3' : 'mx-2'"
        :fab="!$vuetify.breakpoint.xsOnly"
        dark
        small
        :block="$vuetify.breakpoint.xsOnly"
        color="indigo"
        @click="actiavateDialog('CREATE')"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="discounts"
      :search="search"
      :loading="loading"
      loading-text="Loading Discounts"
      no-data-text="There aren't discounts registered"
      no-results-text="There aren't no discounts with the search parameters"
      class="header-color"
    >
      <template v-slot:item.actions="{ item }">

        <v-icon :disabled="item.status == 'DELETED'" class="mr-2" @click="actiavateDialog('UPDATE', item)"
          >mdi-pencil</v-icon
        >
         <v-icon :disabled="item.status == 'DELETED'" class="mr-2" @click="actiavateDialog('ASSIGN', item)"
          >mdi-account-arrow-left</v-icon
        >
        <v-icon :disabled="item.status == 'DELETED'" class="mr-2" @click="actiavateDialog('DELETE', item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
    <DiscountModal ref="discount_modal" @loadDiscounts="loadDiscounts()" />
  </v-card>
</template>

<script>
import Repository from "@/services/repositories/repositoryFactory";
import DiscountModal from "./DiscountModal";
const DiscountsRepository = Repository.get("discounts");

export default {
  name: "Discounts",
  components: {
    DiscountModal,
  },
  data: () => ({
    userdata: {},
    discounts: [],
    loading: false,
    search: "",
  }),
  methods: {
    actiavateDialog(action, discount) {
      switch (action) {
        case "CREATE":
          return this.$refs.discount_modal.activateDialog(action);
        case "UPDATE":
          return this.$refs.discount_modal.activateDialog(action, discount);
        case "DELETE":
          return this.$refs.discount_modal.activateDialog(action, discount);
        case "ASSIGN":
          return this.$refs.discount_modal.activateDialog(action, discount);
        default:
          break;
      }
    },
    async loadDiscounts() {
      await DiscountsRepository.getDiscounts()
        .then((response) => {
          this.discounts = response;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },

  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "name",
        },
        { text: "Percentage", sortable:true, value: "percentage" },
        { text: "Status", sortable:true, value: "status" },
         {
          text: "",
          value: "actions",
          sortable: false,
        },
      ];
    },
  },
  async mounted() {
    this.userdata = this.$store.getters["users/getUser"];
    this.loading = true;
    await this.loadDiscounts();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
