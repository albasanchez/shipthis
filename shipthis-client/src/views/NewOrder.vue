<template>
  <div class="home">
    <Navbar></Navbar>
    <NewOrderForm id="NewOrderForm"></NewOrderForm>
    <Sidebar id="Sidebar" app></Sidebar>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import NewOrderForm from "../components/user/NewOrderForm.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
export default {
  name: "HomeUser",
  components: {
    Navbar,
    NewOrderForm,
    Sidebar,
    Footer
  }
};
</script>
<style></style>
