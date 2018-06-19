import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';
import store from './store/index.js';
import routes from './routes.js';
import * as firebase from "firebase";
import * as firestore from "firebase/firestore"

Vue.use(VueRouter);

var config = {
  apiKey: "AIzaSyCAiaqYZ2BwLmBDXjW6zc_xfvouGFEqpXA",
  authDomain: "esports-arena.firebaseapp.com",
  projectId: "esports-arena",
  databaseURL: "https://esports-arena.firebaseio.com/",
  storageBucket: "esports-arena.appspot.com",

};
firebase.initializeApp(config);




const router  = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  created(){
    firebase.auth().onAuthStateChanged(function(u) {
    if (u){
      
    }
    else{
      router.push('/')
    }})
  },
  render: h => h(App)
})



export const db = firebase.firestore();
