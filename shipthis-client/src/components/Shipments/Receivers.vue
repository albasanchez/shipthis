<template>
  <div>
    <h4>{{ $t("newOrder.receiverInformation") }}</h4>
    <v-row justify="center">
      <v-btn
        color="primary"
        outlined
        dark
        block
        :small="$vuetify.breakpoint.smAndDown"
        elevation="0"
        @click="addReceiver()"
        >{{ $t("newOrder.AddReceiver") }}</v-btn
      >
      <ReceiverModal ref="addreceiver"></ReceiverModal>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            outlined
            class="ma-2"
            :small="$vuetify.breakpoint.smAndDown"
            dark
            block
            v-bind="attrs"
            v-on="on"
            elevation="0"
            >{{ $t("newOrder.FrequentReceiver") }}</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("newOrder.ReceiversTitle") }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row align="center">
                <v-col cols="12" sm="12" md="12">
                  <div v-for="receiver in Receivers" :key="receiver.id">
                    <v-container
                      fluid
                      class="text-center form-container Receiver"
                      @click="SelectReceiver(receiver)"
                    >
                      <span class="mb-0">
                        {{ receiver.name }} {{ receiver.last_name }} |
                        {{ receiver.phone_number }}
                      </span>
                    </v-container>
                  </div>
                </v-col>
              </v-row>
              <h4 v-if="receiversdisabled == true">
                {{ $t("newOrder.ReceiverModalEmpty") }}
              </h4>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="red--text" @click="dialog = false">{{
              $t("newOrder.cancelBtn")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <p class="order-details">
      <span class="font-weight-bold">{{ ReceiverSelected }}</span>
    </p>
  </div>
</template>

<script>
import { EventBus } from "../../main.js";
import Repository from "@/services/repositories/repositoryFactory";
import ReceiverModal from "../user/ReceiverModal.vue";
const ReceiverRepository = Repository.get("receiver");
export default {
  name: "Receivers",

  data: () => ({
    dialog: false,
    receiversdisabled: false,
    Receivers: [],
    ReceiverSelected: "",
    rules: {
      item: [(v) => !!v || "Required"],
      Email: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "Email is incorrect",
      ],
    },
    userdata: {},
  }),
  computed: {},
  components: {
    ReceiverModal,
  },

  async mounted() {
    this.userdata = this.$store.getters["users/getUser"];
    await this.loadReceivers();
  },

  methods: {
    SelectReceiver(receiver) {
      this.dialog = false;
      this.ReceiverSelected = receiver.name + " " + receiver.last_name;
      EventBus.$emit("Information-Receivers", receiver.id);
    },

    addReceiver() {
      this.$refs.addreceiver.activateDialog("CREATE");
      EventBus.$on("ReceiverAdded", (data) => {
        this.receiversdisabled = false;
        this.loadReceivers();
        this.ReceiverSelected = data.name + " " + data.last_name;
        EventBus.$emit("Information-Receivers", data.receiver_id);
      });
    },
    async loadReceivers() {
      let response;
      try {
        response = await ReceiverRepository.getReceivers(this.userdata.user_id);
        this.Receivers = response;
        if (response.length == 0) {
          this.receiversdisabled = true;
        }
      } catch {
        this.receiversdisabled = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../../styles/main.scss";
</style>
