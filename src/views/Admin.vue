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
                   <v-btn color="secondary" :disabled="file === null" @click="uploadImage" :loading="loading">Upload image</v-btn>
               </v-card-text>

                <!-- Error -->
               <v-card-text v-if="error">
                   <h4>{{ error }}</h4>
               </v-card-text>

               <v-card-text v-if="file">
                   <h4>{{ file.name }}</h4>
                   <v-img :src="tmpURL"></v-img>
               </v-card-text>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { firebase, storage, db } from '@/firebase'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            file: null,
            tmpURL: '',
            loading: false,
            error: null
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        searchImage(event){
            console.log(event.target.files[0])
            const typeFile = event.target.files[0].type
            if(typeFile === 'image/jpeg' || typeFile === 'image/png'){
                this.file = event.target.files[0]
                this.error = null
            }else{
                this.error = 'File is not valid. It should be .jpeg or .png'
                this.file = null
                return
            }
            
            const reader = new FileReader()
            reader.readAsDataURL(this.file)
            reader.onload = (e) => {
                //console.log(e.target.result)
                this.tmpURL = e.target.result
            }
        },
        async uploadImage(){
            try {
                this.loading = true
                const refImage = storage.ref().child(this.user.email).child('profile picture')
                const res = await refImage.put(this.file)
                console.log(res)
                const url = await refImage.getDownloadURL()
                this.user.photo = url
                await db.collection('users').doc(this.user.uid).update({
                    photo: url
                })
                this.error = 'File has been uploaded successfully'
                this.file = null
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>