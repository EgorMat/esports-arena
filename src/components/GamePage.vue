<template>
<div class="tournament">
  <p>ID турнира: {{game.id}}</p>
  <p>Сумма: {{game.money}}</p>
  <div>Команда 1:
    <ul>
      <li v-for="players in game.team1">
        {{players}}
      </li>
    </ul>
  </div>
  <div>Команда 2:
    <ul>
      <li v-for="players in game.team2">
        {{players}}
      </li>
    </ul>
  </div>
  <button v-on:click='joinTeam1' v-if='!isIn' key="team1">Присоединиться к команде 1</button>
  <button v-on:click='joinTeam2' v-if='!isIn' key="team2">Присоединиться к команде 2</button>
  <button v-on:click='leaveGame' v-if='isIn'>Покинуть турнир</button>
</div>
</template>



 <script>
import {mapGetters} from 'vuex'
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default{
  data(){
    return{
      game : {},
      isIn: false
      }
    },

  created(){
   this.getGame(this.$route.params.id)
   setTimeout(()=>this.checkPlayer(), 1000); /// переделать в промисы
  },

  computed: mapGetters({
    user : 'getCurrentUser'
  }),

  methods: {
    joinTeam1(){
      this.game.team1.push(this.user.username);
      this.updateGame();
      this.isIn = true;
    },

    joinTeam2(){
      this.game.team2.push(this.user.username);
      this.updateGame();
      this.isIn = true;
    },
    leaveGame(){
        let x;
        let z;
          for(let i = 0; i<=4; i++){
              if (this.game.team1[i] === this.user.username){
                  z = this.game.team1[i];
                  let y  = this.game.team1.indexOf(z);
                  this.game.team1.splice(z,1);
                  this.updateGame();
                  this.isIn = false;
              }
            }
            for(let i = 0; i<=4; i++){
                if (this.game.team2[i] === this.user.username){
                    x = this.game.team2[i];
                    let y  = this.game.team2.indexOf(x);
                    this.game.team2.splice(x,1);
                    this.updateGame();
                    this.isIn = false;
                }
              }

    },

    checkPlayer(){
      let t1 = this.game.team1;
      let t2 = this.game.team2;
          console.log(this.game.team1)
          for(let i = 0; i<=t1.length-1; i++){
            if(t1[i] == this.user.username){
                this.isIn = true;
                console.log(this.isIn)
            }
          };
          for(let k = 0; k<=t2.length-1; k++){
            if(t2[k] == this.user.username){
            this.isIn = true;
            }
          }
        },

    getGame(id){
      var $this = this
      firebase.auth().onAuthStateChanged(function(u) {
      if (u){
        const g = db.collection("games").where("id", "==", id)
          g.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
             $this.game = doc.data()});
        })}})
    },
    updateGame(){
      var x;
      var $this = this;
      const g = db.collection("games").where("id", "==", $this.game.id).get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          return db.collection("games").doc(doc.id).update({
             team1 : $this.game.team1,
             team2 : $this.game.team2
         })
        })
      })
      console.log('ura')
    }
 }
}
 </script>


 <style lang='scss' scoped>
 @import '../style/tournament.scss';
 </style>
