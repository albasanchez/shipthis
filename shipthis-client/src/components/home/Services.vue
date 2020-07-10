<template>
  <v-row id="Services" class="py-12">
    <v-col cols="12" class="text-center white--text pb-0">
      <h1>{{ $t("services.servicesTitle") }}</h1>
    </v-col>
    <v-col cols="12" class="service-list">
      <div v-for="service in services" :key="service.id" class="service-item">
        <!-- Componente de tarjeta de cada servicio -->
        <ServiceCard
          :serviceName="$t('services.' + service.name)"
          :serviceDescription="$t('services.' + service.desc)"
          :serviceIcon="service.img"
          class="text-center py-4"
        ></ServiceCard>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ServiceCard from "./ServiceCard.vue";

export default {
  name: "Services",
  components: {
    ServiceCard,
  },
  data: () => ({
    services: [
      { id: 1, name: "service1", desc: "service1desc", img: "service-box.png" },
      {
        id: 2,
        name: "service2",
        desc: "service2desc",
        img: "service-home.png",
      },
      { id: 3, name: "service3", desc: "service3desc", img: "service-PC.png" },
      { id: 4, name: "service4", desc: "service4desc", img: "service-map.png" },
    ],
  }),
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
#Services {
  background-image: url("../../assets/home/origin.jpg");
  background-size: cover;
}
</style>
