<template>
  <v-row id="Contact" class="py-12" align="center" justify="center">
    <v-col align="center">
      <!-- Formulario de contacto -->
      <ContactForm></ContactForm>
    </v-col>
  </v-row>
</template>

<script>
import ContactForm from "./ContactForm.vue";
export default {
  name: "Contact",
  components: {
    ContactForm,
  },
  data: () => ({}),
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
