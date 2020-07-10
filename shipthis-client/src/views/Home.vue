<template>
  <div class="home">
    <Banner id="Banner"></Banner>
    <Us id="Us"></Us>
    <Services id="Services"></Services>
    <Contact id="Contact"></Contact>
  </div>
</template>

<script>
import Banner from "../components/home/Banner.vue";
import Us from "../components/home/Us.vue";
import Services from "../components/home/Services.vue";
import Contact from "../components/home/Contact.vue";
export default {
  name: "Home",
  components: {
    Banner,
    Us,
    Services,
    Contact,
  },
  beforeMount() {
    let res = this.$store.getters["users/getUser"];
    this.loggedIn = !!res.user_id;
  },
  // computed: mapState({
  //   loggedIn: state => !!state.user
  // })
};
</script>
