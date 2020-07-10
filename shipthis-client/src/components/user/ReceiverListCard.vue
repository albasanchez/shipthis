<template>
  <v-card class="receiver-list-card">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('receivers.search')"
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
      :items="receivers"
      :search="search"
      :loading="loading"
      :loading-text="$t('receivers.loadingReceivers')"
      :no-data-text="$t('receivers.noReceivers')"
      :no-results-text="$t('receivers.noReceiversSearch')"
      :footer-props="{
        'items-per-page-text': $t('receivers.datatableRowPerPage'),
        'page-text': `{0}-{1} ${$t('receivers.datatablePageText')} {2}`,
      }"
      class="header-color"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="actiavateDialog('UPDATE', item)"
          >mdi-pencil</v-icon
        >
        <v-icon small @click="actiavateDialog('DELETE', item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
    <ReceiverModal ref="receiver_modal" @loadReceivers="loadReceivers()" />
  </v-card>
</template>

<script>
import Repository from "@/services/repositories/repositoryFactory";
import ReceiverModal from "./ReceiverModal";
const ReceiverRepository = Repository.get("receiver");

export default {
  name: "ReceiverListCard",
  components: {
    ReceiverModal,
  },
  data: () => ({
    userdata: {},
    receivers: [],
    loading: false,
    search: "",
  }),
  methods: {
    actiavateDialog(action, receiver) {
      switch (action) {
        case "CREATE":
          return this.$refs.receiver_modal.activateDialog(action);
        case "UPDATE":
          return this.$refs.receiver_modal.activateDialog(action, receiver);
        case "DELETE":
          return this.$refs.receiver_modal.activateDialog(action, receiver);
        default:
          break;
      }
    },
    async loadReceivers() {
      await ReceiverRepository.getReceivers(this.userdata.user_id)
        .then((response) => {
          this.receivers = response;
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
          text: this.$t("receivers.receiverName"),
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: this.$t("receivers.receiverLastName"), value: "last_name" },
        {
          text: this.$t("receivers.receiverPhoneNumber"),
          value: "phone_number",
        },
        { text: this.$t("receivers.receiverEmail"), value: "email" },
        {
          text: this.$t("receivers.actions"),
          value: "actions",
          sortable: false,
        },
      ];
    },
  },
  async mounted() {
    this.userdata = this.$store.getters["users/getUser"];
    this.loading = true;
    await this.loadReceivers();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
