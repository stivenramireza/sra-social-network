import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    newUser(state, payload){
      if(payload === null){
        state.user = ''
      }else{
        state.user = payload
      }
    }
  },
  actions: {
    async setUser({commit}, user){
      try {
        const doc = await db.collection('users').doc(user.uid).get()
        if(doc.exists){
          commit('newUser', doc.data())
        }else{
          const userObject = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photo: user.photoURL
          }
          // Save in Firestore
          await db.collection('users').doc(userObject.uid).set(
              userObject
          )
          commit('newUser', userObject)
          console.log('User has been saved successfully')
        }
        
        
      } catch (error) {
        
      }
      
    },
    logout({commit}){
      auth.signOut()
      commit('newUser', null)
      router.push({name: 'login'})
    }
  }
})
