<template>
  <div class="general-container pt-10">
    <v-row>
      <v-col cols="12" class="dashboard-list" align="center" justify="center">
        <div
          v-for="dashboard in dashItems"
          :key="dashboard.id"
          class="dashboard-item ma-0"
        >
          <!-- Componente de tarjeta de dashboard -->
          <Card
            :name="dashboard.name"
            :route="dashboard.route"
            :description="dashboard.desc"
            :icon="dashboard.icon"
            class="text-center py-4"
          ></Card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Dashboard",
  data: () => ({
    dashItems: [
      { id: 1, name: "Users", desc: "", icon: "mdi-account-group", route: "" },
      {
        id: 2,
        name: "Shipments",
        desc: "",
        icon: "mdi-truck",
        route: "Shipments",
      },
      { id: 3, name: "Emails", desc: "", icon: "mdi-email", route: "Emails" },
      {
        id: 4,
        name: "Configuration",
        desc: "",
        icon: "mdi-cog",
        route: "Configuration",
      },
    ],
  }),
  components: {
    Card,
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>
