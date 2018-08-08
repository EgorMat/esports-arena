<template>
<div>
  СОздавай игру

  <button @click='createGame'>Создать игру</button>
  <input type="number" placeholder="Сумма" v-model="money">
  <input type="time" placeholder="Время" v-model="time">
  <input type="number" placeholder="Количество игроков в команде" v-model="playersInTeam">
  <select v-model='mode'>
      <option disabled>Выбор мода</option>
      <option>Captains mode</option>
      <option>All pick</option>
    </select>
      ID : {{id}}
 Мод : {{mode}} Бабло: {{money}}
 Время: {{time}}
</div>
</template>


<script>
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default {
  data() {
    return {
      id: null,
      mode: ' ',
      money: ' ',
      time: ' ',
      playersInTeam : null,
    }
  },

  methods: {
    createGame(){
      db.collection("games").doc(this.id.toString()).set({
        id: this.id,
        mode: this.mode,
        money: +this.money,
        time: this.time,
        team1: [],
        team2: [],
        playersInTeam : this.playersInTeam,
        status: {
          privacy : "private"
        }
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  },

  created(){
    this.id = Date.now();
    }

}

</script>
