<template>
  <div class="home">
    <Banner id="Banner"></Banner>
    <Us id="Us"></Us>
    <TrackSec id="TrackSec"></TrackSec>
    <Services id="Services"></Services>
    <Contact id="Contact"></Contact>
    <Sidebar v-if="idToken"></Sidebar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Navbar from "../components/navbar/Navbar.vue";
import Banner from "../components/home/Banner.vue";
import Us from "../components/home/Us.vue";
import TrackSec from "../components/home/TrackSec.vue";
import Services from "../components/home/Services.vue";
import Contact from "../components/home/Contact.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
import { mapState } from 'vuex';
export default {
  name: "Home",
  components: {
    Banner,
    Us,
    TrackSec,
    Services,
    Sidebar,
    Contact,
  },
  computed: 
    mapState({
        idToken: state => state.idToken,
    })
  
};
</script>
