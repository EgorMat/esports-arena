<template>
<div>
<div v-if="isLoading">Загрузка...</div>
  Поиск игры
<input type = "checkbox" v-model="onePlayer">1vs1
<input type = "checkbox" v-model="threePlayers">3vs3
<input type = "checkbox" v-model="fivePlayers">5vs5
<input type = "number" v-model="playersInTeam">Количество человек в команде

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
            playersInTeam : '',
            onePlayer : false,
            threePlayers: false,
            fivePlayers: false,
            game: {},

      }
    },

    methods: {
      searchGame(){
        var $this = this
        firebase.auth().onAuthStateChanged(function(u) {
        if (u){
          console.log($this.playersInTeam)
          const g = db.collection("games").where("playersInTeam", "==", +$this.playersInTeam)
          g.get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                              $this.game = doc.data()
                              console.log($this.game)
                              });
          })}})
      },

    }


  }
</script>
