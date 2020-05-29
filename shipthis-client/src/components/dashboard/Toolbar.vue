<template>
  <v-card class="toolbar"
    flat
    tile absolute elevate-on-scroll scroll-target="#scrolling-techniques-7"
  >
    <v-toolbar dense class="navbar-color px-12">

      <v-img src="../../assets/home/logoNav.png" id="imgNavbar" href="#" style="width:100px"></v-img>

      <v-spacer></v-spacer>

      <SectionsList class="d-none d-md-flex" :fromToolbar="true"></SectionsList>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute right
      bottom height="300"
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import SectionsList from "../navbar/SectionsList.vue";
export default {
    data: () => ({
      drawer: false,
      group: null
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    components: {
        SectionsList
    }
  }
</script>

<style lang="scss">
    @import '../../styles/main.scss';
</style>