<template>
    <v-layout>
        <v-flex>
            <v-card>
                
                <v-card-text>
                    <h3>Chat</h3>
                </v-card-text>

                <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>

                    <div :class="item.name === user.name ? 'text-right' : 'text-left'"
                        v-for="(item, index) in messages" :key="index"
                    >
                        <v-chip>
                            <v-avatar>
                                <img :src="item.photo" alt="">
                            </v-avatar>
                            {{ item.message }}
                        </v-chip>
                        <p class="caption mr-1">{{ item.date }}</p>
                    </div>
                </v-card-text>

                <v-card-text>
                    <v-form @submit.prevent="sendMessage" v-model="isValid">
                        <v-text-field 
                            v-model="message" 
                            label="Type your message here"
                            required 
                            :rules="rules"
                        >
                        </v-text-field>
                    </v-form>
                </v-card-text>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '@/firebase'
import moment from 'moment'

export default {
    data(){
        return{
            message: '',
            isValid: false,
            rules: [
                v => !!v || 'Message is required...'
            ],
            messages: []
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        sendMessage(){
            if(this.isValid){
                console.log('Message sent: ', this.message)
                db.collection('chats').add({
                    message: this.message,
                    name: this.user.name,
                    photo: this.user.photo,
                    date: Date.now()
                })
                .catch(error => {
                    console.log(error)
                })
                this.message = ''
            }else{
                console.log('There are not messages')
            }
            
        }
    },
    created(){
        moment.locale('en')

        let ref = db.collection('chats').orderBy('date', 'desc').limit(10)

        ref.onSnapshot(querySnapshot => {
            this.messages = []
            querySnapshot.forEach(doc => {
                this.messages.unshift({
                    message: doc.data().message,
                    photo: doc.data().photo,
                    name: doc.data().name,
                    date: moment(doc.data().date).format('lll')
                })
            })
            console.log(this.messages)
        })
    }
}
</script>