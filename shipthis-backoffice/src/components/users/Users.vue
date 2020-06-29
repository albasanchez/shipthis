<template>
  <div class="general-container pt-10">
      <v-row>
          <v-col cols="12" class="dashboard-list">
          <div v-for="dashboard in dashItems" :key="dashboard.id" class="dashboard-item ma-0">
            <!-- Componente de tarjeta de dashboard -->
            <Card :name="dashboard.name" :route="dashboard.route"
            :description="dashboard.desc" :icon="dashboard.img" class="text-center py-4">
            </Card>
          </div>
      </v-col>
      </v-row>
  </div>
</template>

<script>
import Card from '../dashboard/Card';
export default {   
    name: "Users",
    data: () => ({     
        dashItems: [
            { id: 1, name: "Create Administrator", desc: "", img: "dash-user.png", route: 'Users/CreateUser' },
            { id: 2, name: "Consult Users", desc: "", img: "dash-historial.png", route: 'Users' },
        ]
    }),
    components: {
        Card,
    }
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>