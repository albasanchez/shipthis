<template>
  <v-form class="elevation-3" id="contact-form" ref="form" v-on:submit.prevent>
    <!--Alerts -->
    <v-alert v-model="alertSuccess" type="success" dismissible>
      <strong>{{ $t("contact.successMessage") }}</strong>
    </v-alert>
    <v-alert v-model="alertError" type="error" dismissible>
      <strong>{{$t("contact.errorMessage")}}</strong>
    </v-alert>
    <v-row>
      <v-col cols="12" align="center" class="text-center secondary--text pa-0">
        <h2 class="d-inline pr-1">{{ $t("contact.contactTitle") }}</h2>
        <v-icon class="d-inline secondary--text pl-1 mb-3 pb-3">{{ contactIcons.bolt }}</v-icon>
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
          :label='$t("contact.suggestionLabel")'
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
      >{{ $t("buttons.submit") }}</v-btn>
    </div>
    <v-row>
      <v-col class="text-center gray--text">
        <p style="font-size: 15px; color: gray" class="pb-0 mb-0 pt-2">{{ contactInfo }}</p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactForm",

  data: () => ({
    alertSuccess: false,
    alertError: false,
    commentRules: [
      v => !!v || "El comentario no puede estar vacio",
      v => v.length <= 500 || "El comentario no puede exeder los 500 caracteres"
    ],
    suggestion: "",

    // Strings
    contactIcons: {
      bolt: "fas fa-bolt"
    },
  }),
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const comment = { comment: this.suggestion };
        axios
          .post(
            "http://localhost:3000/shipthisapi/v1/comment-box/savecomment",
            comment
          )
          .then(() => (this.alertSuccess = true))
          .catch(() => (this.alertError = true));
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>