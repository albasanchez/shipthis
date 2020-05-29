<template>
  <div class="home">
    <Navbar></Navbar>
    <Profile id="Profile"></Profile>
    <Sidebar id="Sidebar" app></Sidebar>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import Profile from "../components/user/Profile.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
export default {
  name: "HomeUser",
  components: {
    Navbar,
    Profile,
    Sidebar,
    Footer
  }
};
</script>
<style>
</style>