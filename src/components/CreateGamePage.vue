<template>
<div>
  Создавай игру
  <button @click='createGame'>Создать игру</button>
  <input type="number" placeholder="Сумма" v-model="money">
  <input type="date" placeholder="Дата" v-model="date">
  <input type="time" placeholder="Время" v-model="time">
  <input type="number" placeholder="Количество игроков в команде" v-model="playersInTeam">
  <select v-model='mode'>
      <option disabled>Выбор мода</option>
      <option>Captains mode</option>
      <option>All Pick</option>
    </select>
      ID : {{id}}
      Мод : {{mode}}
      Бабло: {{money}}
      Время: {{time}}
      Дата: {{date}}
</div>
</template>


<script>
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default {
  data() {
    return {
      id: ' ',
      mode: ' ',
      money: ' ',
      time: ' ',
      date: ' ',
      playersInTeam : null,
    }
  },

  methods: {
    createGame(){
      console.log(this.date.substr(0, 4), this.date.substr(5, 2), this.date.substr(8, 2),this.time.substr(0, 2), this.time.substr(3 , 2) )
      db.collection("games").doc(this.id.toString()).set({
        id: this.id.toString(),
        mode: this.mode,
        money: +this.money,
        time: new Date(this.date.substr(0, 4), this.date.substr(5, 2) - 1, this.date.substr(8, 2),this.time.substr(0, 2), this.time.substr(3 , 2) ),
        team1: [],
        team2: [],
        playersInTeam : +this.playersInTeam,
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
    },

    // parseDate(date, time){ ///date and time are strings
    //   let year = this.date.substr(0, 4);
    //   let month = this.date.substr(5, 2);
    //   let day = this.date.substr(8, 2);
    //   let hours = this.time.substr(0, 2);
    //   let minutes = this.time.substr(3 , 2);
    //
    // }
  },

  created(){
    this.id = Date.now();
    }

}

</script>
