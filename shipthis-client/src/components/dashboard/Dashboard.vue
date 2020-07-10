<template>
  <v-container fluid>
    <v-row id="Dashboard">
      <v-col>
        <v-row>
          <v-col cols="12" class="text-center white--text pt-8 pb-0">
            <h1>
              {{ $t("dashboard.helloMessage") }} {{ userdata.first_name }}
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="dashboard-list px-5">
            <div
              v-for="dashboard in dashItems"
              :key="dashboard.id"
              class="ma-2"
            >
              <!-- Componente de tarjeta de dashboard -->
              <DashboardCard
                :name="$t('dashboard.' + dashboard.name)"
                :route="dashboard.route"
                :description="$t('dashboard.' + dashboard.desc)"
                :icon="dashboard.img"
                class="text-center py-4"
              >
              </DashboardCard>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardCard from "./DashboardCard.vue";
export default {
  name: "Dashboard",
  components: {
    DashboardCard,
  },
  data: () => ({
    userdata: {},
    username: "David",
    dashItems: [
      {
        id: 1,
        name: "myProfile",
        desc: "myProfileDesc",
        img: "dash-user.png",
        route: "UserProfile",
      },
      {
        id: 2,
        name: "historial",
        desc: "historialDesc",
        img: "dash-historial.png",
        route: "ShippingHistory",
      },
      {
        id: 3,
        name: "newOrder",
        desc: "newOrderDesc",
        img: "dash-order.png",
        route: "NewOrder",
      },
      {
        id: 4,
        name: "receivers",
        desc: "receiversDesc",
        img: "dash-contact.png",
        route: "Receivers",
      },
    ],
  }),
  mounted() {
    this.userdata = this.$store.getters["users/getUser"].person;
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#Dashboard {
  background-image: url("../../assets/dashboard/colorful-background.jpg");
  background-size: cover;
}
</style>
