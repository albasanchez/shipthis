<template>
  <v-row id="Profile" justify="center" align="center">
    <v-col cols="12" class="text-center secondary--text pt-4 pb-0">
      <v-icon class="d-inline display-1 white--text mb-12 pb-12 mr-2">{{ profileIcon }}</v-icon>
      <h1 class="white--text pa-0 d-inline">{{ myProfile }}</h1>
    </v-col>
    <ProfileForm class="ma-0"></ProfileForm>
  </v-row>
</template>

<script>
import ProfileForm from "./ProfileForm";
export default {
  name: "Profile",
  data: () => ({
    profileIcon: "mdi-account",

    // Strings
    myProfile: "Mi Perfil"
  }),
  components: {
    ProfileForm
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#Profile {
  background-image: url("../../assets/dashboard/colorful-background.jpg");
  margin: 0;
  background-size: cover;
  height: 600px;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
}

</style>