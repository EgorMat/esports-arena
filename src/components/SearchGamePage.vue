<template>
<div>
<div v-if="isLoading">Загрузка...</div>
  Поиск игры
<input type = "checkbox" @click="onePlayer" v-model="one">1vs1
<input type = "checkbox" @click="threePlayers" v-model="three">3vs3
<input type = "checkbox" @click="fivePlayers" v-model="five">5vs5
{{playersInTeam}}Количество человек в команде

<button @click="searchGame">Найти игру</button>
<div>{{game}}</div>
</div>
</template>



<script>
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default {
    data(){
      return{
        isLoading : false,
            playersInTeam : null,
            one: false,
            three: false,
            five: false,
            game: {},

      }
    },

    methods: {
        onePlayer(){
          this.three = false;
          this.five = false;
          this.playersInTeam = 1;
        },
        threePlayers(){
          this.one = false;
          this.five = false;
          this.playersInTeam = 3;
        },
        fivePlayers(){
          this.three = false;
          this.one = false;
          this.playersInTeam = 5;
        },




      searchGame(){
        var $this = this
        firebase.auth().onAuthStateChanged(function(u) {
        if (u){
          const g = db.collection("games").where("playersInTeam", "==", +$this.playersInTeam)
          g.get().then(function(querySnapshot) {
                            let x  = [];
                            querySnapshot.forEach(function(doc) {
                            x.push(doc.data());
                            // $this.$router.push({name: 'game', params: {id: doc.data().id}})
                              });
                            console.log(x);  
          })}})
      },

    }


  }
</script>
