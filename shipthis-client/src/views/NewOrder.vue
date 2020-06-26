<template>
  <div class="home">
    <NewOrderForm id="NewOrderForm"></NewOrderForm>
  </div>
</template>

<script>
import NewOrderForm from "../components/user/NewOrderForm.vue";
export default {
  name: "HomeUser",
  components: {
    NewOrderForm,
  },
};
</script>
<style></style>
