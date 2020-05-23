<template>
  <v-row id="Services">
      <v-col cols="12" class="text-center white--text pt-8 pb-0">
          <h1>{{ servicesTitle }}</h1>
      </v-col>
      <v-col cols="12" class="service-list">
          <div v-for="service in services" :key="service.id" class="service-item">
            <!-- Componente de tarjeta de cada servicio -->
            <ServiceCard :serviceName="service.name" 
            :serviceDescription="service.desc" :serviceIcon="service.img" class="text-center py-4"></ServiceCard>
          </div>
      </v-col>
    </v-row>
</template>

<script>
import ServiceCard from './ServiceCard.vue';

export default {
    name: "Services",
    components: {
        ServiceCard
    },
    data: () => ({
        services: [
            { id: 1, name: "Envía lo que quieras", desc: "Ya sea en un sobre o en una caja, nos preocupamos en que tu producto llegue sano y a tiempo.", img: "service-box.png"},
            { id: 2, name: "Hasta donde TÚ quieras", desc: "Ya sea en una de nuestra sucursal más cercana, o la dirección personal que desees.", img: "service-home.png"},
            { id: 3, name: "Ordena desde tu casa", desc: "Regístrate, llena el formulario de solicitud, elige tu forma de pago, ¡y listo!", img: "service-PC.png"},
            { id: 4, name: "Rastrea tus envíos", desc: "Te ofrecemos seguimiento gráfico y textual sobre tus ordenes actuales y anteriores.", img: "service-map.png"}
        ],
        servicesTitle: '¿Qué ofrecemos?',
    })
}
</script>

<style lang="scss">
    @import '../../styles/main.scss';
    #Services {
    background-image: url('../../assets/home/origin.jpg');
    margin:0;
    background-size: cover;
    height: 480px;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
}
</style>