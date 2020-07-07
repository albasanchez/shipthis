<template>
  <v-select
    v-model="language"
    :items="languages"
    item-text="name"
    item-value="value"
    background-color="transparent"
    append-icon=""
    solo
    dense
    flat
    @change="changeLanguage()"
    class="navbar-translator"
  >
    <template v-slot:selection="{ item }">
      <v-icon class="mr-1 navbar-translator">mdi-translate</v-icon
      >{{ item.name }}
    </template></v-select
  >
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Translator",
  components: {},
  data: () => ({
    languages: [
      { name: "English", value: "EN" },
      { name: "Español", value: "ES" },
    ],
    language: "",
  }),
  computed: mapState({
    selectedLanguage: (state) => state.users.language,
  }),
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.language;
      this.$store.dispatch("users/changeLanguage", this.language);
      location.reload();
    },
  },
  beforeMount() {
    if (this.selectedLanguage == undefined) {
      this.language = "EN";
    } else {
      this.language = this.selectedLanguage;
    }
    this.$i18n.locale = this.language;
  },
};
</script>

<style lang="scss"></style>
