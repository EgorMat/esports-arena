<template>
<div>
  <router-link :to="{ name: 'searchgame'}"> Поиск игры</router-link>

  <input type="checkbox" v-model="private">Только приватные{{private}}
  <input type="checkbox" v-model="public">Только публичные{{public}}
  <input type="checkbox" v-model="players1">1vs1
  <input type="checkbox" v-model="players3">3vs3
  <input type="checkbox" v-model="players5">5vs5
<!-- Количество игроков в команде: <input type='number' v-model='playersInTeam'> -->
  <ul class='tournaments-list'>
    <li v-for="game in games">
      <router-link :to="{name: 'game', params: {id: game.id}}">
        <div class='tournaments-list-item'>
          <p>Статус: {{game.status.privacy}}<p>
          <p>Мод: {{game.mode}} </p>
          <p>ID: {{game.id}}</p>
          <p>Время: {{game.time}}</p>
          <p>Сумма : {{game.money}}</p>
          <p> {{game.playersInTeam}} vs {{game.playersInTeam}} <p>
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
        </div>
      </router-link>
    </li>
  </ul>
  <!-- <ul class='tournaments-list' v-if="filters.private">
    Приватные игры
    <li v-for="game in privateGames">
      <router-link :to="{name: 'game', params: {id: game.id}}">
        <div class='tournaments-list-item'>
          <p>ID: {{game.id}}</p>
          <p>Время: {{game.time}}</p>
          <p>Сумма : {{game.money}}</p>
          <p> {{game.playersInTeam}} vs {{game.playersInTeam}} <p>
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
        </div>
      </router-link>
    </li>
  </ul> -->
  <router-link :to="{name: 'creategame'}">
    Создать игру
  </router-link>

</div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default {
  data(){
    return {
      private: false,
      public: false,
      players1: false,
      players3: false,
      players5: false,
      games: [],
      initialGames : []
    }
  },

  // computed: mapGetters({
  //   games: 'getGames'
  //   privateGames: 'getPrivateGames',
  //   commonGames: 'getCommonGames'
  // }),

  methods: {
    showPrivate() {
        if(this.private){
         if(this.public){
           this.public = false;
           setTimeout(() => {this.games = this.games.filter(function(game){
           return game.status.privacy == "private"})}, 1000)
         }
         else{
          this.games = this.games.filter(function(game){
          return game.status.privacy == "private"})
        }
        }
        else {
          this.games = this.initialGames
        }
      },
    showPublic() {
        if(this.public){
          if(this.private){
            this.private = false;
            setTimeout(() => {this.games = this.games.filter(function(game){
            return game.status.privacy == "public"})}, 1000)
          }
          else {
          this.games = this.games.filter(function(game){
          return game.status.privacy == "public"})
        }

        }
          else{
          this.games = this.initialGames
        }
    },
    getGames(){
        var $this = this
        firebase.auth().onAuthStateChanged(function(u) {
        if (u){
          db.collection("games").orderBy("time").get().then(function(querySnapshot) {
           querySnapshot.forEach(function(doc) {
               $this.games.push(doc.data());
           });

       })
     }
   })
   this.initialGames = this.games
 }},
  created() {
    // this.$store.dispatch('setGames')
    this.getGames();
  },

  watch: {
    private : 'showPrivate',
    public: 'showPublic'
  }


}
</script>


<style lang="scss" scoped>
@import '../style/tournaments-list.scss';
</style>
