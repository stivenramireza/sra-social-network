<template>
  <v-app>
    <Navbar v-if="user != ''"></Navbar>
    <v-content style="background-color: white;">
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>
