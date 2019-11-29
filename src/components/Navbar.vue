<template>
    <nav>
        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <router-link :to="{ name: 'home' }" style="text-decoration: none">
                <span style="color: black">SRA Social Network</span>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout">
                <span class="mr-2">Sign Out</span>
                <v-icon>fas fa-address-book</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer class="indigo" v-model="drawer" app>

            <!-- Avatar -->
            <v-layout column align-center mt-5>
                <v-flex>
                    <v-avatar>
                        <img
                            :src="user.photo"
                            alt="profile-picture"
                        >
                    </v-avatar>
                </v-flex>
                <v-flex>
                    <p class="mt-3 white--text">{{ user.name }}</p>
                </v-flex>
            </v-layout>

            <!-- Divider -->
            <v-divider></v-divider>

             <!-- Items -->
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
                    <v-list-item-icon>
                        <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return{
            drawer: false,
            items: [
                { title: 'Home', icon: 'fas fa-address-card', to: { name: 'home'}},
                { title: 'Admin', icon: 'fas fa-address-book', to: { name: 'admin'}},
                { title: 'Chat', icon: 'fas fa-american-sign-language-interpreting', to: { name: 'chat'}}
            ]
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
    ...mapActions(['logout'])
  }
}
</script>