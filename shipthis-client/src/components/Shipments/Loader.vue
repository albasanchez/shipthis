<template>
  <div class="home">
    <v-dialog v-model="dialog" max-width="210px">
      <v-card class="ma-0 loading">
        <img
          src="../../assets/loader.gif"
          class="dashboard-card__image"
          alt="icono"
        />
        <div class="dashboard-card__info text-center">
          <h4 class="dashboard-card__info-title">{{ $t(message) }}</h4>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    dialog: Boolean,
    message: String,
  },
};
</script>
<style></style>
