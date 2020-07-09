<template>
  <div class="general-container pt-10 px-0">
      <v-row>
          <v-col cols="12" class="dashboard-list pa-0">
          <div v-for="dashboard in dashItems" :key="dashboard.id" class="dashboard-item ma-4">
            <!-- Componente de tarjeta de dashboard -->
            <Card :name="dashboard.name" 
            :route="dashboard.route"
            :description="dashboard.desc" 
            :icon="dashboard.img" 
            :section="dashboard.section"
            class="text-center py-4">
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
            { 
                id: 1, 
                name: "Create User", 
                desc: "", 
                img: "person_add", 
                route: 'Users/CreateUser',
                section: "Users"
            },
            { 
                id: 2, 
                name: "Consult Users", 
                desc: "", 
                img: "assignment_ind", 
                route: 'Users/ConsultUser',
                section: "Users"
                },
        ]
    }),
    methods: {
        goRoute(route) {
        this.$router.push("/" + route);
        }
    },
    components: {
        Card,
    }
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>