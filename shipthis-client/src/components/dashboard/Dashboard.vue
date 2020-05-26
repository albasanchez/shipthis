<template>
  <v-row id="Dashboard">
      <v-col cols="12" class="text-center white--text pt-8 pb-0">
          <h1>{{ helloMessage }} {{ username }}</h1>
      </v-col>
      <v-col cols="12" class="dashboard-list">
          <div v-for="dashboard in dashItems" :key="dashboard.id" class="dashboard-item ma-0">
            <!-- Componente de tarjeta de dashboard -->
            <DashboardCard :name="dashboard.name" :route="dashboard.route"
            :description="dashboard.desc" :icon="dashboard.img" class="text-center py-4">
            </DashboardCard>
          </div>
      </v-col>
    </v-row>
</template>

<script>
import DashboardCard from './DashboardCard.vue';
// import axios from 'axios';

export default {
    name: "Dashboard",
    components: {
        DashboardCard
    },
    data: () => ({
        helloMessage: 'Hola,',
        username: "David",
        dashItems: [
            { id: 1, name: "Mi perfil", desc: "Configuración de mi cuenta y datos personales.", img: "dash-user.png", route: 'UserProfile' },
            { id: 2, name: "Historial de envíos", desc: "Consultar mis órdenes anteriores.", img: "dash-historial.png", route: '' },
            { id: 3, name: "Generar una nueva orden", desc: "¡Quiero hacer un envío!", img: "dash-order.png", route: 'NewOrder' }
        ]
    }),
}
</script>

<style lang="scss">
@import '../../styles/main.scss';
#Dashboard {
    background-image: url('../../assets/dashboard/colorful-background.jpg');
    margin:0;
    background-size: cover;
    height: 480px;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
}
</style>