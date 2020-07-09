<template>
  <div class="home">
    <PasswordForm id="PasswordForm" />
  </div>
</template>

<script>
import PasswordForm from "../components/auth/PasswordForm.vue";
export default {
  name: "RecoverPassword",
  components: {
    PasswordForm,
  },
};
</script>

<style></style>
