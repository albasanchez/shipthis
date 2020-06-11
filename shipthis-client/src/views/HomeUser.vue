<template>
  <div class="home">
    <Navbar id="Navbar" :loggedIn="true"></Navbar>
    <Dashboard id="Dashboard"></Dashboard>
    <Sidebar id="Sidebar" app></Sidebar>
    <Footer id="Footer"></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Dashboard from "../components/dashboard/Dashboard.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "HomeUser",
  components: {
    Navbar,
    Dashboard,
    Sidebar,
    Footer
  }
};
</script>

<style lang="scss"></style>
