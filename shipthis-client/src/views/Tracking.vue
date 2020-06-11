<template>
  <div class="home">
    <Navbar></Navbar>
    <TrackingPage id="TrackingPage"></TrackingPage>
    <Sidebar id="Sidebar" app></Sidebar>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import TrackingPage from "../components/tracking/TrackPage.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
export default {
  name: "Tracking",
  components: {
    Navbar,
    TrackingPage,
    Sidebar,
    Footer
  }
};
</script>
<style></style>
