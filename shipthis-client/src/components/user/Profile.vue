<template>
  <v-row id="Profile" justify="center" class="text-center">
    <v-col>
      <v-row
        ><v-col cols="12" class="secondary--text pt-4 pb-0">
          <v-icon class="d-inline display-1 white--text mb-12 pb-12 mr-2">{{
            profileIcon
          }}</v-icon>
          <h1
            class="white--text pa-0 d-inline"
            :class="$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1'"
          >
            {{ $t("dashboard.myProfile") }}
          </h1>
        </v-col></v-row
      >
      <v-row justify="center" align="center">
        <v-col justify="center" align="center"
          ><ProfileForm class="ma-0"></ProfileForm
        ></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ProfileForm from "./ProfileForm";
export default {
  name: "Profile",
  data: () => ({
    profileIcon: "mdi-account",
  }),
  components: {
    ProfileForm,
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#Profile {
  background-image: url("../../assets/dashboard/colorful-background.jpg");
  background-size: cover;
}
</style>
