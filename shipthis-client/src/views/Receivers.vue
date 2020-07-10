<template>
  <div class="home">
    <ReceiverList id="Receiver" class="receiver-height"></ReceiverList>
  </div>
</template>

<script>
import ReceiverList from "../components/user/ReceiverList.vue";
export default {
  name: "Receivers",
  components: {
    ReceiverList,
  },
};
</script>
<style lang="scss"></style>
