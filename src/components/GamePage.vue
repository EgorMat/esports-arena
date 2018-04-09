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
  <button v-on:click='joinTeam1' v-if='!isIn'>Присоединиться к команде 1</button>
  <button v-on:click='joinTeam2' v-if='!isIn'>Присоединиться к команде 2</button>
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
    this.checkPlayer();
    },

  computed:mapGetters({
    game : 'getGame'
      }),

  methods: {
    checkPlayer(){
        for(let i = 0; i<=4; i++){
            if((this.game.team1[i] == this.$store.getters.getCurrentUser.id)||(this.game.team2[i] == this.$store.getters.getCurrentUser.id)){
              console.log(qwd);
              this.isIn = true;
            }
}
    },
    joinTeam1(){
      this.$store.dispatch('joinTeam1', this.$store.getters.getCurrentUser.id);
      this.isIn = true;
    },
    joinTeam2(){
      this.$store.dispatch('joinTeam2', this.$store.getters.getCurrentUser.id);
      this.isIn = true;
    },
    leaveGame(){
      this.$store.dispatch('leaveGame',this.$store.getters.getCurrentUser.id)
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
