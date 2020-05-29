<template>
  <div class="home">
    <Navbar></Navbar>
    <ShippingHistory id="ShippingHistory"></ShippingHistory>
    <Sidebar id="Sidebar" app></Sidebar>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import ShippingHistory from "../components/user/ShippingHistory.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
export default {
  name: "HomeUser",
  components: {
    Navbar,
    ShippingHistory,
    Sidebar,
    Footer
  }
};
</script>
<style>
</style>