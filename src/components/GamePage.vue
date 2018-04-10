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

export default{
  data(){
    return{
      isIn: false
      }
    },

  created(){
    this.$store.dispatch('setGame', this.$route.params.id);
    setTimeout((()=>this.checkPlayer()), 500);
    console.log(this.isIn)
    },

  computed:mapGetters({
    game : 'getGame'
      }),

  methods: {
    checkPlayer(){
      const t1 = this.game.team1;
      const t2 = this.game.team2;
      for(let i = 0; i<=t1.length-1; i++){
        if(t1[i] == this.$store.getters.getCurrentUser.username){
            this.isIn = true;
            console.log(this.isIn)
        }
      };
      for(let k = 0; k<=t2.length-1; k++){
        if(t2[k] == this.$store.getters.getCurrentUser.username){
        this.isIn = true;
        }
      }
    },
    joinTeam1(){
      this.$store.dispatch('joinTeam1', this.$store.getters.getCurrentUser.username);
      this.isIn = true;
    },
    joinTeam2(){
      this.$store.dispatch('joinTeam2', this.$store.getters.getCurrentUser.username);
      this.isIn = true;
    },
    leaveGame(){
      this.$store.dispatch('leaveGame',this.$store.state.currentUser.username)
       this.isIn = false;
          }
      },

    beforeRouteLeave (to, from , next) {
      this.$store.dispatch('updateGame');
        next()
  }

 }

 </script>


 <style lang='scss' scoped>
 @import '../style/tournament.scss';
</style>
