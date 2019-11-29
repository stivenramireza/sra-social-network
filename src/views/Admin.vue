<template>
    <v-layout justify-center>
        <v-flex xs6>
            <v-card class="text-center">
               <v-card-text>
                   <v-avatar>
                        <img
                            :src="user.photo"
                            alt="profile-picture"
                        >
                    </v-avatar>
               </v-card-text>
               <v-card-text>
                   <h3>{{ user.name }}</h3>
               </v-card-text>
               <v-card-text>
                   <input type="file" ref="buttonFile" class="d-none" @change="searchImage($event)">

                   <v-btn color="primary" class="mr-3" @click="$refs.buttonFile.click()">Search image</v-btn>
                   <v-btn color="secondary" :disabled="file === null">Upload image</v-btn>
               </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            file: null
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        searchImage(event){
            console.log(event.target.files[0])
            this.file = event.target.files[0]
        }
    }
}
</script>