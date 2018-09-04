<template>
<div>
<div v-if="isLoading">Загрузка...</div>
  Поиск игры
<input type = "checkbox" @click="onePlayer" v-model="one">1vs1
<input type = "checkbox" @click="threePlayers" v-model="three">3vs3
<input type = "checkbox" @click="fivePlayers" v-model="five">5vs5
{{playersInTeam}}Количество человек в команде
<select v-model="mode">
  <option>All Pick</option>
  <option>Captains mode</option>
</select>
<input type="range" min="0" max="5000" step="100" v-model="money">{{money}}
<button @click="searchGame">Найти игру</button>
<div>{{game}}</div>
</div>
</template>



<script>
import {mapGetters} from 'vuex'
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default {
    data(){
      return {
            isLoading : false,
            playersInTeam : 1,
            one: true,
            three: false,
            five: false,
            money: 1000,
            mode: 'All Pick',
            game: { },
            relevantGames: [],
      }
    },

    computed: mapGetters({
      userGames: 'getCurrentUserGames'
    }),

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
      getRelevantGames() {
          let $this = this;
        return new Promise(function(resolve, reject) {
          let x  = [];
          let k = [];
          let r = [];
          let y = $this.userGames
          firebase.auth().onAuthStateChanged(function(u) {
          if (u){
          const g = db.collection("games").where("playersInTeam", "==", +$this.playersInTeam);
          const q = db.collection("games").where("money", "<=", +$this.money);
          const m = db.collection("games").where("mode", "==", $this.mode);
            g.get().then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                              x.push(doc.data().id) //подходящие по игроку
                              });
                                  q.get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                      k.push(doc.data().id) //подходящие по деньгам
                                    })
                                          m.get().then(function(querySnapshot){
                                            querySnapshot.forEach(function(doc) {
                                              r.push(doc.data().id) // подходящие по моду
                                            })
                                              console.log("По деньгам",k)
                                              console.log("По игрокам",x)
                                              console.log("По моду",r)
                                              if (!x.length || !k.length || !r.length){
                                                $this.$router.push({name: 'creategame'})
                                                }
                                            else {
                                              let c =  k.same(x.same(r))
                                              c = c.diff(y) // подходящие игры (их id)
                                              if (c.length){
                                                  console.log(c)
                                                  firebase.auth().onAuthStateChanged(function(u) {
                                                    if (u){
                                                      for (let i = 0; i<=c.length - 1; i++){ /// вывод инфы о подходящих играх
                                                          const g = db.collection("games").where("id", "==", c[i])
                                                          g.get().then(function(querySnapshot) {
                                                            querySnapshot.forEach(function(doc) {
                                                              $this.relevantGames.push(doc.data())}) // массив, состоящий из подходящих матчей
                                                              if($this.relevantGames.length == c.length) {
                                                                resolve("successfully")
                                                              }
                                                        }
                                            )
                                          }
                                      }})
                                        }
                                        else {
                                          $this.$router.push({name: 'creategame'})
                                        }
                                      }
                                    })
                                  })
                                })
          }
        })
        })
      },
// добавить фильтры: игры, которые еще не начались; игры, в которых есть места
//
      searchGame(){
        this.getRelevantGames()
        .then(() => {
            console.log(this.relevantGames)
            this.relevantGames = this.relevantGames.filter((game) => {
          return (game.status.state == "notStarted" && (game.team1.length < game.playersInTeam  || game.team2.length < game.playersInTeam))})
            console.log(this.relevantGames)
            let min = this.relevantGames[0].time;
            let minIndex = 0; // индекс в массиве игры с минимальным временем
            for (let i = 0; i<=this.relevantGames.length - 1; i++){
              if (this.relevantGames[i].time <= min){
                console.log(this.relevantGames[i].time)
                min = this.relevantGames[i].time;
                minIndex = i;
              }
            }
          this.$router.push({name: 'game', params: {'id' : this.relevantGames[minIndex].id}})
        })
      },
    }
  };

  Array.prototype.same = function(a) {
    return this.filter(function(i) {return a.indexOf(i) >= 0;});
};
  Array.prototype.diff = function(a){
    return this.filter(function(i){return a.indexOf(i) < 0});
  };



</script>
