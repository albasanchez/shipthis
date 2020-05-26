<template>
  <v-card>
    <v-navigation-drawer app
      v-model="drawer" :right="right" :expand-on-hover="expandOnHover"
      :mini-variant.sync="mini"
      permanent class="no-radius secondary"
    >
      <v-list-item class="px-2 pt-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="white--text">John Leider</v-list-item-title>

        <v-btn 
          icon
          @click.stop="mini = !mini"
        >
          <v-icon class="white--text"> {{ minimizeIcon }} </v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item class="sidebar-item"
          v-for="item in sidebarItems"
          :key="item.title"
          link @click="goRoute(item.route)"
        >
          <v-list-item-icon>
            <v-icon class="white--text sidebar-item-icon">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text sidebar-item-title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        sidebarItems: [
          { title: 'Escritorio', icon: 'dashboard', route:'HomeUser' },
          { title: 'Mi Perfil', icon: 'mdi-account', route:'UserProfile' },
          { title: 'Historial', icon: 'mdi-history', route:'' },
          { title: 'Nuevo envío', icon: 'local_shipping', route:'NewOrder' },
          { title: 'Cerrar sesión', icon: 'cancel', route:'' }
        ],
        mini: true,
        right: true,
        expandOnHover: true,
        minimizeIcon: 'mdi-chevron-left'
      }
    },
    methods: {
      goRoute(route) {
        this.$router.push('/'+route);
      }
    }
  }
</script>
<style lang="scss">
@import '../../styles/main.scss';
    .no-radius{
        border-radius: 0px !important;
        border: none;
    }
    .sidebar-item:hover{
        background-color: $primary-color !important;
    }
</style>