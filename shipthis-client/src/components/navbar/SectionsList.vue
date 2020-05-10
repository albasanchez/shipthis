<template>
  <div>
    <v-list id="sections-list" class="pa-0 ma-0t">
      <v-list-item 
      v-for="section in sections" :key="section.id">
        <a class="sections-list__item" :href="section.link">{{ section.name }}</a>
      </v-list-item>
    </v-list>
  </div>
</template>


<script>

export default {
  name: "SectionsList",
  data: () => ({
    sections: [
      { id: "1", name: 'Inicio', link: '#' },
      { id: "2", name: 'Nosotros', link: '#Us' },
      { id: "3", name: 'Rastreo', link: '#TrackSec' },
      { id: "4", name: 'Servicios', link: '#Services' },
      { id: "5", name: 'Contacto', link: '#Contact' },
      // { id: "6", name: 'Acceder', link: '#' }
    ],
    activeColor: ''
  }),
  methods: {

  }
};
</script>
<style lang="scss">
    @import '../../styles/main.scss';


</style>