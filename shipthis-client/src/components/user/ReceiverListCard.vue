<template>
  <v-card class="receiver-list-card" align-self="center">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('receivers.search')"
        single-line
        hide-details
      ></v-text-field>
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
    </v-data-table>
  </v-card>
</template>

<script>
import Repository from "@/services/repositories/repositoryFactory";
const ReceiverRepository = Repository.get("receiver");

export default {
  name: "ReceiverListCard",
  data: () => ({
    userdata: {},
    receivers: [],
    loading: false,
    search: "",
  }),
  methods: {
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
