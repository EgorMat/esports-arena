<template>
<div class="tournament">
  <p>ID турнира: {{tournament.id}}</p>
  <p>Сумма: {{tournament.money}}</p>
  <p>ID игроков: {{tournament.players}}</p>
  <button v-on:click='joinTournament' v-if='!isIn'>Присоединиться к турниру</button>
  <button v-on:click='leaveTournament' v-if='isIn'>Покинуть турнир</button>
</div>
</template>


<script>
import axios from 'axios'

// необходимо после выполнения методов join и leave отправлять ajax запрос на обновление данных используя для этого watch

export default{
    data(){
      return {
        tournament : {id:null, money: 0, players:[]},
        isIn: false
      }
    },
    mounted(){
    // this.getTournament();
    },
    watch: {
    '$route': 'getTournament'
    },
    methods: {
     // getTournament(){
     //   axios.get('http://localhost:3004/tournaments/' + this.$route.params.id)
     //   .then(response=>{this.tournament = response.data})
     // },
     joinTournament(){
       this.tournament.players.push(this.$store.state.currentUser.id)
       // this.$store.dispatch('joinTournament', this.tournament.id);
       this.isIn = true;
     },
     leaveTournament(){
       let x;
       for(let i = 0; i<=this.tournament.players.length-1; i++){
         if(this.tournament.players[i] == this.$store.state.currentUser.id){
           x = this.tournament.players[i]
         }
       }
       let y = this.tournament.players.indexOf(x);
       this.tournament.players.splice(y,1);
       this.isIn = false;
     }

      },




}
</script>


<style lang='scss' scoped>
 @import '../style/tournament.scss'
</style>
