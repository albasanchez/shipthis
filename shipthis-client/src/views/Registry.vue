<template>
  <div class="home">
    <Navbar></Navbar>
    <RegistryForm id="RegistryForm"></RegistryForm>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import RegistryForm from "../components/RegistryForm.vue";
export default {
  name: "HomeUser",
  components: {
    Navbar,
    RegistryForm,
    Footer
  }
};
</script>

<style>

</style>