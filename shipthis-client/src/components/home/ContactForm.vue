<template>
  <v-form class="elevation-3" id="contact-form" ref="form" v-on:submit.prevent>
    <v-row>
      <v-col cols="12" align="center" class="text-center secondary--text pa-0">
        <h2 class="d-inline pr-1 secondary--text">
          {{ $t("contact.contactTitle") }}
        </h2>
        <v-icon class="d-inline secondary--text pl-1 mb-3 pb-3">{{
          contactIcons.bolt
        }}</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center secondary--text pb-2">
        <p class="display-12 mb-0">{{ $t("contact.leaveSuggestion") }}</p>
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col cols="12">
        <v-textarea
          class="pt-0 mt-0"
          name="Message"
          v-model="suggestion"
          :label="$t('contact.suggestionLabel')"
          :rules="commentRules"
          required
          :counter="500"
          auto-grow
          filled
          rows="1"
          row-height="15"
        ></v-textarea>
      </v-col>
    </v-row>
    <div class="center-btn">
      <v-btn
        class="text-center success secondary--text"
        @click="onSubmit"
        width="200"
        align="center"
        >{{ $t("buttons.submit") }}</v-btn
      >
    </div>
    <v-row>
      <v-col class="text-center gray--text">
        <p style="font-size: 15px; color: gray;" class="pb-0 mb-0 pt-2">
          {{ $t("contact.contactInfo") }}
        </p>
      </v-col>
    </v-row>
    <v-snackbar v-model="alertSuccess" top :timeout="timeout" color="success">
      <strong class="secondary--text">{{
        $t("contact.successMessage")
      }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          dark
          text
          v-bind="attrs"
          @click="alertNoOrder = false"
          class="secondary--text"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="alertError" top :timeout="timeout" color="error">
      <strong>{{ $t("contact.errorMessage") }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text v-bind="attrs" @click="alertNoOrder = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import Repository from "../../services/repositories/repositoryFactory";
const CommentRepository = Repository.get("comment");

export default {
  name: "ContactForm",

  data: ($v) => ({
    alertSuccess: false,
    alertError: false,
    timeout: 4000,
    commentRules: [
      (v) => !!v || $v.$t("errorMessages.input"),
      (v) => v.length <= 500 || $v.$t("errorMessages.comment"),
    ],
    suggestion: "",

    // Strings
    contactIcons: {
      bolt: "fas fa-bolt",
    },
  }),
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const comment = {
          comment: this.suggestion,
          language: this.$i18n.locale,
        };
        try {
          await CommentRepository.registerComment(comment);
          this.alertSuccess = true;
        } catch (e) {
          this.alertError = true;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
