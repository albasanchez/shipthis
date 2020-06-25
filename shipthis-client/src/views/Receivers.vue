<template>
  <div class="home">
    <Navbar></Navbar>
    <ReceiverList id="Receiver"></ReceiverList>
    <Sidebar id="Sidebar" app></Sidebar>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import ReceiverList from "../components/user/ReceiverList.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
export default {
  name: "Receivers",
  components: {
    Navbar,
    ReceiverList,
    Sidebar,
    Footer
  }
};
</script>
<style></style>
