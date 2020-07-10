<template>
  <div class="home">
    <NewOrderForm id="NewOrderForm"></NewOrderForm>
  </div>
</template>

<script>
import NewOrderForm from "../components/Shipments/NewOrderForm.vue";
export default {
  name: "NewOrder",
  components: {
    NewOrderForm,
  },
};
</script>
<style></style>
