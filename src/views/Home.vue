<template>
  <div>
    <v-layout>
      <v-flex class="d-block text-center mt-2 mb-5">
        <h3>Bienvenido {{ user.name }} </h3>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout>
      <v-flex class="d-block text-center mt-5">
        <v-img src="https://socialgeek.co/wp-content/uploads/2016/12/redes-sociales-1000x500.png"></v-img>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapState(['user'])
  }
}
</script>
